<template>
  <main class="mt-1 pb-8 font-bold">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div>
        <breadcrumb-widget v-bind:breadcrumbs="breadcrumbs" />
      </div>

      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="font-bold leading-7 text-blue-400 sm:text-2xl py-3 sm:truncate">
            Dashboard
          </h2>
        </div>
      </div>



      <!-- Main 3 column grid -->
      <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8 mt-4">
    
        <!-- Content -->
        <div class="lg:col-span-3">
          <div class="grid grid-cols-1 gap-4">
            <!-- Welcome panel -->
            <section aria-labelledby="profile-overview-title">
              <div class="rounded-lg bg-white overflow-hidden shadow">
                <h2 class="sr-only" id="profile-overview-title">Profile Overview</h2>
          
              </div>
            </section>

         

          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { inject, ref, watch, reactive, onMounted, toRefs, computed, toRaw } from "vue";
import { useRouter } from "vue-router";
import { useSessionStore } from "../../../stores/session.store";

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

import "jspdf-autotable";
import breadcrumbWidget from "../../../components/widgets/breadcrumbs/admin.breadcrumb.vue";
import { useUserStore } from "../../../stores/user.store";

import ChartComponent from '../../../components/pages/charts/dashboardcharts.vue'; // Adjust path as needed
import distributionByCommodity from '../../../components/pages/charts/distributionByCommodity.vue'; // Adjust path as needed
import distributionByDistrict from '../../../components/pages/charts/distributionByDistrict.vue'; // Adjust path as needed
import distributionPercentage from '../../../components/pages/charts/distributionPercentage.vue'; // Adjust path as needed
import damageSummaryLean from '../../../components/pages/charts/damageSummaryLean.vue'; // Adjust path as needed
import damageSummaryLeans from '../../../components/pages/charts/damageSummaryLeans.vue'; // Adjust path as needed
import dispatchSummaryLeans from '../../../components/pages/charts/dispatchSummaryLean.vue'; // Adjust path as needed
import dispatchSummaryLeansThree from '../../../components/pages/charts/dispatchSummaryLean3.vue'; // Adjust path as needed

import dispatchSummaryLeansTwo from '../../../components/pages/charts/dispatchSummaryLean2.vue'; // Adjust path as needed
import dispatchSummaryLeansTwoTwo from '../../../components/pages/charts/dispatchSummaryLean22.vue'; // Adjust path as needed


import stockSummaryLean from '../../../components/pages/charts/stocksummarylean.vue'; // Adjust path as needed
import stockSummaryLeanTwo from '../../../components/pages/charts/stocksummarylean2.vue'; // Adjust path as needed

import allocationTrends from '../../../components/pages/charts/allocation_trends.vue'; // Adjust path as needed


import { useListingStore } from "../../../stores/catalogue.store";
import { usebookingstore } from "../../../stores/booking.store";
import { useReceivedCommoditiesStore } from "../../../stores/receivedCommodities.store";

import DonationsTable from './DonationsTable.vue';

import { useloadingplanstore } from "../../../stores/loadingplans.store";
import html2canvas from 'html2canvas';
import { useInstructedDispatchesStore } from "../../../stores/instructedDispatches.store";
import { useinstructionstore } from "../../../stores/instructions.store";

import { usereceiptstore } from "../../../stores/receipt.store";
import { usedonationstore } from "../../../stores/donation.store";

import { usedistrictstore } from "../../../stores/districts.store";

import { useactivitiestore } from "../../../stores/activity.store";

import { useDisasterstore } from "../../../stores/disaster.store";
import { usecommoditiestore } from "../../../stores/commodity.store";
import { usecommoditytypestore } from "../../../stores/commodity-type.store";
import CommodityDistributionTable from './CommodityDistributionTable.vue';
import CommodityDistributionTableLean from './CommodityDistributionTableLean.vue';

import CommodityDistributionTableLeanTwo from './CommodityDistributionTableLean2.vue';
import CommodityDistributionTableLeanWFP from './CommodityDistributionTableLeanWFP.vue';

import CommodityDistributionTableLeanDoDMA from './CommodityDistributionTableLeanDodma.vue';
const commodityDispatchDataWFP = ref([])
const commodityDispatchDataDoDMA = ref([])

const currentTab = ref('all');
// Active tab state
const activeTab = ref('emergency'); // Default tab is 'emergency'

// Function to switch tabs
const setActiveTab = (tab) => {
  activeTab.value = tab;
};
import createReportForm from "../../../components/pages/reports/create.component.vue";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  AcademicCapIcon,
  TemplateIcon,
  HeartIcon,
  ChartBarIcon,
  BadgeCheckIcon,
  DocumentDownloadIcon,
  CameraIcon,
  BellIcon,
  CashIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  LocationMarkerIcon,
  ClockIcon,
  MenuIcon,
  ReceiptRefundIcon,
  UsersIcon,
  XIcon,
  TruckIcon,
  DocumentDuplicateIcon,
  CollectionIcon,
  IdentificationIcon,
  OfficeBuildingIcon,
  DocumentIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  ArrowUpIcon,
  DocumentTextIcon, InboxIcon, ClipboardListIcon,
  ArrowDownIcon,
  ArchiveIcon
} from "@heroicons/vue/outline";

const screenshotMode = ref(false);

// Example data structure for maize distribution
const commodityDistributionData = ref([]);
const commodityDispatchData = ref([]);

const commodityDispatchData2 = ref([]);

const commodityDispatchData22 = ref([]);
const commodityEmergencyDispatchData = ref([]);

const currentView = ref('dashboard'); // The initial view can be 'dashboard' or 'charts'

const toggleView = (view) => {
  currentView.value = view;
};

const showTooltip = ref(false);

const districtstore = usedistrictstore();

const activitystore = useactivitiestore();

const commoditystore = usecommoditiestore();

const donationstore = usedonationstore();

const disasterStore = useDisasterstore();
const commoditytypestore = usecommoditytypestore();

const receivedcommoditiesstore = useReceivedCommoditiesStore();
const districts = reactive([]);

const activities = reactive([]);
const disasters = reactive([]);
const commodities = reactive([]);
const commodityTypes = reactive([]);
const warehouses = reactive([]);

const commodityTable = ref(null);

const takeScreenshot = () => {
  screenshotMode.value = true;

  // Use a timeout to delay the screenshot taking
  setTimeout(() => {
    if (commodityTable.value) {
      html2canvas(commodityTable.value.$el || commodityTable.value).then(canvas => {
        const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        const link = document.createElement('a');
        link.download = 'commodity-distribution.png';
        link.href = image;
        link.click();
        screenshotMode.value = false;
      }).catch(error => {
        console.error('Error taking screenshot:', error);
      });
    }
  }, 300);
};

import { userequisitionstore } from "../../../stores/requisition.store";
import { useDispatcherStore } from "../../../stores/dispatch.store";
const requisitionsStore = userequisitionstore();
const requisitions = reactive([]);
const dispatchesStore = useDispatcherStore();
const dispatches = reactive([]);
const loadingPlanStore = useloadingplanstore();
const loadingplans = reactive([]);
const instructionsStore = useinstructionstore();
const requisitionStore = userequisitionstore();
const recieptStore = usereceiptstore();
const receipts = reactive([]);

const $router = useRouter();
//INJENCTIONS
const moment = inject("moment");
const Swal = inject("Swal");
//VARIABLES
const sessionStore = useSessionStore();
const userStore = useUserStore();
const dispatchStore = useInstructedDispatchesStore();
const catalogueStore = useListingStore();
const bookingStore = usebookingstore();
const bookings = reactive([]);
const user = ref(sessionStore.getUser);
const role = ref(sessionStore.getRole);

const breadcrumbs = [
  { name: "Home", href: "/admin/dashboard", current: false },
  { name: "", href: "#", current: true },
];

let catalogueCount = ref(0);

const users = reactive([]);
const dispaches = reactive([]);

const donations = reactive([]);
const isLoading = ref(false);

const loadingPlanSummary = reactive([]);

const leanStockSummary = ref([]);

const selectedFilter = ref("all");
let userCount = ref(0);
const newRequisitionsCount = ref(0);
const receiptcount = ref(0)
const dispatchcount = ref(0)
const loadingplansCount = ref(0)
//MOUNTEDgetCatalogue
onMounted(async () => {

  isLoading.value = true;
  try {
    await fetchFilteredData()
    await fetchFilteredDataAll()
    await fetchFilteredDataDodma()
    const data = await requisitionStore.getCommodityDistributionSummary();
    const dispatchdata = await dispatchesStore.getdispatchDamageSummary();


    const dispatchEmergencydata = await receivedcommoditiesstore.getdispatchDamageSummary();
    const leanstocks = await loadingPlanStore.getloadingplansSummaryByCommodity();
    commodityDispatchData.value.length = 0
    commodityEmergencyDispatchData.value.length = 0
    leanStockSummary.value = [...leanstocks]
    commodityDispatchData.value.push({ ...dispatchdata })
    const dispatchdata22 = await dispatchesStore.getdispatchSummary2();

    commodityDispatchData22.value.push({ ...dispatchdata22 })
    commodityEmergencyDispatchData.value.push({ ...dispatchEmergencydata })
    commodityDistributionData.value = [...data];
  } catch (error) {
    console.error("Failed to load commodity data:", error);
  } finally {
    isLoading.value = false;
  }
  getActivities();
  getCommodities();
  getDisasters();
  getDistricts();
  getDonations();
  getLoadingPlans();
  getdispatchSummary();
  getUsers();
  getDispatches();
  getReceipts();
  getDispatchesCount();
  getLoadingPlansPending();
  getloadingplansSummary();
  getloadingplansSummaryEMR()
  getloadingplansSummaryByCommodity();
  getInstructions();
  getRequisitions();
});



function applyFilter() {
  console.log(`Filter applied: ${selectedFilter.value}`);
  // Add logic to filter data based on selectedFilter
  // Example: Filter by date range for each filter option
}

const fetchFilteredData = async () => {
  try {
    const data = await dispatchesStore.getExtendedDispatchSummaryWFP(selectedFilter.value || null);
    commodityDispatchDataWFP.value = data;
  } catch (error) {
    console.error("Error fetching filtered dispatch data:", error);
  }
};


const fetchFilteredDataAll = async () => {
  try {
    const data = await dispatchesStore.getExtendedDispatchSummary(selectedFilter.value || null);

    commodityDispatchData2.value = data;
  } catch (error) {
    console.error("Error fetching filtered dispatch data:", error);
  }
};


const fetchFilteredDataDodma = async () => {
  try {

    const data = await dispatchesStore.getExtendedDispatchSummaryDodma(selectedFilter.value || null);;

    commodityDispatchDataDoDMA.value = data

  } catch (error) {
    console.error("Error fetching filtered dispatch data:", error);
  }
};



const instructions = reactive([])
const newInstructionsCount = ref(0)

const getDisasters = async () => {
  disasterStore
    .get()
    .then(result => {
      disasters.length = 0; //empty array
      disasters.push(...result);
    })
    .catch(error => {
      console.error("Failed to load disasters:", error);
    })
    .finally(() => {
    });
};

const getDonations = async () => {
  donationstore
    .get()
    .then(result => {
      donations.length = 0; //empty array
      donations.push(...result);
    })
    .catch(error => {
      console.error("Failed to load donations:", error);
    })
    .finally(() => {
    });
};

const getCommodities = async () => {
  commoditystore
    .get()
    .then(result => {
      commodities.length = 0; //empty array
      commodities.push(...result);
    })
    .catch(error => {
      console.error("Failed to load commodities:", error);
    })
    .finally(() => {
    });
};

const getDistricts = async () => {
  districtstore
    .get()
    .then(result => {
      districts.length = 0; //empty array
      districts.push(...result);

    })
    .catch(error => {
      console.error("Failed to load districts:", error);
    })
    .finally(() => {
    });
};

const activitiesLsr = reactive([])
const getActivities = async () => {
  activitystore
    .get()
    .then(result => {
      activities.length = 0; // empty array
      activities.push(
        ...result.filter(activity => !activity.Name.toLowerCase().includes("emergency"))
      );

      activitiesLsr.push(
        ...result.filter(activity => !activity.Name.toLowerCase().includes("lsr"))
      );
    })
    .catch(error => {
      console.error("Failed to load activities:", error);
    });
};


const getInstructions = async () => {
  loadingPlanStore
    .getloadingplansSummaryPrepo()
    .then((result) => {
      newInstructionsCount.value = result.totalQuantity.toLocaleString() + " MT";
    })
    .catch(error => {
      console.error("Failed to load plans:", error);
    });
};

const getRequisitions = async () => {
  isLoading.value = true;
  requisitionsStore
    .get()
    .then((result) => {
      requisitions.length = 0;
      requisitions.push(...result.filter(item => item.IsArchived == false || item.IsArchived == null));
      newRequisitionsCount.value = requisitions.length;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const getReceipts = async () => {
  recieptStore.count().then((result) => {
    receiptcount.value = result.count;
  });
};

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(commodityDistributionData.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Commodity Distribution');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  saveAs(data, 'commoditydistributionreport.xlsx');
};

const getloadingplansSummaryByCommodity = async () => {
  loadingPlanStore
    .getloadingplansSummaryByCommodity()
    .then(result => {
      loadingPlanSummary.length = 0;
      loadingPlanSummary.push(...result);
    })
}

const completedDispatch = ref(0)
const getDispatches = async () => {
  isLoading.value = true;
  dispatchStore
    .get()
    .then(result => {
      const sortedDispatches = [...result].sort((a, b) => new Date(b.createdon) - new Date(a.createdon));
      dispaches.length = 0;
      let reversedData = sortedDispatches.reverse();
      dispaches.push(...reversedData);
      completedDispatch.value = dispaches.filter(item => item.IsArchived).length
    })
    .finally(() => {
      isLoading.value = false;
    });
}

const getDispatchesCount = async () => {
  dispatchStore.count().then((result) => {
    dispatchcount.value = result.count;
  });
}

const loadingplansCountPending = ref(0)

const getLoadingPlans = async () => {
  loadingPlanStore
    .getloadingplansByATC()
    .then(result => {
      loadingplans.length = 0;
      loadingplans.push(...result);
      loadingplansCount.value = loadingplans.length

      loadingplansCountPending.value = loadingplans.filter(item => item.isApproved == false).length
    })
}

const pendingplans = ref(0)
const totalBalance = ref(0)

const totalBalanceEMR = ref(0)
const totalStockPlanned = ref("")

const totalRequiredTonnage = ref("")
const dispatchPercentageFormated = ref("")
const dispatchPercentageFormatedEMR = ref("")
const totalDispatched = ref(0)
const totalReceived = ref("")
const receivedPercentageFormated = ref("")
const receivedPercentage = ref("")
const dispatchPercentage = ref("")
const dispatchPercentageEMR = ref("")
const getLoadingPlansPending = async () => {
  loadingPlanStore
    .getloadingplansPending()
    .then(result => {
      pendingplans.value = result.count
    })
}
const getdispatchSummary = async () => {
  dispatchesStore
    .getdispatchSummary()
    .then(result => {
      totalDispatched.value = result.totalDispatched.toLocaleString() + " MT"
      totalReceived.value = result.totalReceived.toLocaleString() + " MT"
      receivedPercentageFormated.value = result.dispatchPercentage.toFixed(2) + '% received'
      receivedPercentage.value = result.dispatchPercentage.toFixed(2)
    })
}



const getloadingplansSummary = async () => {
  loadingPlanStore
    .getloadingplansSummary()
    .then(result => {
      totalStockPlanned.value = result.totalStockPlanned.toLocaleString() + " MT"
      totalBalance.value = result.totalBalance
      dispatchPercentageFormated.value = result.dispatchPercentage.toFixed(2) + '% dispatched'
      dispatchPercentage.value = result.dispatchPercentage.toFixed(2)
    })
}

const getloadingplansSummaryEMR = async () => {
  loadingPlanStore
    .getloadingplansSummaryEMR()
    .then(result => {
      totalRequiredTonnage.value = result.totalStockPlanned.toLocaleString() + " MT"
      totalBalanceEMR.value = result.totalBalance
      dispatchPercentageFormatedEMR.value = result.dispatchPercentage.toFixed(2) + '% dispatched'
      dispatchPercentageEMR.value = result.dispatchPercentage.toFixed(2)
    })
}

const getUsers = async () => {
  userStore.count().then((result) => {
    userCount.value = result.count;
  });

  userStore
    .get()
    .then(result => {
      users.length = 0;
      users.push(...result);
      users.sort((a, b) => new Date(b.created) - new Date(a.created));
    })
    .finally(() => {
      isLoading.value = false;
    });
};



const stats2 = ref([
  {
    label: 'Total Stocks Planned (Lean Season Response)',
    value: totalStockPlanned,
    icon: dispatchPercentage < 50 ? CheckCircleIcon : ExclamationCircleIcon,
    iconColor: dispatchPercentage < 50 ? 'green-500' : 'red-500',
    percentageText: dispatchPercentageFormated,
    textColor: dispatchPercentage < 50 ? 'green-500' : 'red-500',
    showProgress: true,
    moreInfo: true,
    progress: dispatchPercentage,
    isProgressPositive: dispatchPercentage >= 50,
    progressColor: dispatchPercentage < 50 ? 'green-500' : 'red-500',
  },


  {
    label: 'Total Stocks Planned (Emergency Assistance)',
    value: totalRequiredTonnage,
    icon: dispatchPercentageEMR < 50 ? CheckCircleIcon : ExclamationCircleIcon,
    iconColor: dispatchPercentageEMR < 50 ? 'green-500' : 'red-500',
    percentageText: dispatchPercentageFormatedEMR,
    textColor: dispatchPercentageEMR < 50 ? 'green-500' : 'red-500',
    showProgress: true,
    moreInfo: true,
    progress: dispatchPercentageEMR,
    isProgressPositive: dispatchPercentageEMR >= 50,
    progressColor: dispatchPercentageEMR < 50 ? 'green-500' : 'red-500',
  },


  {
    label: 'Total Prepositioned Stock',
    value: newInstructionsCount,
    icon: ArchiveIcon,
    iconColor: 'blue-400',
    percentageText: '',
    textColor: 'blue-400',
    showProgress: false,
    moreInfo: true,
    link: true,
  },

]);


const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'];

const damagedStockStats = computed(() => {
  if (commodityDispatchData.value.length === 0 || !commodityDispatchData.value[0].commoditySummary) {
    return [];
  }
  const commodities = [...new Set(commodityDispatchData.value[0].commoditySummary.map(item => item.commodity))];

  return commodities.map((commodity, index) => {
    const totalForCommodity = commodityDispatchData.value[0].commoditySummary
      .filter(item => item.commodity === commodity)


    return {
      commodity,
      percentage: totalForCommodity[0].damagePercentage.toFixed(2),
      color: colors[index % colors.length]
    };
  });
});

const damagedStockStatsEmergency = computed(() => {
  if (commodityEmergencyDispatchData.value.length === 0 || !commodityEmergencyDispatchData.value[0].commoditySummary) {
    return [];
  }
  const commodities = [...new Set(commodityEmergencyDispatchData.value[0].commoditySummary.map(item => item.commodity))];

  return commodities.map((commodity, index) => {
    const totalForCommodity = commodityEmergencyDispatchData.value[0].commoditySummary
      .filter(item => item.commodity === commodity)
    return {
      commodity,
      percentage: totalForCommodity[0].overallDamagePercentage.toFixed(2),
      color: colors[index % colors.length]
    };
  });
});



// Filters
const selectedDistrict = ref('');

const selectedActivity = ref('');
const selectedCommodity = ref('');
const selectedDisaster = ref('');
const selectedDateFrom = ref('');
const selectedDateTo = ref('');

// Reset filters
const resetFilters = () => {
  selectedDistrict.value = '';
  selectedActivity.value = ''
  selectedCommodity.value = '';
  selectedDisaster.value = '';
  selectedDateFrom.value = '';
  selectedDateTo.value = '';
};

// Filtered data for Emergency Response Dashboard
const filteredCommodityDistributionData = computed(() => {
  return commodityDistributionData.value.filter(item => {


    const matchDistrict = !selectedDistrict.value || item.district === selectedDistrict.value;
    const matchCommodity = !selectedCommodity.value || item.commodity === selectedCommodity.value;
    const matchDisaster = !selectedDisaster.value || item.disaster === selectedDisaster.value;
    const matchDate = (!selectedDateFrom.value || moment(item.date_of_occurrence).isSameOrAfter(selectedDateFrom.value)) &&
      (!selectedDateTo.value || moment(item.date_of_occurrence).isSameOrBefore(selectedDateTo.value));
    return matchDistrict && matchCommodity && matchDisaster && matchDate;
  });
});




const flattenedData2 = computed(() => {
  if (!commodityDispatchData22.value || commodityDispatchData22.value.length === 0) {
    return []; // Return an empty array if data is not available
  }

  // Assume props.data is an array with a single object containing numerically indexed keys
  const [dataObj] = commodityDispatchData22.value; // Extract the first object (your data)
  return Object.values(dataObj); // Convert the object into an array of values
});




const filteredLeanCommodityDispatchData2 = computed(() => {
  return commodityDispatchData2.value.filter(item => {

    const matchActivity = !selectedActivity.value || item.activity === selectedActivity.value;
    const matchDistrict = !selectedDistrict.value || item.district === selectedDistrict.value;
    const matchCommodity = !selectedCommodity.value || item.commodity === selectedCommodity.value;


    return matchActivity && matchCommodity && matchDistrict;
  });
});


const filteredLeanCommodityDispatchData22 = computed(() => {
  return flattenedData2.value.filter(item => {

    const matchActivity = !selectedActivity.value || item.activity === selectedActivity.value;
    const matchDistrict = !selectedDistrict.value || item.district === selectedDistrict.value;
    const matchCommodity = !selectedCommodity.value || item.commodity === selectedCommodity.value;


    return matchActivity && matchCommodity && matchDistrict;
  });
});


const filteredLeanCommodityDispatchDataWFP = computed(() => {


  return commodityDispatchDataWFP.value.filter(item => {



    const matchActivity = !selectedActivity.value || item.activity === selectedActivity.value;
    const matchDistrict = !selectedDistrict.value || item.district === selectedDistrict.value;
    const matchCommodity = !selectedCommodity.value || item.commodity === selectedCommodity.value;

    return matchActivity && matchCommodity && matchDistrict;
  });
});


const filteredLeanCommodityDispatchDataDodma = computed(() => {
  return commodityDispatchDataDoDMA.value.filter(item => {

    const matchActivity = !selectedActivity.value || item.activity === selectedActivity.value;
    const matchDistrict = !selectedDistrict.value || item.district === selectedDistrict.value;
    const matchCommodity = !selectedCommodity.value || item.commodity === selectedCommodity.value;


    return matchActivity && matchCommodity && matchDistrict;
  });
});

const filteredLeanStockSummary = computed(() => {
  return leanStockSummary.value.filter(item => {
    const matchCommodity = !selectedCommodity.value || item.commodityName == selectedCommodity.value;
    const matchDistrict = !selectedDistrict.value || item.commodityName == selectedDistrict.value;
    const matchActivity = !selectedActivity.value || item.commodityName == selectedActivity.value;

    return matchCommodity && matchActivity && matchDistrict;
  });
});
</script>

<style scoped>
.tab-button2 {
  background-color: white;
  color: #3498db;
  /* Blue text color */
  border: 1px solid #3498db;
  padding: 10px 20px;
  font-weight: 500;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.tab-button2:hover {
  background-color: #3498db;
  /* Light blue hover background */
  color: #eaf4fb;
  /* Blue text color */

}



.border {
  border-width: 1px;
  border-color: rgba(11, 138, 216, 0.2);
  transition: border-color 0.3s ease;
}

.tab-button {
  background-color: #248cd6;
  color: white;
  border: none;
}


.tabs {
  display: flex;
  margin-bottom: 1rem;
}


.tab-button.active {
  background: gray;
  color: white;
}

.active-tab {
  background-color: #0f6c97;
  color: white;
}

.rounded-table {
  border-radius: 10px;
  overflow: hidden;
}

.bg-blue-400 {
  background-color: #096eb4;
}

.h-20 {
  height: 80px;
}

.mr-4 {
  margin-right: 16px;
}

img.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>
