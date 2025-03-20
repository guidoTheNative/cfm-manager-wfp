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
          <h2 class="font-bold leading-7 text-blue-400 sm:text-2xl sm:truncate">
            Cases
          </h2>
        </div>
        <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
          <router-link :to="{ path: '/callcenter/cases/create/' }">
            <a
              href="#"
              class="font-body inline-block px-6 py-2.5 bg-gray-500 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-gray-400 hover:shadow-lg focus:bg-gray-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-400 active:shadow-lg transition duration-100 ease-in-out capitalize"
            >
              New Case
            </a>
          </router-link>
        </div>
      </div>

      <!-- table -->
      <div
        class="align-middle inline-block min-w-full mt-5 shadow-xl rounded-table overflow-x-auto"
      >
        <vue-good-table
          :columns="columns"
          :rows="cases"
          :search-options="{ enabled: true }"
          :pagination-options="{ enabled: true }"
          theme="polar-bear"
          styleClass="vgt-table striped"
          compactMode
        >
          <template #table-row="props">
            <span v-if="props.column.label === 'Options'">
              <router-link
                :to="{ path: '/callcenter/cases/manage/' + props.row.id }"
                v-if="
                  (props.row.priority === 'High' && props.row.isRejected) ||
                  ((props.row.priority === 'Medium' ||
                    props.row.priority === 'Low') &&
                    props.row.editcount === 0)
                "
              >
                <a href="#" class="text-blue-400 text-sm hover:text-green-900">
                  Manage
                </a>
              </router-link>

              <button
                @click="openViewDialog(props.row)"
                class="text-green-400 text-sm hover:text-green-600 ml-2"
              >
                View
              </button>
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
              <h3 class="text-lg font-bold">Case Details</h3>
              <button @click="closeDialog" class="text-red-500 text-xl">
                &times;
              </button>
            </div>
            <div class="mt-4">
              <p><strong>Agent Name:</strong> {{ selectedCase.submittedBy }}</p>
              <p><strong>District:</strong> {{ selectedCase.district }}</p>

              <p><strong>Gender:</strong> {{ selectedCase.gender }}</p>

              <p>
                <strong>Nationality:</strong> {{ selectedCase.nationality }}
              </p>
              <p><strong>Priority:</strong> {{ selectedCase.priority }}</p>
              <p><strong>Status:</strong> {{ selectedCase.status }}</p>
              <p>
                <strong>Date Created:</strong>
                {{
                  formatDate(selectedCase.created) == "Invalid date"
                    ? ""
                    : formatDate(selectedCase.created)
                }}
              </p>
              <!-- Add more fields as necessary -->
            </div>
            <div class="mt-4 text-right">
              <button
                style="background-color: #096eb4"
                @click="closeDialog"
                class="font-body inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-500 focus:outline-none"
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
import createCasesForm from "../../../components/pages/cases/create.component.vue";

import { useSessionStore } from "../../../stores/session.store";
import { useCaseStore } from "../../../stores/case.store";
import { EyeIcon } from "@heroicons/vue/solid";
const $router = useRouter();
const Swal = inject("Swal");

const sessionStore = useSessionStore();
const user = ref(sessionStore.getUser);
const isLoading = ref(false);
import moment from "moment"; // Import Moment.js

const breadcrumbs = [
  { name: "Home", href: "/callcenter/dashboard", current: false },
  { name: "Cases", href: "#", current: true },
];
const caseStore = useCaseStore();
const cases = reactive([]);
const columns = ref([
  { label: "Agent Name", field: "submittedBy", sortable: true },
  { label: "District", field: "district", sortable: true },
  { label: "Priority", field: "priority", sortable: true },
  { label: "Status", field: "status", sortable: true },
  { label: "Date", field: "created", sortable: true },
  { label: "Options", field: "id", sortable: false },
]);

onMounted(() => {
  getCases();
});

const formatDate = (date) => {
  return moment(date).format("DD-MM-YYYY");
};

const getCases = async () => {
  isLoading.value = true;
  try {
    const result = await caseStore.get();
    cases.length = 0;
    cases.push(
      ...result.map((caseItem) => ({
        ...caseItem,
        created: moment(caseItem.created).format("DD-MM-YYYY"), // Format the date here
        rawCreatedDate: moment(caseItem.created), // Store the raw date for sorting
      }))
    );
    // Sort by rawCreatedDate in descending order
    cases.sort((a, b) => b.rawCreatedDate - a.rawCreatedDate);
  } catch (error) {
    Swal.fire({
      title: "Case Retrieval Failed",
      text: "Failed to get cases (Please refresh to try again)",
      icon: "error",
      confirmButtonText: "Ok",
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
    await caseStore.create(model);
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
    getCases();
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
</script>

<style>
.rounded-table {
  border-radius: 10px;
  overflow: hidden;
}
</style>
