<template>
  <main class="mt-1 pb-8 font-bold">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <!-- Breadcrumb -->
      <breadcrumb-widget :breadcrumbs="breadcrumbs" />

      <!-- Header -->
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="font-bold text-3xl text-blue-400 py-4">Dashboard</h2>
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
              v-for="(count, priority) in filteredData.casesByPriority"
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
        <!-- Pending Actions -->
        <div
          class="shadow rounded-lg p-4 flex items-center justify-between bg-white"
        >
          <div>
            <h3 class="text-lg font-medium text-blue-600">Pending Actions</h3>
            <p class="text-2xl font-bold text-blue-600">
              {{ stats.pendingActions }}
            </p>
          </div>
          <i class="fas fa-tasks text-4xl text-blue-400"></i>
        </div>

        <!-- Cases by District -->
        <div class="shadow rounded-lg p-4 bg-white">
          <h3 class="text-lg font-medium text-green-600">Cases by District</h3>
          <ul class="mt-2">
            <li
              v-for="(count, district) in filteredData.casesByDistrict"
              :key="district"
              class="flex justify-between"
            >
              <span>{{ district }}</span>
              <span class="font-bold text-green-600">{{ count }}</span>
            </li>
          </ul>
        </div>

        <!-- Cases by Status -->
        <div class="shadow rounded-lg p-4 bg-white">
          <h3 class="text-lg font-medium text-red-600">Cases by Status</h3>
          <ul class="mt-2">
            <li
              v-for="(count, status) in filteredData.casesByStatus"
              :key="status"
              class="flex justify-between"
            >
              <span>{{ status }}</span>
              <span class="font-bold text-red-600">{{ count }}</span>
            </li>
          </ul>
        </div>

        <!-- Cases by Month -->
        <div class="shadow rounded-lg p-4 bg-white">
          <h3 class="text-lg font-medium text-purple-600">Cases by Month</h3>
          <ul class="mt-2">
            <li
              v-for="(count, month) in filteredData.casesByMonth"
              :key="month"
              class="flex justify-between"
            >
              <span>{{ month }}</span>
              <span class="font-bold text-purple-600">{{ count }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
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
  casesByDistrict: {},
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

const availableYears = Array.from(
  { length: 10 },
  (_, i) => new Date().getFullYear() - i
);

// Computed for filtered data
const filteredData = computed(() => ({
  casesByPriority: stats.casesByPriority,
  casesByDistrict: stats.casesByDistrict,
  casesByStatus: stats.casesByStatus,
  casesByMonth: filterData(stats.casesByMonth),
}));

// Utility functions for filtering
function filterData(data) {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([key]) =>
        (selectedMonth.value
          ? key.includes(`-${selectedMonth.value}`)
          : true) &&
        (selectedYear.value ? key.startsWith(selectedYear.value) : true)
    )
  );
}

// Fetch data on mount
onMounted(async () => {
  const data = await casesStore.getpseaofficerSummary();

  stats.pendingActions = data.pendingActions || 0;
  
  stats.casesByDistrict = data.seaAndGbvCasesByDistrict || {};
  stats.casesByPriority = data.seaAndGbvCasesByPriority || {};
  stats.casesByStatus = data.seaAndGbvCasesByStatus || {};
  stats.casesByMonth = data.seaAndGbvCasesByMonth || {};
});
</script>
