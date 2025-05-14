<template>
  <main class="mt-1 pb-8 font-bold">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <!-- Breadcrumb -->
      <breadcrumb-widget :breadcrumbs="breadcrumbs" />

      <!-- Header -->
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="font-bold text-3xl text-[#096eb4] py-4">Cases Overview</h2>
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
              v-for="(count, priority) in dashboardData.casesByPriority"
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
   
        <!-- Cases by Category Card -->
        <div class="shadow rounded-lg p-4 bg-white">
          <h3 class="text-lg font-bold text-yellow-600">Cases by Category</h3>
          <ul class="mt-2">
            <li
              v-for="(item, index) in flattenedData"
              :key="index"
              class="flex justify-between"
            >
              <span>{{ item.district }} - {{ item.category }}</span>
              <span class="font-bold text-yellow-600">{{ item.count }}</span>
            </li>
          </ul>
        </div>

        <div class="shadow rounded-lg p-4 bg-white">
          <h3 class="text-lg font-bold text-purple-600">Cases by Priority</h3>
          <ul class="mt-2">
            <li
              v-for="(item, index) in flattenedPriorityData"
              :key="index"
              class="flex justify-between"
            >
              <span>{{ item.district }} - {{ item.priority }}</span>
              <span class="font-bold text-purple-600">{{ item.count }}</span>
            </li>
          </ul>
        </div>

        <!-- Cases by Status Card -->
        <div class="shadow rounded-lg p-4 bg-white">
          <h3 class="text-lg font-bold text-purple-600">Cases by Status</h3>
          <ul class="mt-2">
            <li
              v-for="(item, index) in flattenedStatusData"
              :key="index"
              class="flex justify-between"
            >
              <span>{{ item.district }} - {{ item.status }}</span>
              <span class="font-bold text-purple-600">{{ item.count }}</span>
            </li>
          </ul>
        </div>

        <!-- Cases by Month Card -->
        <div class="shadow rounded-lg p-4 bg-white">
          <h3 class="text-lg font-bold text-teal-600">Cases by Month</h3>
          <ul class="mt-2">
            <li
              v-for="(item, index) in flattenedMonthData"
              :key="index"
              class="flex justify-between"
            >
              <span>{{ item.district }} - {{ item.month }}</span>

              <span class="font-bold text-teal-600">{{ item.count }}</span>
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

import { useSessionStore } from "../../../stores/session.store";

const sessionStore = useSessionStore();
const user = ref(sessionStore.getUser);
const caseStore = useCaseStore();

const breadcrumbs = [
  { name: "Home", href: "/cp/dashboard", current: false },
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

const dashboardData = ref({
  pendingActions: 0,
  casesByDistrict: {},
  casesByCategory: {},
  casesByPriority: {},
  casesByStatus: {},
  casesByMonth: {},
});

const flattenedData = computed(() => {
  // Flatten the casesByCategory object
  const flattened = [];
  for (const district in dashboardData.value.casesByCategory) {
    for (const category in dashboardData.value.casesByCategory[district]) {
      flattened.push({
        district,
        category,
        count: dashboardData.value.casesByCategory[district][category],
      });
    }
  }
  let categoryData = flattened.filter(
    (item) => item.district === user.value.district
  );
  return categoryData;
});

const flattenedStatusData = computed(() => {
  // Flatten the casesByCategory object
  const flattened = [];
  for (const district in dashboardData.value.casesByStatus) {
    for (const status in dashboardData.value.casesByStatus[district]) {
      flattened.push({
        district,
        status,
        count: dashboardData.value.casesByStatus[district][status],
      });
    }
  }

  let statusData = flattened.filter(
    (item) => item.district === user.value.district
  );

  return statusData;
});

const flattenedPriorityData = computed(() => {
  // Flatten the casesByCategory object
  const flattened = [];
  for (const district in dashboardData.value.casesByPriority) {
    for (const priority in dashboardData.value.casesByPriority[district]) {
      flattened.push({
        district,
        priority,
        count: dashboardData.value.casesByPriority[district][priority],
      });
    }
  }

  let PriorityData = flattened.filter(
    (item) => item.district === user.value.district
  );
  return PriorityData;
});

const flattenedMonthData = computed(() => {
  // Flatten the casesByCategory object
  const flattened = [];
  for (const district in dashboardData.value.casesByMonth) {
    for (const month in dashboardData.value.casesByMonth[district]) {
      flattened.push({
        district,
        month,
        count: dashboardData.value.casesByMonth[district][month],
      });
    }
  }

  let MonthData = flattened.filter(
    (item) => item.district === user.value.district
  );
  return MonthData;
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
  casesByDistrict: filterData(dashboardData.value.casesByDistrict),
  casesByCategory: filterData(dashboardData.value.casesByCategory),
  casesByPriority: filterData(dashboardData.value.casesByPriority),
  casesByStatus: filterData(dashboardData.value.casesByStatus),
  casesByMonth: filterData(dashboardData.value.casesByMonth),
}));

// Utility functions for filtering
// Utility functions for filtering
function filterData(data) {
  return Object.fromEntries(
    Object.entries(data).filter(([key, value]) => {
      // Filter by month
      const isMonthMatch = selectedMonth.value
        ? key.includes(`-${selectedMonth.value}`)
        : true;

      // Filter by year
      const isYearMatch = selectedYear.value
        ? key.startsWith(selectedYear.value)
        : true;

      // Filter by priority (for casesByPriority)
      const isPriorityMatch =
        selectedPriority.value && data === dashboardData.value.casesByPriority
          ? Object.keys(value).some(
              (priority) => priority === selectedPriority.value
            )
          : true;

      return isMonthMatch && isYearMatch && isPriorityMatch;
    })
  );
}

onMounted(() => {
  getDashboardData();
});

const getDashboardData = async () => {
  try {
    const data = await caseStore.getfieldofficerSummary();

    dashboardData.value = data;
  } catch (error) {
    console.error("Failed to fetch dashboard data", error);
  }
};

const currentPage = ref({
  district: 1,
  category: 1,
  priority: 1,
  status: 1,
  month: 1,
});

const itemsPerPage = 5;

const getPaginatedData = (data) => {
  const startIndex = (currentPage.value.district - 1) * itemsPerPage;
  return Object.entries(data)
    .slice(startIndex, startIndex + itemsPerPage)
    .map(([key, value]) => ({ district: key, count: value }));
};

const shouldShowPagination = (data) => {
  return Object.keys(data).length > itemsPerPage;
};

const totalPages = (data) => {
  return Math.ceil(Object.keys(data).length / itemsPerPage);
};

const previousPage = (card) => {
  if (currentPage.value[card] > 1) {
    currentPage.value[card]--;
  }
};

const nextPage = (card) => {
  if (currentPage.value[card] < totalPages(filteredData.casesByDistrict)) {
    currentPage.value[card]++;
  }
};
</script>
