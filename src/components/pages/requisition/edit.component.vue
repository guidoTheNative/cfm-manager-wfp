<template>
  <div>

    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="closeDialog" static>
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
                  Update Requisition
                </h5>
                <button type="button"
                  class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  @click="closeDialog">
                  <XIcon class="h-4 w-4" /> <!-- Icon added here -->

                </button>


              </div>


              <form @submit="onSubmit" :validation-schema="CreateRequisitionSchema">
                <div class="px-4 py-5 bg-white sm:p-6">
                  <div class="grid grid-cols-6 gap-2">

                    <div class="col-span-12 sm:col-span-12">
                      <label for="user-district" class="block text-sm font-bold text-gray-700">
                        Select Activity</label>
                      <select id="activity" name="activity" v-model="Requisition.activityId"
                        autocomplete="activity-name"
                        class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                        <option v-for="item in activities" :key="item.id" :value="item.id" class="uppercase">
                          {{ item.Name }}
                        </option>
                      </select>
                      <p class="text-red-500 text-xs italic pt-1">
                        {{ activityError }}
                      </p>
                    </div>

                    <div class="col-span-12 sm:col-span-12">
                      <label for="user-district" class="block text-sm font-bold text-gray-700">
                        Select Disaster</label>
                      <select id="activity" name="activity" v-model="Requisition.disasterId"
                        autocomplete="activity-name"
                        class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                        <option v-for="item in disasters" :key="item.id" :value="item.id" class="uppercase">
                          {{ item.name }}
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
                      <input type="number" v-model="Requisition.AffectedHouseholds" Name="AffectedHouseholds"
                        id="AffectedHouseholds" autocomplete="off" placeholder="Affected Households"
                        class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      <p class="text-red-500 text-xs italic pt-1">
                        {{ AffectedHouseholdsError }}
                      </p>
                    </div>

                    <div class="col-span-12 sm:col-span-12">
                      <label for="AffectedAreas" class="block text-sm font-bold text-gray-700">
                        TAs Affected
                      </label>
                      <!-- Tags display -->
                      <!-- Your Vue Template -->

                      <div class="flex flex-wrap items-center border-gray-300 rounded-md border p-2 mt-1">
                        <span
                          v-for="(place, index) in Requisition.AffectedAreas?.split(',').map(v => v.trim()).filter(v => v) || []"
                          :key="index"
                          class="mr-2 mb-2 px-2 py-1 bg-blue-200 text-blue-800 rounded-lg text-sm flex items-center">
                          {{ place }}
                          <button @click="removeTag(index)" class="ml-1 text-red-500">&times;</button>
                        </span>

                        <!-- Input for adding new tags -->
                        <input type="text" v-model="newVillage" @keydown.enter.prevent="addTag"
                          placeholder="Add a place then press enter..."
                          class="flex-grow focus:ring-gray-500 focus:border-blue-300 border-none shadow-sm sm:text-sm" />
                      </div>
                      <p class="text-red-500 text-xs italic pt-1">{{ AffectedAreaError }}</p>


                      <!-- Error message -->
                      <p class="text-red-500 text-xs italic pt-1">{{ AffectedAreaError }}</p>
                    </div>


                    <div class="col-span-12 sm:col-span-12">
                      <label for="AffectedAreas" class="block text-sm font-bold text-gray-700">
                        GVHs Affected
                      </label>

                      <!-- Tags display -->
                      <div class="flex flex-wrap items-center border-gray-300 rounded-md border p-2 mt-1">
                        <span
                          v-for="(place, index) in Requisition.gvhs?.split(',').map(v => v.trim()).filter(v => v) || []"
                          :key="index"
                          class="mr-2 mb-2 px-2 py-1 bg-blue-200 text-blue-800 rounded-lg text-sm flex items-center">
                          {{ place }}
                          <button @click="removeTagGvh(index)" class="ml-1 text-red-500">&times;</button>
                        </span>

                        <!-- Input for adding new tags -->
                        <input type="text" v-model="newGvh" @keydown.enter.prevent="addTagGvh"
                          placeholder="Add a place then place enter..."
                          class="flex-grow focus:ring-gray-500 focus:border-blue-300 border-none shadow-sm sm:text-sm" />
                      </div>
                      <p class="text-red-500 text-xs italic pt-1">{{ gvhAreaError }}</p>

                    </div>

                    <div class="col-span-12 sm:col-span-12">
                      <label for="AffectedAreas" class="block text-sm font-bold text-gray-700">
                        Villages Affected
                      </label>

                      <!-- Tags display -->

                      <div class="flex flex-wrap items-center border-gray-300 rounded-md border p-2 mt-1">
                        <span
                          v-for="(place, index) in Requisition.villages_affected?.split(',').map(v => v.trim()).filter(v => v) || []"
                          :key="index"
                          class="mr-2 mb-2 px-2 py-1 bg-blue-200 text-blue-800 rounded-lg text-sm flex items-center">
                          {{ place }}
                          <button @click="removeTagVg(index)" class="ml-1 text-red-500">&times;</button>
                        </span>

                        <!-- Input for adding new tags -->
                        <input type="text" v-model="newVillageVal" @keydown.enter.prevent="addTagVg"
                          placeholder="Add a place then place enter..."
                          class="flex-grow focus:ring-gray-500 focus:border-blue-300 border-none shadow-sm sm:text-sm" />
                      </div>
                      <p class="text-red-500 text-xs italic pt-1">{{ villageAreaError }}</p>

                    </div>

                    <div class="col-span-12 sm:col-span-12">
                      <h3 class="text-lg font-semibold text-[#096eb4] mb-3">Relief Items</h3>

                      <div class="space-y-3">
                        <div v-for="(item, index) in Requisition.requestedCommodities" :key="index"
                          class="flex space-x-4 items-center">
                          <!-- Commodity Selector -->
                          <div class="flex-1">
                            <label class="block text-sm font-bold text-gray-700">Commodity</label>
                            <select v-model="item.commodityId" @change="validateCommodity(index)"
                              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400 sm:text-sm p-2">
                              <option value="" disabled>Commodity</option>
                              <option v-for="commodity in commodities" :key="commodity.id" :value="commodity.id">
                                {{ commodity.Name }}
                              </option>
                            </select>
                            <p v-if="item.error" class="text-red-500 text-xs italic pt-1">{{ item.error }}</p>
                          </div>

                          <!-- Quantity Input -->
                          <div class="flex-1">
                            <label class="block text-sm font-bold text-gray-700">Quantity ({{
                              getCommodityUnit(item.commodityId) }})</label>
                            <input type="number" v-model.number="item.NoBags"
                              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400 sm:text-sm p-2"
                              placeholder="Quantity" />
                          </div>

                          <!-- Remove Item Button -->
                          <button type="button" @click="removeItem(item.id)" class="text-red-500 hover:text-red-700">
                            &times;
                          </button>
                        </div>

                        <!-- Add New Item Button -->
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
import { XIcon, SaveIcon } from "@heroicons/vue/outline";
import { inject, ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useForm, useField, useSubmitForm, useIsFormValid } from "vee-validate";
//COMPONENTS
import spinnerWidget from "../../../components/widgets/spinners/default.spinner.vue";
//SCHEMA AND STORES
import { CreateRequisitionSchema } from "../../../services/schema/requisition.schema";
import { useRoleStore } from "../../../stores/role.store";
import { useUserStore } from "../../../stores/user.store";

import { usedistrictstore } from "../../../stores/districts.store";

import { useDisasterstore } from "../../../stores/disaster.store";


import { useactivitiestore } from "../../../stores/activity.store";

import { userequisitionstore } from "../../../stores/requisition.store";

import { useSessionStore } from "../../../stores/session.store";
import { object } from "yup";
//INJENCTIONS
const $router = useRouter();
const moment = inject("moment");
const emit = defineEmits(['update', 'close']);
//VARIABLES

const districtstore = usedistrictstore();
const districts = reactive([])


const activityStore = useactivitiestore();
const activities = reactive([])

const disasterStore = useDisasterstore();
const disasters = reactive([])

const props = defineProps({
  open: Boolean,
  commodities: Array,
  Requisition: object

});


const closeDialog = () => {
  emit('close');
};

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



//MOUNTED
onMounted(async () => {
  getActivities()
  getDisasters()
  getDistricts()


});
//FUNCTIONS

const getCommodityUnit = (commodityId) => {
  const commodity = props.commodities.find(c => c.id === commodityId);
  return commodity ? commodity.Container_type : '';
}


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
  const selectedCommodity = props.Requisition?.requestedCommodities[index].commodityId.id;

  const commodity = props.commodities.find(c => c.id === selectedCommodity);

  if (commodity) {
    // Use the commodity details as needed
    commodityUnit.value = "(" + commodity?.Container_type + ")" // Assuming the commodity object has a 'unit' receipient
    console.log("Selected Commodity:", commodityUnit.value);

  }

  const isDuplicate = props.Requisition.requestedCommodities.some((item, idx) => item.commodityId === selectedCommodity && idx !== index);
  props.Requisition.requestedCommodities[index].error = isDuplicate ? "Commodity already added. Please select another." : "";
}

function addNewItem() {
  props.Requisition.requestedCommodities.push({ id: props.Requisition.requestedCommodities.length + 1, commodityId: '', Quantity: 0, NoBags: '', error: '' });
}

function removeItem(id) {
  props.Requisition.requestedCommodities = props.Requisition.requestedCommodities.filter(item => item.id !== id);
}



const currentDate = ref(moment().format('YYYY-MM-DD HH:mm:ss'));

const onSubmit = useSubmitForm((values, actions) => {
  if (validateAreas() && validateCommodities()) {
    const district = districts.find(d => d.Name === user.value.district);

    let model = {
      id: props.Requisition.id,
      disasterId: props.Requisition.disasterId,
      districtId: district.id,
      activityId: props.Requisition.activityId,
      AffectedAreas: props.Requisition.AffectedAreas?.split(',').map(v => v.trim()).join(),
      AffectedHouseholds: props.Requisition.AffectedHouseholds,
      gvhs: props.Requisition.gvhs?.split(',').map(v => v.trim()).join(),
      villages_affected: props.Requisition.Villagesaffected?.split(',').map(v => v.trim()).join(),
      RequesterId: user.value.id,
      reliefItems: props.Requisition.requestedCommodities,
      CreatedOn: currentDate.value,
      status: 2 // Status for Draft
    
    };

    emit("update", model);
    emit("close")
    model = {};
  }
});


const saveAsDraft = () => {
  if (validateAreas() && validateCommodities()) {
    const district = districts.find(d => d.Name === user.value.district);


    let draftModel = {
      id: props.Requisition.id,
      disasterId: props.Requisition.disasterId,
      districtId: district.id,
      activityId: props.Requisition.activityId,
      AffectedAreas: props.Requisition.AffectedAreas?.split(',').map(v => v.trim()).join(),
      AffectedHouseholds: props.Requisition.AffectedHouseholds,
      gvhs: props.Requisition.gvhs?.split(',').map(v => v.trim()).join(),
      villages_affected: props.Requisition.Villagesaffected?.split(',').map(v => v.trim()).join(),
      RequesterId: user.value.id,
      reliefItems: props.Requisition.requestedCommodities,
      CreatedOn: currentDate.value,
      status: 3 // Status for Draft
    
    };

    emit("update", draftModel);
    open.value = false;
    draftModel = {};
    emit("close")
  }
};

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


  if (!props.Requisition?.activityId) {
    activityError.value = "Activity is required";
    return false;
  }
  if (!props.Requisition?.disasterId) {
    disasterError.value = "Disaster is required";
    return false;
  }

  if (props.Requisition.gvhs?.split(',').map(v => v.trim()).length < props.Requisition.AffectedAreas?.split(',').map(v => v.trim()).length) {
    gvhAreaError.value = "You cannot have fewer GVHs than TAs, add a GVH and place enter.";
    return false;
  }

  if (props.Requisition.villages_affected?.split(',').map(v => v.trim()).length < props.Requisition.gvhs?.split(',').map(v => v.trim()).length) {
    villageAreaError.value = "You cannot have fewer Villages than GVHs, add a villages and place enter.";
    return false;
  }

  if (!props.Requisition.AffectedAreas?.split(',').map(v => v.trim()).length) {
    AffectedAreaError.value = "TAs cannot be empty, add a TA and place enter.";
    return false;
  }
  if (!props.Requisition.gvhs?.split(',').map(v => v.trim()).length) {
    gvhAreaError.value = "GVHs cannot be empty, add a GVH and place enter.";
    return false;
  }
  if (!props.Requisition.villages_affected?.split(',').map(v => v.trim()).length) {
    villageAreaError.value = "Villages cannot be empty, add a village and place enter.";
    return false;
  }
  return true;
};

const validateCommodities = () => {
  let valid = true;
  props.Requisition?.requestedCommodities.forEach((item, index) => {
    if (!item.commodityId || !item.NoBags) {
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

  if (place && !props.Requisition.AffectedAreas?.split(',').map(v => v.trim()).includes(place)) {
    // Add the new place to the AffectedAreas string
    if (props.Requisition.AffectedAreas) {
      props.Requisition.AffectedAreas += `, ${place}`;
    } else {
      props.Requisition.AffectedAreas = place;
    }

    // Clear the input receipient
    newVillage.value = '';
    AffectedAreaError.value = '';
  } else {
    AffectedAreaError.value = 'TA is either empty or already added!';
  }
}


const removeTag = (index) => {
  // Update the AffectedAreas in Requisition by removing the selected index
  const updatedAreas = props.Requisition?.AffectedAreas.split(',')
    .map(v => v.trim())
    .filter((_, i) => i !== index);

  // Update the Requisition object
  props.Requisition.AffectedAreas = updatedAreas.join(',');

  // This will automatically update the UI
};


function addTagGvh() {
  const place = newGvh.value.trim();

  if (place && !props.Requisition.gvhs?.split(',').map(v => v.trim()).includes(place)) {
    // Add the new place to the GVHSaffected string
    if (props.Requisition.gvhs) {
      props.Requisition.gvhs += `, ${place}`;
    } else {
      props.Requisition.gvhs = place;
    }

    // Clear the input receipient
    newGvh.value = '';
    gvhAreaError.value = '';
  } else {
    gvhAreaError.value = 'GVH name is either empty or already added!';
  }
}

function removeTagGvh(index) {
  const gvhArray = props.Requisition.gvhs?.split(',').map(v => v.trim()).filter(v => v) || [];

  if (gvhArray.length > index) {
    // Remove the GVH from the array
    gvhArray.splice(index, 1);

    // Update the GVHSaffected string
    props.Requisition.gvhs = gvhArray.join(', ');
  }
}





function addTagVg() {
  const place = newVillageVal.value.trim();

  if (place && !props.Requisition.villages_affected?.split(',').map(v => v.trim()).includes(place)) {
    // Add the new village to the Villagesaffected string
    if (props.Requisition.villages_affected) {
      props.Requisition.villages_affected += `, ${place}`;
    } else {
      props.Requisition.villages_affected = place;
    }

    // Clear the input receipient
    newVillageVal.value = '';
    villageAreaError.value = '';
  } else {
    villageAreaError.value = 'Village name is either empty or already added!';
  }
}


function removeTagVg(index) {
  const villageArray = props.Requisition.villages_affected?.split(',').map(v => v.trim()).filter(v => v) || [];

  if (villageArray.length > index) {
    // Remove the village from the array
    villageArray.splice(index, 1);

    // Update the Villagesaffected string
    props.Requisition.villages_affected = villageArray.join(', ');
  }
}

</script>
