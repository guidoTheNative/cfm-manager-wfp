<template>
  <main>
    <spinner-widget v-bind:open="isLoading" />
    <div class="max-w-2xl mx-auto px-2 sm:px-6 lg:max-w-5xl lg:px-2">
      <breadcrumb-widget v-bind:breadcrumbs="breadcrumbs" />
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="font-bold leading-7 text-blue-400 sm:text-2xl sm:truncate">
            Cases
          </h2>
        </div>
      </div>

      <!-- Table -->
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
              <!-- Manage Button -->
              <router-link
                :to="{ path: '/field/cases/manage/' + props.row.id }"
                v-if="props.row.priority !== 'High'"
              >
                <a href="#" class="text-blue-400 text-sm hover:text-green-900">
                  Manage
                </a>
              </router-link>

              <!-- Dropdown Button -->
              <div class="relative inline-block dropdown-container">
                <div
                  v-if="props.row.isEscalated"
                  class="tooltip-container"
                  :aria-label="`Escalated to: ${props.row.escalatedTo}`"
                >
                  <span class="badge escalated text-sm">Escalated</span>
                </div>
                <div v-else>
                  <button
                    @click.stop="toggleDropdown($event, props.row.id)"
                    class="text-gray-500 text-sm px-4 py-2"
                    v-if="props.row.priority !== 'High'"
                  >
                    Escalate
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 inline-block ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <teleport to="body">
                    <div
                      v-if="dropdownVisible[props.row.id]"
                      class="absolute top-0 left-0 w-56 bg-white border border-gray-300 shadow-lg rounded-md z-50 transition-all"
                      :style="{
                        top: `${dropdownPosition.y}px`,
                        left: `${dropdownPosition.x}px`,
                      }"
                    >
                      <ul class="py-2">
                        <li>
                          <button
                            @click="
                              escalateCase('Head of Programme', props.row.id)
                            "
                            class="block w-full text-left px-4 py-3 text-sm text-gray-800 hover:bg-blue-100 hover:text-blue-500 transition-all"
                          >
                            Head of Programme
                          </button>
                        </li>
                        <li>
                          <button
                            @click="
                              escalateCase('Activity Manager', props.row.id)
                            "
                            class="block w-full text-left px-4 py-3 text-sm text-gray-800 hover:bg-blue-100 hover:text-blue-500 transition-all"
                          >
                            Activity Manager
                          </button>
                        </li>
                      </ul>
                    </div>
                  </teleport>
                </div>
              </div>

              <!-- View Button -->
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
                {{ formatDate(selectedCase.created) == 'Invalid date' ? '' :  formatDate(selectedCase.created)}} 
              </p>  </div>
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
import { inject, ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import spinnerWidget from "../../../components/widgets/spinners/default.spinner.vue";
import breadcrumbWidget from "../../../components/widgets/breadcrumbs/admin.breadcrumb.vue";
import createCasesForm from "../../../components/pages/cases/create.component.vue";
import { useCaseStore } from "../../../stores/case.store";
import { EyeIcon } from "@heroicons/vue/solid";
const $router = useRouter();
const Swal = inject("Swal");
import moment from "moment"; // Import Moment.js

import { useSessionStore } from "../../../stores/session.store";

const sessionStore = useSessionStore();
const user = ref(sessionStore.getUser);
const isLoading = ref(false);
const breadcrumbs = [
  { name: "Home", href: "/field/dashboard", current: false },
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

// Dropdown visibility reactive state
const dropdownVisible = reactive({});
const dropdownPosition = reactive({ x: 0, y: 0 });

// Toggle drop-up visibility for the given row
const toggleDropdown = (event, rowId) => {
  // Store event's position for dropdown placement
  dropdownPosition.x = event.clientX;
  dropdownPosition.y = event.clientY;

  // Close all other drop-ups
  Object.keys(dropdownVisible).forEach((id) => {
    dropdownVisible[id] = false;
  });

  // Toggle the selected row's drop-up
  dropdownVisible[rowId] = !dropdownVisible[rowId];
};

// Close all drop-ups
const closeAllDropdowns = () => {
  Object.keys(dropdownVisible).forEach((id) => {
    dropdownVisible[id] = false;
  });
};

// Add a global click listener to close drop-ups when clicking outside
const handleClickOutside = (event) => {
  const dropdownElements = document.querySelectorAll(".dropdown-container");
  const clickedInside = Array.from(dropdownElements).some((el) =>
    el.contains(event.target)
  );

  if (!clickedInside) {
    closeAllDropdowns();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Escalate case logic
const escalateCase = (role, caseId) => {
  updateCaseEscalation({ escalatedTo: role, id: caseId, isEscalated: true });
  dropdownVisible[caseId] = false; // Close the drop-up after escalation
};

const updateCaseEscalation = async (newValues) => {
  caseStore
    .update(newValues)
    .then((result) => {
      Swal.fire({
        title: "Success",
        text: "Case escalated to " + newValues.escalatedTo + " successfully ",
        icon: "success",
      });
    })
    .catch((error) => {
      Swal.fire({
        title: "Failed",
        text: "failed to escalate case (" + error + ")",
        icon: "error",
        confirmButtonText: "Ok",
      });
    })
    .finally(() => {
      getCases()
      isLoading.value = false;
    });
};

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

// Open view case dialog
const openViewDialog = (row) => {
  selectedCase.value = row;
  viewDialogOpen.value = true;
};

// Close the view case dialog
const closeDialog = () => {
  viewDialogOpen.value = false;
};

// Store the selected case data in the dialog
const selectedCase = ref({});
const viewDialogOpen = ref(false);
</script>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip-container:hover::after {
  content: attr(aria-label); /* Tooltip text */
  position: absolute;
  bottom: 125%; /* Position above the element */
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.75); /* Dark background for tooltip */
  color: #fff; /* White text for tooltip */
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10;
  opacity: 1;
  visibility: visible;
  transition: opacity 0.2s ease-in-out;
}

.tooltip-container::after {
  visibility: hidden;
  opacity: 0;
}

.badge {
  display: inline-block;
  padding: 4px 12px; /* Adjust padding for a rounded badge */
  font-size: 0.675rem; /* Small text size */
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 9999px; /* Fully rounded badge */
  background-color: #ffa500; /* Orange background */
  color: #ffffff; /* White text */
  cursor: default; /* No pointer cursor for a badge */
}
</style>