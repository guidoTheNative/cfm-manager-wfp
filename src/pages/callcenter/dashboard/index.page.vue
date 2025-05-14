<template>
  <main class="mt-1 pb-8 font-bold">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <!-- Breadcrumb -->
      <breadcrumb-widget :breadcrumbs="breadcrumbs" />

      <!-- Header -->
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="font-bold text-3xl text-[#096eb4] py-4">Dashboard</h2>
        </div>
        <!-- Filters -->
        <div class="flex space-x-4">
          <!-- Priority Filter -->
          <select
            v-model="selectedPriority"
            class="rounded px-8 py-2 border-gray-300 text-gray-700"
          >
            <option value="">All Priorities</option>
            <option
              v-for="(count, priority) in stats.casesByPriority"
              :key="priority"
              :value="priority"
            >
              {{ priority }}
            </option>
          </select>
          <!-- Month Filter -->
          <select
            v-model="selectedMonth"
            class="rounded px-8 py-2 border-gray-300 text-gray-700"
          >
            <option value="">All Months</option>
            <option
              v-for="(month, index) in months"
              :key="index"
              :value="month.value"
            >
              {{ month.label }}
            </option>
          </select>
          <!-- Year Filter -->
          <select
            v-model="selectedYear"
            class="rounded px-8 py-2 border-gray-300 text-gray-700"
          >
            <option value="">All Years</option>
            <option v-for="year in availableYears" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
      </div>

      <!-- Main Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
        <!-- Cards (Updated with white backgrounds and text/icon colors) -->
        <div
          class="shadow rounded-lg p-4 flex items-center justify-between bg-white"
        >
          <router-link to="/admin/cases" class="block">
            <div
              class=" rounded-lg p-4 flex items-center justify-between bg-white hover:bg-white transition duration-200"
            >
              <div>
                <h3 class="text-lg font-bold text-blue-600">
                  Pending Actions
                </h3>
                <p class="text-2xl font-bold text-blue-600">
                  {{ stats.pendingActions }}
                </p>
              </div>
              <i class="fas fa-tasks text-4xl text-[#096eb4]"></i>
            </div>
          </router-link>
          <i class="fas fa-tasks text-4xl text-[#096eb4]"></i>
        </div>

        <div class="shadow rounded-lg p-4 bg-white">
          <h3 class="text-lg font-bold text-green-600">Cases by Category</h3>
          <ul class="mt-2">
            <li
              v-for="(count, category) in paginatedCasesByCategory"
              :key="category"
              class="flex justify-between"
            >
              <span>{{ category }}</span>
              <span class="font-bold text-green-600">{{ count }}</span>
            </li>
          </ul>
          <!-- Pagination Controls -->
          <div class="flex justify-between items-center my-2 mt-3 text-sm">
            <button
              @click="prevPage('casesByCategory')"
              :disabled="paginationState.casesByCategory.currentPage === 1"
              class="px-2 py-1 text-xs text-gray-800 rounded-md hover:text-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed transition duration-150"
            >
              &larr;
            </button>
            <span class="text-gray-400"> </span>
            <button
              @click="nextPage('casesByCategory')"
              :disabled="
                paginationState.casesByCategory.currentPage ===
                totalPagesCategory
              "
              class="px-2 py-1 text-xs text-gray-800 rounded-md hover:text-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed transition duration-150"
            >
              &rarr;
            </button>
          </div>
        </div>

        <div class="shadow rounded-lg p-4 bg-white">
          <h3 class="text-lg font-bold text-yellow-600">Cases by Priority</h3>
          <ul class="mt-2">
            <li
              v-for="(count, priority) in paginatedCasesPriority"
              :key="priority"
              class="flex justify-between"
            >
              <span>{{ priority }}</span>
              <span class="font-bold text-yellow-600">{{ count }}</span>
            </li>
          </ul>
          <!-- Pagination Controls -->
          <div class="flex justify-between items-center my-2 mt-3 text-sm">
            <button
              @click="prevPage('casesByPriority')"
              :disabled="paginationState.casesByPriority.currentPage === 1"
              class="px-2 py-1 text-xs text-gray-800 rounded-md hover:text-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed transition duration-150"
            >
              &larr;
            </button>
            <span class="text-gray-400"> </span>
            <button
              @click="nextPage('casesByPriority')"
              :disabled="
                paginationState.casesByPriority.currentPage ===
                totalPagesPriority
              "
              class="px-2 py-1 text-xs text-gray-800 rounded-md hover:text-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed transition duration-150"
            >
              &rarr;
            </button>
          </div>
        </div>

        <div class="shadow rounded-lg p-4 bg-white">
          <h3 class="text-lg font-bold text-red-600">Cases by Status</h3>
          <ul class="mt-2">
            <li
              v-for="(count, status) in paginatedCasesByStatus"
              :key="status"
              class="flex justify-between"
            >
              <span>{{ status }}</span>
              <span class="font-bold text-red-600">{{ count }}</span>
            </li>
          </ul>
          <!-- Pagination Controls -->
          <div class="flex justify-between items-center my-2 mt-3 text-sm">
            <button
              @click="prevPage('casesByStatus')"
              :disabled="paginationState.casesByStatus.currentPage === 1"
              class="px-2 py-1 text-xs text-gray-800 rounded-md hover:text-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed transition duration-150"
            >
              &larr;
            </button>
            <span class="text-gray-400"> </span>
            <button
              @click="nextPage('casesByStatus')"
              :disabled="
                paginationState.casesByStatus.currentPage === totalPagesStatus
              "
              class="px-2 py-1 text-xs text-gray-800 rounded-md hover:text-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed transition duration-150"
            >
              &rarr;
            </button>
          </div>
        </div>

        <div class="shadow rounded-lg p-4 bg-white">
          <h3 class="text-lg font-bold text-purple-600">Cases by Month</h3>

          <!-- Paginated List -->
          <ul class="mt-2">
            <li
              v-for="(count, month) in paginatedCasesByMonth"
              :key="month"
              class="flex justify-between"
            >
              <span>{{ month }}</span>
              <span class="font-bold text-purple-600">{{ count }}</span>
            </li>
          </ul>

          <!-- Pagination Controls -->
          <div class="flex justify-between items-center my-2 mt-3 text-sm">
            <button
              @click="prevPage('casesByMonth')"
              :disabled="paginationState.casesByMonth.currentPage === 1"
              class="px-2 py-1 text-xs text-gray-800 rounded-md hover:text-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed transition duration-150"
            >
              &larr;
            </button>
            <span class="text-gray-400"> </span>
            <button
              @click="nextPage('casesByMonth')"
              :disabled="
                paginationState.casesByMonth.currentPage === totalPagesMonth
              "
              class="px-2 py-1 text-xs text-gray-800 rounded-md hover:text-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed transition duration-150"
            >
              &rarr;
            </button>
          </div>
        </div>
        
      </div>
    </div>
  </main>
</template>
<script setup>
import { reactive, ref, computed, onMounted, watch } from "vue";
import breadcrumbWidget from "../../../components/widgets/breadcrumbs/admin.breadcrumb.vue";
import { useCaseStore } from "../../../stores/case.store";

const casesStore = useCaseStore();

const breadcrumbs = [
  { name: "Home", href: "/callcenter/dashboard", current: false },
  { name: "Dashboard", href: "#", current: true },
];

// Reactive data for stats
const stats = reactive({
  pendingActions: 0,
  casesByCategory: {},
  casesByPriority: {},
  casesByStatus: {},
  casesByMonth: {},
});

// Filters
const selectedPriority = ref("");
const selectedMonth = ref("");
const selectedYear = ref("");

// List of months and years
const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const availableYears = Array.from({ length: 10 }, (_, i) =>
  String(new Date().getFullYear() - i)
);

// Fetch data on mount
onMounted(async () => {
  const data = await casesStore.getadminofficerSummary();

  stats.pendingActions = data.pendingActions || 0;
  stats.casesByCategory = data.casesByCategory || {};
  stats.casesByPriority = data.casesByPriority || {};
  stats.casesByStatus = data.casesByStatus || {};
  stats.casesByMonth = data.casesByMonth || {};
});

// Pagination state for each dataset
const paginationState = reactive({
  casesByCategory: { currentPage: 1, itemsPerPage: 5 },
  casesByPriority: { currentPage: 1, itemsPerPage: 5 },
  casesByStatus: { currentPage: 1, itemsPerPage: 5 },
  casesByMonth: { currentPage: 1, itemsPerPage: 5 },
});

// Utility functions for filtering
function filterData(data) {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => {
      const [year, month] = key.split("-");
      return (
        (!selectedYear.value || year === String(selectedYear.value)) &&
        (!selectedMonth.value || month === selectedMonth.value) &&
        (!selectedPriority.value || key.includes(selectedPriority.value))
      );
    })
  );
}

watch([selectedPriority, selectedMonth, selectedYear], () => {
  Object.keys(paginationState).forEach(
    (key) => (paginationState[key].currentPage = 1)
  );
});

// Computed for filtered and paginated data
function getPaginatedData(dataKey) {
  const filteredData = filterData(stats[dataKey]);
  const { currentPage, itemsPerPage } = paginationState[dataKey];
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return Object.fromEntries(Object.entries(filteredData).slice(start, end));
}

const paginatedCasesByCategory = computed(() =>
  getPaginatedData("casesByCategory")
);
const paginatedCasesPriority = computed(() =>
  getPaginatedData("casesByPriority")
);
const paginatedCasesByStatus = computed(() =>
  getPaginatedData("casesByStatus")
);
const paginatedCasesByMonth = computed(() => getPaginatedData("casesByMonth"));

function getTotalPages(dataKey) {
  const filteredData = filterData(stats[dataKey]);
  return Math.ceil(
    Object.keys(filteredData).length / paginationState[dataKey].itemsPerPage
  );
}

const totalPagesCategory = computed(() => getTotalPages("casesByCategory"));
const totalPagesPriority = computed(() => getTotalPages("casesByPriority"));
const totalPagesStatus = computed(() => getTotalPages("casesByStatus"));
const totalPagesMonth = computed(() => getTotalPages("casesByMonth"));

// Pagination methods
function nextPage(dataKey) {
  const totalPages = getTotalPages(dataKey);
  if (paginationState[dataKey].currentPage < totalPages) {
    paginationState[dataKey].currentPage++;
  }
}

function prevPage(dataKey) {
  if (paginationState[dataKey].currentPage > 1) {
    paginationState[dataKey].currentPage--;
  }
}
</script>
