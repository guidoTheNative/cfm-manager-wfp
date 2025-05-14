<template>
  <main>
    <!-- spinner -->
    <spinner-widget v-bind:open="isLoading" />
    <div class="max-w-2xl mx-auto px-2 sm:px-6 lg:max-w-5xl lg:px-2">
      <div>
        <breadcrumb-widget v-bind:breadcrumbs="breadcrumbs" />
      </div>
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="font-bold leading-7 text-[#096eb4] sm:text-2xl sm:truncate">
            CFM Cases
          </h2>
        </div>

        <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
          <router-link :to="{ path: '/admin/cases/create/' }">
            <a
              href="#"
              class="font-body inline-block px-6 py-2.5 bg-gray-500 text-white font-bold text-xs leading-tight rounded shadow-md hover:bg-gray-400 hover:shadow-lg focus:bg-gray-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-400 active:shadow-lg transition duration-100 ease-in-out capitalize"
            >
              New CFM Case
            </a>
          </router-link>
        </div>

        <!-- Dropdown for Upload and Export -->
        <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
          <select
            @change="handleDropdownChange"
            class="bg-gray-50 border border-gray-300 text-gray-700 py-2 px-7 rounded-md"
          >
            <option value="" disabled selected>Select Action</option>
            <option value="upload">Upload Cases</option>
            <option value="export">Export Cases</option>
          </select>
        </div>
      </div>

      <!-- Hidden file input for uploading Excel file -->
      <input
        type="file"
        id="upload-input"
        style="display: none"
        accept=".xlsx"
        @change="handleFileUpload"
      />

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
            <!-- Issue Description with Ellipsis -->
            <span
              v-if="props.column.field === 'issueDescription'"
              class="whitespace-normal break-words truncate max-w-xs"
              :title="props.row.issueDescription"
            >
              {{ truncateText(props.row.issueDescription, 50) }}
            </span>

            <!-- Options Column with Manage and Delete -->
            <span
              v-if="props.column.label === 'Options'"
              class="flex items-center space-x-2"
            >
              <!-- Manage Button -->
              <router-link
                :to="`/admin/cases/manage/${props.row.id}`"
                class="text-blue-500 text-sm hover:text-blue-700 ml-2 flex items-center space-x-1"
              >
                <DocumentTextIcon class="h-5 w-5" />
                <span>Manage</span>
              </router-link>

              <!-- Delete Button -->
              <button
                @click="deleteCase(props.row.id)"
                class="text-red-500 text-sm hover:text-red-700 flex items-center space-x-1"
              >
                <TrashIcon class="h-5 w-5" />
                <span>Delete</span>
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
              <p><strong>Agent Name:</strong> {{ selectedCase.agentName }}</p>
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
import createCasesForm from "../../../components/pages/cases/create.component.vue";
import { useCaseStore } from "../../../stores/case.store";
import * as XLSX from "xlsx"; // Import the xlsx library for Excel handling
import moment from "moment"; // Import Moment.js
import { DocumentTextIcon } from "@heroicons/vue/outline";
const $router = useRouter();
const Swal = inject("Swal");
const isUploadVisible = ref(false); // Flag to show the upload input field

const isLoading = ref(false);
const breadcrumbs = [
  { name: "Home", href: "/admin/dashboard", current: false },
  { name: "CFM Cases", href: "#", current: true },
];
const caseStore = useCaseStore();
const cases = reactive([]);
const columns = ref([
  { label: "Intake Modality", field: "intakeModality", sortable: true },
  { label: "Issue Description", field: "issueDescription", sortable: true },
  { label: "Submitted By", field: "submittedBy", sortable: true },
  { label: "District", field: "district", sortable: true },
  { label: "Priority", field: "priority", sortable: true },
  { label: "Status", field: "status", sortable: true },
  { label: "Created", field: "created", sortable: true },

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

const openViewDialog = (caseData) => {
  selectedCase.value = caseData;
  viewDialogOpen.value = true;
};

const closeDialog = () => {
  viewDialogOpen.value = false;
  selectedCase.value = null;
};

// Handle dropdown action
const handleDropdownChange = (event) => {
  const selectedAction = event.target.value;
  if (selectedAction === "upload") {
    document.getElementById("upload-input").click(); // Trigger file input click
  } else if (selectedAction === "export") {
    exportCases();
  }
};

// Export cases to Excel
const exportCases = () => {
  const ws = XLSX.utils.json_to_sheet(cases); // Convert the cases array to a worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Cases"); // Add the worksheet to a new workbook
  const excelFile = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

  // Create a Blob from the binary data and trigger a download
  const buffer = new ArrayBuffer(excelFile.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < excelFile.length; i++) {
    view[i] = excelFile.charCodeAt(i) & 0xff;
  }
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "CFMcases.xlsx"; // Filename for the exported file
  link.click();
};

// Handle file upload
const uploadCases = () => {
  Swal.fire({
    title: "Upload Cases",
    text: "Upload cases functionality goes here.",
    icon: "info",
    confirmButtonText: "Ok",
  });
};

// Handle file input change (for uploading Excel file)
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) {
    Swal.fire({
      title: "No File Selected",
      text: "Please select a file to upload.",
      icon: "warning",
      confirmButtonText: "Ok",
    });
    return;
  }

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Use the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet); // Convert sheet to JSON

      if (!jsonData.length) {
        Swal.fire({
          title: "Error",
          text: "The uploaded file is empty or invalid.",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }

      isLoading.value = true;

      // Process each row dynamically
      let uploadSuccess = true;
      for (const row of jsonData) {
        const caseData = {};

        // Map columns to backend model fields
        caseData.date =
          moment("1900-01-01")
            .add(row.Date - 2, "days")
            .format("YYYY-MM-DD") || "";
        caseData.created = caseData.date || "";
        caseData.cfm_channel = row["CFM Channel"];
        caseData.district = row.District;
        caseData.ta = row["T/A"];
        caseData.gvh = row.GVH;
        caseData.village = row["Village/Community"];
        caseData.idNumber = row["ID Number"];
        caseData.issueDescription = row["Issue Description"];
        caseData.caseCategory = row["Case Category"];
        caseData.programme = row.Programme;
        caseData.cooperaring_partner = row["Cooperating Partner"];
        caseData.priority = row.Priority;
        caseData.transfer_modality = row["Transfer Modality"];
        caseData.accountNumber = row["Account Number"];
        caseData.phoneNumber = row["Phone Number"]?.toString() || "";
        caseData.nationality = row.Nationality;
        caseData.age = row.Age;
        caseData.gender = row.Gender;
        caseData.disability = row.Disability;
        caseData.submittedBy = "Maxian Chisao";
        caseData.comment = row.Comment;
        caseData.status = row.Status;
        caseData.feedback = row.Feedback;
        caseData.dateClosed = row["Date Closed"];

        // Remove 'id' and 'created' fields if they exist
        delete row.id;
        delete row.created;

        try {
          await caseStore.create(caseData); // Create case from row
        } catch (error) {
          uploadSuccess = false;
        }
      }

      Swal.fire({
        title: uploadSuccess ? "Upload Successful" : "Upload Failed",
        text: uploadSuccess
          ? "All cases were uploaded successfully."
          : "Some cases failed to upload.",
        icon: uploadSuccess ? "success" : "error",
        confirmButtonText: "Ok",
      });

      getCases(); // Refresh the cases
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while processing the file.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      isLoading.value = false;
    }
  };

  reader.readAsBinaryString(file);
};

// Truncate long text with ellipses
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

// Delete Case function with confirmation
const deleteCase = async (caseId) => {
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
      await caseStore.remove(caseId); // Adjust according to your case store method
      getCases(); // Refresh the cases after deletion
      Swal.fire("Deleted!", "The case has been deleted.", "success");
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
