<template>
  <div>
    <button type="button"
      class="font-body inline-block px-6 py-2.5 bg-gray-500 text-white font-bold text-xs leading-tight rounded shadow-md hover:bg-gray-400 hover:shadow-lg focus:bg-gray-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-400 active:shadow-lg transition duration-100 ease-in-out capitalize"
      @click="open = true">
      new requisition
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
                <h5 class="text-md font-bold leading-normal text-gray-800" id="formModalLabel">
                  Create Requisition
                </h5>
                <button type="button"
                  class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  @click="open = false">
                  <XIcon class="h-4 w-4" /> <!-- Icon added here -->

                </button>


              </div>


              <form @submit="onSubmit" :validation-schema="CreateRequisitionSchema">
                <div class="px-4 py-5 bg-white sm:p-6">
                  <div class="grid grid-cols-6 gap-2">


                    <div class="col-span-12 sm:col-span-12">
                      <label for="user-district" class="block text-sm font-bold text-gray-700">
                        Select Disaster</label>
                      <select id="activity" name="activity" v-model="disasterId" autocomplete="activity-name"
                        class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                        <option v-for="item in disasters" :key="item.id" :value="item.id" class="uppercase">
                          {{ item.type }} | {{ item.date_of_occurrence }}
                        </option>
                      </select>
                      <p class="text-red-500 text-xs italic pt-1">
                        {{ disasterError }}
                      </p>
                    </div>

                    <div class="col-span-12 sm:col-span-12">
                      <label for="user-district" class="block text-sm font-bold text-gray-700 mb-2">
                        District: {{ user.district }}</label>
                    </div>

                    <div class="col-span-12 sm:col-span-12">
                      <label for="batch" class="block text-sm font-bold text-gray-700">Affected Households</label>
                      <input type="number" v-model="AffectedHouseholds" Name="AffectedHouseholds"
                        id="AffectedHouseholds" autocomplete="off" placeholder="Affected Households"
                        class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      <p class="text-red-500 text-xs italic pt-1">
                        {{ AffectedHouseholdsError }}
                      </p>
                    </div>

                    <div class="col-span-12 sm:col-span-12">
                      <label for="AffectedAreas" class="block text-sm font-bold text-gray-700">
                        TAs/Constituency Affected
                      </label>

                      <!-- Tags display -->
                      <div class="flex flex-wrap items-center border-gray-300 rounded-md border p-2 mt-1">
                        <span v-for="(place, index) in AffectedAreas" :key="index"
                          class="mr-2 mb-2 px-2 py-1 bg-blue-200 text-blue-800 rounded-lg text-sm flex items-center">
                          {{ place }}
                          <button @click="removeTag(index)" class="ml-1 text-red-500">&times;</button>
                        </span>

                        <!-- Input for adding new tags -->
                        <input type="text" v-model="newVillage" @keydown.enter.prevent="addTag"
                          placeholder="Add a place then place enter..."
                          class="flex-grow focus:ring-gray-500 focus:border-blue-300 border-none shadow-sm sm:text-sm" />
                      </div>

                      <!-- Error message -->
                      <p class="text-red-500 text-xs italic pt-1">{{ AffectedAreaError }}</p>
                    </div>



                    <div class="col-span-12 sm:col-span-12">
                      <label for="AffectedAreas" class="block text-sm font-bold text-gray-700">
                        GVHs/Wards Affected
                      </label>

                      <!-- Tags display -->
                      <div class="flex flex-wrap items-center border-gray-300 rounded-md border p-2 mt-1">

                        <!-- Input for adding new tags -->
                        <input type="number" v-model="newGvh" placeholder="Enter Number Affected"
                          class="flex-grow focus:ring-gray-500 focus:border-blue-300 border-none shadow-sm sm:text-sm" />
                      </div>

                    </div>

                    <div class="col-span-12 sm:col-span-12">
                      <label for="AffectedAreas" class="block text-sm font-bold text-gray-700">
                        Villages/Blocks Affected
                      </label>

                      <!-- Tags display -->
                      <div class="flex flex-wrap items-center border-gray-300 rounded-md border p-2 mt-1">

                        <!-- Input for adding new tags -->
                        <input type="number" v-model="newVillageVal" placeholder="Enter Number Affected"
                          class="flex-grow focus:ring-gray-500 focus:border-blue-300 border-none shadow-sm sm:text-sm" />
                      </div>

                    </div>

                  <!--   <div class="col-span-12 sm:col-span-12 tab-pane fade" id="user-file" role="tabpanel"
                      aria-labelledby="tabs-user-file">
                      <user-files v-bind:model="files" :key="refresh + 'File'" v-on:refresh="getFiles()" />

                    </div> -->
                    <div class="col-span-12 sm:col-span-12">
                      <h3 class="text-lg font-semibold text-[#096eb4] mb-3">Relief Items</h3>
                      <div class="space-y-3">
                        <div v-for="(item, index) in reliefItems" :key="index" class="flex space-x-4 items-center">
                          <div class="flex-1">
                            <label class="block text-sm font-bold text-gray-700">Commodity</label>
                            <select v-model="item.commodityId" @change="validateCommodity(index)"
                              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400 sm:text-sm p-2">
                              <option value="" disabled>Commodity</option>
                              <option v-for="commodity in commodities" :key="commodity" :value="commodity">
                                {{ commodity.Name }}
                              </option>
                            </select>
                            <p v-if="item.error" class="text-red-500 text-xs italic pt-1">{{ item.error }}</p>
                          </div>
                          <div class="flex-1">
                            <label class="block text-sm font-bold text-gray-700">Quantity {{ commodityUnit }}</label>
                            <input type="number" v-model.number="item.Quantity"
                              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400 sm:text-sm p-2"
                              placeholder="Quantity" />
                          </div>
                          <button type="button" @click="removeItem(item.id)" class="text-red-500 hover:text-red-700">
                            &times; <!-- A simple cross to remove the item -->
                          </button>
                        </div>
                        <button type="button" @click="addNewItem"
                          class="mt-2 px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md">
                          + Add Relief Item
                        </button>
                      </div>

                    </div>
                  </div>
                </div>

                <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div class="flex justify-end space-x-3">
                    <button type="button" @click="saveAsDraft"
                      class="inline-flex items-center px-3 py-2 text-sm font-bold text-green-600 hover:text-green-900 bg-white rounded-md border border-gray-300 hover:bg-gray-100">
                      <SaveIcon class="h-5 w-5 mr-3" />
                      Save as Draft
                    </button>

                    <button type="submit"
                      class="inline-flex items-center px-3 py-2 text-sm font-bold bg-blue-400 text-white hover:text-green-900 bg-white rounded-md border border-gray-300 hover:bg-gray-100">
                      Submit for action
                    </button>
                  </div>
                </div>


              </form>
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
import { XIcon, DocumentTextIcon, SaveIcon } from "@heroicons/vue/outline";
import { inject, ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useForm, useField, useSubmitForm, useIsFormValid } from "vee-validate";
//COMPONENTS
import spinnerWidget from "../../../components/widgets/spinners/default.spinner.vue";
//SCHEMA AND STORES
import { CreateRequisitionSchema } from "../../../services/schema/requisition.schema";
import { useRoleStore } from "../../../stores/role.store";
import { useUserStore } from "../../../stores/user.store";

import { usedistrictstore } from "../../../stores/districts.store";

import { useDisasterstore } from "../../../stores/disaster.store";

import { useFileStore } from "../../../stores/file.store";

const fileStore = useFileStore();
const files = reactive([]);

import UserFiles from "../../../components/pages/requisition/file.component.vue";

import { useactivitiestore } from "../../../stores/activity.store";

import { userequisitionstore } from "../../../stores/requisition.store";

import { useSessionStore } from "../../../stores/session.store";
//INJENCTIONS
const $router = useRouter();
const moment = inject("moment");
const emit = defineEmits(["create"]);
//VARIABLES
const isLoading = ref(false);
const open = ref(false);
const isPwd = ref(false);
const showModal = ref(false);
const roleStore = useRoleStore();

const userStore = useUserStore();
const roles = reactive([]);

const $route = useRoute();

const districtstore = usedistrictstore();
const districts = reactive([])


const activityStore = useactivitiestore();
const activities = reactive([])

const disasterStore = useDisasterstore();
const disasters = reactive([])

const props = defineProps({

  commodities: Array,
});

const warehouseStore = userequisitionstore();
const requisitions = reactive([])

const sessionStore = useSessionStore();

const user = ref(sessionStore.getUser);

//FORM
const { meta } = useForm({
  validationSchema: CreateRequisitionSchema,
  initialValues: {
    Quantity: "",
    ExpiryDate: "",
    commodityId: "",
    warehouseId: "",
    userId: ""

  },
});
///FIELDS
const { value: districtId, errorMessage: districtError } =
  useField("districtId");
const { value: AffectedHouseholds, errorMessage: AffectedHouseholdsError } = useField("AffectedHouseholds")
const { value: disasterId } = useField("disasterId");
const { value: activityId } = useField("activityId");



const id = ref(null);
//MOUNTED
onMounted(() => {
  getRequisition();
  getActivities()
  getDisasters()
  getDistricts()
  getFiles()
  
  id.value = $route.params.id;
});
//FUNCTIONS

const getFiles = async () => {

fileStore
  .getByReference({ id: id.value, type: "REQ-DOCUMENT" })
  .then((result) => {
    files.length = 0;
    files.push(...result);
  })
  .catch((error) => {
    /*   Swal.fire({
        title: "Failed",
        text: "failed to get files error (" + error + ")",
        icon: "error",
        confirmButtonText: "Ok",
      }); */
  })

};

const saveAsDraft = () => {
  if (validateAreas() && validateCommodities()) {
    const district = districts.find(d => d.Name === user.value.district);

    let draftModel = {
      disasterId: disasterId.value,
      districtId: district?.id, // Use the district's ID if found, otherwise null
      activityId: activityId.value,
      AffectedAreas: AffectedAreas.value.join(),
      AffectedHouseholds: AffectedHouseholds.value,
      gvhs: newGvh.value,
      villages_affected: newVillageVal.value,
      RequesterId: user.value.id,
      reliefItems: reliefItems.value,
      CreatedOn: currentDate.value,
      status: 3 // Status for Draft
    };

    emit("create", draftModel);
    open.value = false;
    draftModel = {};
  }
};

const getRequisition = async () => {
  warehouseStore
    .get()
    .then(result => {

      requisitions.length = 0; //empty array
      requisitions.push(...result);

    })
    .catch(error => {

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

    })
    .finally(() => {
    });
};

const getDisasters = async () => {
  disasterStore
    .get()
    .then(result => {

      disasters.length = 0; //empty array
      disasters.push(...result.filter(item => item.district == user.value.district || item.Requester?.district?.Name == "National"));

    })
    .catch(error => {

    })
    .finally(() => {
    });
};

const getActivities = async () => {
  activityStore
    .get()
    .then(result => {

      activities.length = 0; //empty array
      activities.push(...result);

    })
    .catch(error => {

    })
    .finally(() => {
    });
};

const reliefItems = ref([{ id: 1, commodityId: '', Quantity: '', NoBags: '', error: '' }]);
const commodityUnit = ref("")
function validateCommodity(index) {
  const selectedCommodity = reliefItems.value[index].commodityId.id;

  const commodity = props.commodities.find(c => c.id === selectedCommodity);

  if (commodity) {
    // Use the commodity details as needed
    commodityUnit.value = "(" + commodity?.Container_type + ")" // Assuming the commodity object has a 'unit' receipient
    console.log("Selected Commodity:", commodityUnit.value);

  }

  const isDuplicate = reliefItems.value.some((item, idx) => item.commodityId === selectedCommodity && idx !== index);
  reliefItems.value[index].error = isDuplicate ? "Commodity already added. Please select another." : "";
}

function addNewItem() {
  reliefItems.value.push({ id: reliefItems.value.length + 1, commodityId: '', Quantity: '', NoBags: '', error: '' });
}

function removeItem(id) {
  reliefItems.value = reliefItems.value.filter(item => item.id !== id);
}



const currentDate = ref(moment().format('YYYY-MM-DD HH:mm:ss'));

const onSubmit = useSubmitForm((values, actions) => {
  if (validateAreas() && validateCommodities()) {
    const district = districts.find(d => d.Name === user.value.district);

    let model = {
      disasterId: disasterId.value,
      districtId: district.id, // Use the district's ID if found, otherwise null
      activityId: activityId.value,
      AffectedAreas: AffectedAreas.value.join(),
      AffectedHouseholds: AffectedHouseholds.value,
      gvhs: newGvh.value,
      villages_affected: newVillageVal.value,
      RequesterId: user.value.id,
      reliefItems: reliefItems.value,
      CreatedOn: currentDate.value,
      status: 2 // Status for Draft

    };
    emit("create", model);
    open.value = false;
    model = {};
  }
});


const AffectedAreas = ref([]); // Array of tags (places)

const GVHSaffected = ref([]); // Array of tags (places)

const Villagesaffected = ref([]); // Array of tags (places)
const newVillage = ref(''); // Input value for new tags

const newGvh = ref(''); // Input value for new tags

const newVillageVal = ref(''); // Input value for new tags
const AffectedAreaError = ref(''); // Error message (if applicable)
const gvhAreaError = ref(''); // Error message (if applicable)
const disasterError = ref('')
const activityError = ref('')
const villageAreaError = ref(''); // Error message (if applicable)


const validateAreas = () => {
  let isValid = true;

  // Check if Disaster is selected
  if (!disasterId.value) {
    disasterError.value = "Disaster is required";
    isValid = false;
  } else {
    disasterError.value = "";
  }

  // Check if Affected Areas are added
  if (!AffectedAreas.value.length) {
    AffectedAreaError.value = "TAs cannot be empty, add a TA and press enter.";
    isValid = false;
  } else {
    AffectedAreaError.value = "";
  }

  // Check if GVHs are added
  if (!newGvh.value) {
    gvhAreaError.value = "GVHs/Wards Affected cannot be empty.";
    isValid = false;
  } else {
    gvhAreaError.value = "";
  }

  // Check if Villages/Blocks Affected are added
  if (!newVillageVal.value) {
    villageAreaError.value = "Villages/Blocks Affected cannot be empty.";
    isValid = false;
  } else {
    villageAreaError.value = "";
  }

  return isValid;
};


const validateCommodities = () => {
  let valid = true;
  reliefItems.value.forEach((item, index) => {
    if (!item.commodityId || !item.Quantity) {
      item.error = "Commodity and Quantity cannot be empty.";
      valid = false;
    } else {
      item.error = "";
    }
  });
  return valid;
};
function addTag() {
  const place = newVillage.value.trim();
  if (place && !AffectedAreas.value.includes(place)) {
    AffectedAreas.value.push(place);
    newVillage.value = '';
    AffectedAreaError.value = '';
  } else {
    AffectedAreaError.value = 'TA is either empty or already added!';
  }
}

function removeTag(index) {
  AffectedAreas.value.splice(index, 1);
}


</script>
