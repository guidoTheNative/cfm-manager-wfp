<template>
  <main class="">
    <!--spinner-->
    <spinner-widget v-bind:open="isLoading" />
    <div class="max-w-2xl mx-auto px-2 sm:px-6 lg:max-w-5xl lg:px-2">
      <div>
        <breadcrumb-widget v-bind:breadcrumbs="breadcrumbs" />
      </div>
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2
            class="font-bold leading-7 text-[#096eb4] sm:text-2xl sm:truncate"
          >
            Issues
          </h2>
        </div>
        <!--   <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
          <router-link :to="{ path: '/activitymanager/process/create' }">
            <a
              href="#"
              class="font-body inline-block px-6 py-2.5 bg-gray-500 text-white font-bold text-xs leading-tight rounded shadow-md hover:bg-gray-400 hover:shadow-lg focus:bg-gray-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-400 active:shadow-lg transition duration-100 ease-in-out capitalize"
            >
              New Issue
            </a>
          </router-link>
        </div> -->
      </div>

      <!-- table -->
      <div
        class="align-middle inline-block min-w-full mt-5 shadow-xl rounded-table overflow-x-auto"
      >
        <vue-good-table
          :columns="columns"
          :rows="process"
          :search-options="{ enabled: true }"
          :pagination-options="{ enabled: true }"
          theme="polar-bear"
          styleClass="vgt-table striped"
          compactMode
        >
          <template #table-row="props">
            <span
              v-if="props.column.label === 'Options'"
              class="flex items-center space-x-2"
            >
              <!-- Manage Button -->
              <router-link
                :to="`/activitymanager/process/manage/${props.row.id}`"
                class="text-blue-500 text-sm hover:text-blue-700 flex items-center space-x-1"
              >
                <DocumentTextIcon class="h-5 w-5" />
                <span>Manage</span>
              </router-link>

              <!-- Delete Button -->
             <!--  <button
                @click="deleteCase(props.row.id)"
                class="text-red-500 text-sm hover:text-red-700 flex items-center space-x-1"
              >
                <TrashIcon class="h-5 w-5" />
                <span>Delete</span>
              </button> -->
            </span>
          </template>
        </vue-good-table>
      </div>

      <!-- Case Details Modal -->
      <div v-if="viewDialogOpen" class="fixed inset-0 z-50 overflow-y-auto">
        <div
          class="flex items-center justify-center min-h-screen bg-gray-500 bg-opacity-75"
        >
          <div class="bg-white p-5 rounded-lg shadow-lg w-1/2">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold">Issue Details</h3>
              <button @click="closeDialog" class="text-red-500 text-xl">
                &times;
              </button>
            </div>
            <div class="mt-4">
              <p>
                <strong>Submitted By:</strong> {{ selectedCase.submittedBy }}
              </p>
              <p><strong>District:</strong> {{ selectedCase.district }}</p>

              <p>
                <strong>Macro Category:</strong>
                {{ selectedCase.macroCategory }}
              </p>

              <p>
                <strong>Cooperating Partner:</strong>
                {{ selectedCase.cooperatingPartner }}
              </p>
              <p>
                <strong>Monitoring Date:</strong>
                {{ selectedCase.monitoringDate }}
              </p>
              <p>
                <strong>Reported to WFP:</strong>
                {{ selectedCase.reportedToWfp == true ? "Yes" : "No" }}
              </p>

              <!-- Add more fields as necessary -->
            </div>
            <div class="mt-4 text-right">
              <button
                style="background-color: #096eb4"
                @click="closeDialog"
                class="font-body inline-block px-6 py-2.5 bg-blue-400 text-white font-bold text-xs leading-tight rounded shadow-md hover:bg-blue-500 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { inject, ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import spinnerWidget from "../../../components/widgets/spinners/default.spinner.vue";
import breadcrumbWidget from "../../../components/widgets/breadcrumbs/admin.breadcrumb.vue";
import createCasesForm from "../../../components/pages/process/create.component.vue";

import { DocumentTextIcon } from "@heroicons/vue/outline";
import { useSessionStore } from "../../../stores/session.store";
import { useProcessStore } from "../../../stores/process.store";
import { EyeIcon } from "@heroicons/vue/solid";
const $router = useRouter();
const Swal = inject("Swal");

const sessionStore = useSessionStore();
const user = ref(sessionStore.getUser);
const isLoading = ref(false);
import moment from "moment"; // Import Moment.js

const breadcrumbs = [
  { name: "Home", href: "/admin/dashboard", current: false },
  { name: "Issues", href: "#", current: true },
];
const processStore = useProcessStore();
const process = reactive([]);
const columns = ref([
  { label: "District", field: "district", sortable: true },
  { label: "CP", field: "cooperatingPartner", sortable: true },
  { label: "Activity", field: "activity", sortable: true },
  { label: "Modality", field: "transferModality", sortable: true },
  { label: "Macro Category", field: "macrocategory", sortable: true },
  { label: "Phone", field: "witnessPhone", sortable: false, hidden: true },
  { label: "Perpetrator", field: "perpetrator", sortable: false, hidden: true },
  { label: "Options", field: "id", sortable: false }, // Keep for action buttons (edit/view/delete)
]);

onMounted(() => {
  getProcess();
});

const formatDate = (date) => {
  return moment(date).format("DD-MM-YYYY");
};

const getProcess = async () => {
  isLoading.value = true;
  try {
    const result = await processStore.get();
    console.log(result);

    process.length = 0;
    process.push(
      ...result
        // Filter where activity matches user.activity
        .filter((processItem) => processItem.activity === user.value.activity)
        .map((processItem) => ({
          ...processItem,
          created: moment(processItem.created).format("DD-MM-YYYY"), // Format the date
          rawCreatedDate: moment(processItem.created), // Store raw date for sorting
        }))
    );
    // Sort by rawCreatedDate in descending order
    process.sort((a, b) => b.rawCreatedDate - a.rawCreatedDate);
  } catch (error) {
    Swal.fire({
      position: "top-end",
      title: "Issue Retrieval Failed",
      text: "Failed to get Issue (Please refresh to try again)",
      icon: "error",
      showConfirmButton: false,
      timer: 3000,
      toast: true,
    });
  } finally {
    isLoading.value = false;
  }
};


const createCase = async (model) => {
  isLoading.value = true;
  model.submittedBy = user.value.firstname + " " + user.value.lastname;
  model.created = moment().toDate(); // This will set the current date and time

  try {
    await processStore.create(model);
    Swal.fire({
      title: "Success",
      text: "Created a new case successfully",
      icon: "success",
      confirmButtonText: "Ok",
    });
  } catch (error) {
    Swal.fire({
      title: "Failed",
      text: "Failed to create case (" + error + ")",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } finally {
    isLoading.value = false;
    getProcess();
  }
};

const viewDialogOpen = ref(false);
const selectedCase = ref(null);

// Open the dialog and pass the selected case
const openViewDialog = (caseData) => {
  selectedCase.value = caseData;
  viewDialogOpen.value = true;
};

// Close the dialog
const closeDialog = () => {
  viewDialogOpen.value = false;
  selectedCase.value = null; // Clear the selected case
};

const deleteCase = async (issuedId) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await processStore.remove(issuedId); // Adjust according to your case store method
      getProcess(); // Refresh the cases after deletion
      Swal.fire("Deleted!", "The issue has been deleted.", "success");
    } catch (error) {
      Swal.fire(
        "Error!",
        "Failed to delete the case: " + error.message,
        "error"
      );
    }
  }
};
</script>

<style>
.rounded-table {
  border-radius: 10px;
  overflow: hidden;
}
</style>
