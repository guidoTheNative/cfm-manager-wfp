<template>
  <div>
    <button type="button" style="background-color: #248cd6;"
      class="font-body inline-flex items-center px-6 py-2.5 text-white font-bold text-xs leading-tight rounded shadow-md hover:bg-gray-400 hover:shadow-lg focus:bg-gray-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-400 active:shadow-lg transition duration-100 ease-in-out capitalize"
      @click="open = true">
      <PlusIcon class="h-5 w-5 mr-2" />
      Create a loading plan
    </button>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false" static>
        <div class="flex min-h-screen text-center md:block md:px-2 lg:px-4" style="font-size: 0">
          <TransitionChild class=" " v-if="open" as="template" enter="ease-out duration-300" enter-from="opacity-0"
            enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <DialogOverlay
              class="hidden pointer-events-none fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </TransitionChild>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">&#8203;</span>
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enter-to="opacity-100 translate-y-0 md:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 md:scale-100"
            leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
            <div
              class="font-body flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-2xl">
              <div
                class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md bg-white">
                <h5 class="font-body text-md font-bold leading-normal text-[#096eb4]" id="formModalLabel">
                  Create Loading Plan
                </h5>
                <button type="button"
                  class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  @click="open = false"></button>
              </div>

              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-2">

                  <div class="col-span-6 sm:col-span-3">
                    <label for="transporter" class="block text-sm font-bold text-gray-700">
                      Select Activity</label>

                    <select id="activity" name="activity" v-model="reports.activityId" autocomplete="activity-name"
                      class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      <!-- Static Option -->
                      <option value="stock-prepositioning" class="uppercase">
                        Stock Prepositioning
                      </option>

                      <!-- Dynamic Options -->
                      <option v-for="activity in activities" :key="activity.id" :value="activity.id" class="uppercase">
                        {{ activity.Name }}
                      </option>
                    </select>


                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="transporter" class="block text-sm font-bold text-gray-700">
                      Select Transporter</label>
                    <select id="transporter" name="transporter" v-model="reports.transporterId"
                      autocomplete="transporter-name"
                      class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      <option v-for="transporter in transporters" :key="transporter" :value="transporter.id"
                        class="uppercase">
                        {{ transporter.Name }}
                      </option>
                    </select>

                  </div>




                  <div class="col-span-6 sm:col-span-3">
                    <label for="transporter" class="block text-sm font-bold text-gray-700">
                      Select Commodity</label>
                    <select id="commodity" name="commodity" v-model="reports.commodityId" autocomplete="commodity-name"
                      class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      <option v-for="commodity in commodities" :key="commodity" :value="commodity.id" class="uppercase">
                        {{ commodity.Name }}
                      </option>
                    </select>

                  </div>

                  <div class="col-span-3 sm:col-span-3">
                    <label for="Handled By" class="block text-sm text-gray-700 font-bold">To Be Handled By</label>
                    <select id="HandledBy" name="HandledBy" required v-model="reports.HandledBy"
                      autocomplete="HandledBy-name"
                      class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      <option v-for="item in ['WFP', 'DoDMA']" :key="item" :value="item" class="uppercase">
                        {{ item }}
                      </option>
                    </select>
                  </div>


                </div>

                <div class="grid grid-cols-6 gap-2 mt-2">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="quantity" class="block text-sm font-bold text-gray-700">Quantity
                      ({{ selectedCommodityName?.commodityType?.Name == "Food" ? "MT" : "Units" }})</label>

                    <input type="number" name="quantity" required v-model="reports.Quantity" id="reportFrom"
                      autocomplete="quantity"
                      class="mt-2 focus:ring-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div class="col-span-6 sm:col-span-3 mb-5" v-if="reports.activityId !== 'stock-prepositioning'">
                    <label for="warehouse" class="block text-sm font-bold text-gray-700">Warehouse</label>

                    <select id="warehouse" name="warehouse" v-model="reports.warehouseId" autocomplete="warehouse-name"
                      class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      <option v-for="warehouse in warehouses" :key="warehouse" :value="warehouse.id" class="uppercase">
                        {{ warehouse.Name }}
                      </option>
                    </select>



                       <span class="text-md text-[#096eb4] mb-5 text-italic text-lg"
                      v-if="reports.commodityId && reports.warehouseId && reports.activityId && availableBalance !== 'Not Available'"> Commodity Balance: {{
                        availableBalance
                      }}</span>

                  </div>




                </div>

                <!-- Conditional Rendering for Stock Prepositioning -->
                <div v-if="reports.activityId === 'stock-prepositioning'" class="mt-5">
                  <!-- Styled Section Label -->
                  <div class="relative flex items-center mb-5">
                    <hr class="w-full border-gray-300" />
                    <span
                      class="absolute left-1/2 transform -translate-x-1/2 bg-white px-4 text-sm font-semibold text-[#096eb4]">
                      Stock Prepositioning
                    </span>
                  </div>

                  <!-- Move From Warehouse -->
                  <div class="col-span-6 sm:col-span-3 mb-5">
                    <label for="moveFromWarehouse" class="block text-sm font-bold text-gray-700">
                      Move From Warehouse
                    </label>
                    <select id="moveFromWarehouse" v-model="reports.moveFromWarehouseId"
                      class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
                        {{ warehouse.Name }}
                      </option>
                    </select>
                  </div>

                  <!-- Move To Warehouse -->
                  <div class="col-span-6 sm:col-span-3 mb-5">
                    <label for="moveToWarehouse" class="block text-sm font-bold text-gray-700">
                      Move To Warehouse
                    </label>
                    <select id="moveToWarehouse" v-model="reports.moveToWarehouseId"
                      class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
                        {{ warehouse.Name }}
                      </option>
                    </select>
                  </div>

                  <!-- Divider -->
                  <hr class="border-gray-300 mt-5 mb-4" />
                </div>






                <div class="grid grid-cols-6 gap-2">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="destination-district" class="block text-sm font-bold text-gray-700">Destination
                      District</label>

                    <select id="destination" name="destination" required v-model="reports.districtId"
                      autocomplete="destination-name"
                      class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      <option v-for="district in districts" :key="district" :value="district.id" class="uppercase">
                        {{ district.Name }}
                      </option>
                    </select>
                  </div>

                  <!--   <div class="col-span-6 sm:col-span-3">
                    <label for="project" class="block text-sm font-bold text-gray-700 mt-5">Project</label>

                    <label for="project" class="block text-xs text-italic font-bold text-gray-700 mt-5">Lean Season Response</label>

                  <select id="project" name="project" v-model="reports.projectId" autocomplete="project-name"
                      class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      <option v-for="project in projects" :key="project" :value="project.id" class="uppercase">
                        {{ project.Name }}
                      </option>
                    </select> 
                  </div>
                  -->

                  <div class="col-span-6 sm:col-span-3">
                    <label for="ATCNumber" class="block text-sm font-bold text-gray-700 mb-2">
                      ATC NUMBER
                    </label>
                    <input type="text" name="ATCNumber" v-model="reports.ATCNumber" id="ATCNumber"
                      autocomplete="ATCNumber"
                      class="mt-2 focus:ring-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                </div>

                <div class="grid grid-cols-6 gap-2 mt-2">




                  <div class="col-span-3 sm:col-span-3">
                    <label for="Start Date" class="block text-sm text-gray-700 font-bold">Start Date</label>
                    <input type="date" name="Start Date" v-model="reports.StartDate" required id="Start Date"
                      autocomplete="Start Date" :max="reports.EndDate || new Date().toISOString().split('T')[0]"
                      class="mt-2 focus:ring-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                  <div class="col-span-3 sm:col-span-3">
                    <label for="End Date" class="block text-sm font-bold text-gray-700">End Date</label>
                    <input type="date" name="End Date" v-model="reports.EndDate" required id="End Date"
                      autocomplete="End Date" :min="reports.StartDate"
                      class="mt-2 focus:ring-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>

                </div>

                <div class="grid grid-cols-6 gap-2 mt-2">






                </div>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button @click="onSubmit"
                  class="inline-flex items-center px-3 py-2 text-sm font-bold text-white bg-blue-400 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                  <CheckIcon class="h-5 w-5 mr-2" />
                  Submit Loading Plan
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import {
  Dialog,
  DialogOverlay,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XIcon, PlusIcon, CheckIcon } from "@heroicons/vue/outline";
import { inject, ref, reactive, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useForm, useField, useSubmitForm, useIsFormValid } from "vee-validate";
//COMPONENTS
import spinnerWidget from "../../../components/widgets/spinners/default.spinner.vue";
//SCHEMA AND STORES
import { CreateUserSchema } from "../../../services/schema/user.schema";
import { useRoleStore } from "../../../stores/role.store";
import { useUserStore } from "../../../stores/user.store";
import { useloadingplanstore } from "../../../stores/loadingplans.store";
import { usecommoditiestore } from "../../../stores/commodity.store";

const Swal = inject("Swal");
import { usecommodityinventoriestore } from "../../../stores/commodityinventories.store";
import { usewarehousestore } from "../../../stores/warehouse.store";
import { usedistrictstore } from "../../../stores/districts.store";
import { usetransporterstore } from "../../../stores/transporter.store";
import { useprojectstore } from "../../../stores/project.store";
import { useactivitiestore } from "../../../stores/activity.store";
import { useSessionStore } from "../../../stores/session.store";

///FIELDS
const { value: firstName, errorMessage: firstNameError } =
  useField("firstName");
const { value: lastName, errorMessage: lastNameError } = useField("lastName");
const { value: phone, errorMessage: phoneError } = useField("phone");
const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField("confirmPassword");
const { value: status, errorMessage: statusError } = useField("status");
const { value: roleId, errorMessage: roleIdError } = useField("roleId");

//INJENCTIONS
const $router = useRouter();
const moment = inject("moment");
const emit = defineEmits(["create"]);

//VARIABLES
const isLoading = ref(false);
const open = ref(false);
const isPwd = ref(true);
const showModal = ref(false);
const roleStore = useRoleStore();
const loadingplanstore = useloadingplanstore();
const loadingplans = reactive([])
const commoditiesstore = usecommoditiestore();
const commodities = reactive([])
const activitiestore = useactivitiestore();
const activities = reactive([])
const districtstore = usedistrictstore();
const districts = reactive([])
const projectstore = useprojectstore();
const projects = reactive([])
const transporterStore = usetransporterstore();
const transporters = reactive([])
const warehouseStore = usewarehousestore();
const warehouses = reactive([])

const availableBalance = ref(''); // Hold the available balance

const commodityinventoriestore = usecommodityinventoriestore();
const commodityinventories = reactive([])

const userStore = useUserStore();
const roles = reactive([]);
const sessionStore = useSessionStore();

//MOUNTED
onMounted(() => { getCommodityInventories(); getActivities(); getCommodities(); getDistricts(); getLoadingplan(); getProjects(); getTransporters(); getWarehouses(); });

const selectedCommodityName = computed(() => {
  const selectedCommodity = commodities.find(commodity => commodity.id === reports.value.commodityId);
  return selectedCommodity;
});

const reports = ref({});





//FUNCTIONS

const onSubmit = () => {
  // Ensure warehouseId and activityId default to 0 if not present
  if (!reports.value.warehouseId) {
    reports.value.warehouseId = 0;
  }

  if (!reports.value.activityId) {
    reports.value.activityId = 0;
  }

  reports.value.moveFromWarehouseId = reports.value.moveFromWarehouseId
  reports.value.moveToWarehouseId = reports.value.moveToWarehouseId
  // Validate that all fields are populated
  if ( !reports.value.transporterId || !reports.value.commodityId ||
    !reports.value.Quantity  || !reports.value.districtId ||
    !reports.value.ATCNumber || !reports.value.StartDate || !reports.value.EndDate) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'All fields are required!',
    });
    return; // Prevent form submission if any required field is missing
  }

  // Perform form submission
  emit("create", reports.value);
  reports.value = {}; // Reset form
  open.value = false; // Close the modal
};


const getLoadingplan = async () => {
  loadingplanstore
    .get()
    .then(result => {

      loadingplans.length = 0; //empty array
      loadingplans.push(...result);

    })
    .catch(error => {

    })
    .finally(() => {
    });
};


const getCommodityInventories = async () => {
  commodityinventoriestore
    .get()
    .then(result => {

      commodityinventories.length = 0; //empty array
      commodityinventories.push(...result);

    })
    .catch(error => {

    })
    .finally(() => {
    });
};

const getWarehouses = async () => {
  warehouseStore
    .get()
    .then(result => {
      warehouses.length = 0; // empty array

      // Sort alphabetically by 'name' before pushing to warehouses
      const sortedWarehouses = result.sort((a, b) => a.Name.localeCompare(b.Name));

      warehouses.push(...sortedWarehouses);
    })
    .catch(error => {
      // Handle error
    })
    .finally(() => {
      // Optional cleanup or final actions
    });
};



const getCommodities = async () => {
  commoditiesstore
    .get()
    .then(result => {
      commodities.length = 0; // empty array

      // Sort alphabetically by 'name' before pushing to commodities
      const sortedCommodities = result.sort((a, b) => a.Name.localeCompare(b.Name));

      commodities.push(...sortedCommodities);
    })
    .catch(error => {
      // Handle error
    })
    .finally(() => {
      // Optional cleanup or final actions
    });
};



const getActivities = async () => {
  activitiestore
    .get()
    .then(result => {
      activities.length = 0; // empty array

      // Sort alphabetically by 'name' before pushing to activities
      const sortedActivities = result.sort((a, b) => a.Name.localeCompare(b.Name));

      activities.push(...sortedActivities);
    })
    .catch(error => {
      // Handle error
    })
    .finally(() => {
      // Optional cleanup or final actions
    });
};


const getDistricts = async () => {
  districtstore
    .get()
    .then(result => {
      districts.length = 0; // empty array

      // Sort alphabetically by 'name' before pushing to districts
      const sortedDistricts = result.sort((a, b) => a.Name.localeCompare(b.Name));

      districts.push(...sortedDistricts);
    })
    .catch(error => {
      // Handle error
    })
    .finally(() => {
      // Optional cleanup or final actions
    });
};



const getProjects = async () => {
  projectstore
    .get()
    .then(result => {
      projects.length = 0; // empty array

      // Sort alphabetically by 'name' before pushing to projects
      const sortedProjects = result.sort((a, b) => a.Name.localeCompare(b.Name));

      projects.push(...sortedProjects);
    })
    .catch(error => {
      // Handle error
    })
    .finally(() => {
      // Optional cleanup or final actions
    });
};

const getTransporters = async () => {
  transporterStore
    .get()
    .then(result => {
      transporters.length = 0; // empty array

      // Sort alphabetically by 'name' before pushing to transporters
      const sortedTransporters = result.sort((a, b) => a.Name.localeCompare(b.Name));

      transporters.push(...sortedTransporters);
    })
    .catch(error => {
      // Handle error
    })
    .finally(() => {
      // Optional cleanup or final actions
    });
};

// Watch for changes in commodity and warehouse selections
watch(
  () => [reports.value.commodityId, reports.value.warehouseId, reports.value.activityId],
  ([newCommodityId, newWarehouseId, newActivityId]) => {
    if (newCommodityId && newWarehouseId) {
      // Find the corresponding inventory record based on the selection
      const matchingInventory = commodityinventories.find(
        (inventory) => inventory.commodityId === newCommodityId && inventory.warehouseId === newWarehouseId
         
      );

      // Update the available balance if a matching inventory record is found
      availableBalance.value = matchingInventory ? `${matchingInventory.Quantity.toFixed(2)} MT` : 'Not Available';
    } else {
      availableBalance.value = 'Select Commodity, Activity and Warehouse';
    }
  }
);
</script>
