<template>

  <spinner-widget v-bind:open="isLoading" />
  <div>
    <button @click="open = true"
      class="inline-flex items-center px-3 py-2 text-sm font-bold text-green-600 hover:text-green-900 bg-white rounded-md border border-gray-200 hover:bg-gray-100">
      <PlusCircleIcon class="h-5 w-5 mr-1" />
      Create Receipt
    </button>

    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="fixed inset-0 z-10 overflow-y-auto" @close="open = false" static>
        <div class="flex items-center justify-center min-h-screen px-4 py-6">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
            leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div
              
            class="inline-block align-middle bg-white rounded-lg text-left shadow-xl transform transition-all sm:align-middle sm:w-full max-w-4xl"
            :class="{'max-h-screen overflow-y-auto': true}">
              <div class="modal-header flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                <h5 class="text-lg font-bold text-gray-800">Emergency Response Dispatch</h5>
                <h5 class="text-md font-bold text-gray-800">Create Receipt for Instruction (ID: {{ props.rowId }})
                </h5>
                <button type="button" class="text-gray-500 hover:text-gray-700" @click="open = false">
                  <XIcon class="h-6 w-6" />
                </button>
              </div>

              <form @submit.prevent="confirmSubmission">
                <div class="px-6 py-2">
                  <p class="mb-1"><strong>System Delivery Note:</strong> {{ dispatch.DeliveryNote }}</p>
                  <p class="mb-1"><strong>Target FDP:</strong> {{ dispatch.FinalDestinationPoint }}</p>
                  
                  <p class="mb-1"><strong>Purpose:</strong> {{ dispatch.instruction?.Purpose }}</p>
                  <div class="mb-6">
                    <h3 class="text-lg font-semibold text-[#096eb4] mb-4">Summary of Dispatched Goods:</h3>
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col"
                            class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Commodity</th>
                          <th scope="col"
                            class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Quantity</th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(item, index) in dispatch?.dispatchedCommodities" :key="index"
                          class="hover:bg-gray-100">
                          <td class="px-6 py-4 text-sm text-gray-900">{{ item.commodity.Name }} (Truck #: {{
                            item.TruckNumber }})</td>
                          <td class="px-6 py-4 text-sm text-gray-900">{{ item.Quantity }} {{ item.commodity.Unit
                            === 'Kg' ? 'MT' : 'Units' }} ({{ item.NoBags }} {{ item.commodity.Container_type }})</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <hr>
                  <div class="flex items-center space-x-2 mb-4 mt-2">
                    <p class="text-xs text-italic text-red-500 mt-3">*</p> <input type="text" v-model="pdn"
                      placeholder="Enter Physical Delivery Note"
                      class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400 sm:text-sm">

                  </div>

                  <!-- Destination Points -->
                  <div class="mb-6">
                    <label for="multiple-destinations" class="block text-sm font-bold text-[#096eb4]">
                      Select Multiple Final Destination Points
                    </label>
                    <div class="flex items-center mt-2">
                      <button @click="toggleMultipleDestinations" type="button"
                        :class="multipleDestinations ? 'bg-blue-400' : 'bg-gray-200'"
                        class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                        <span :class="multipleDestinations ? 'translate-x-6' : 'translate-x-1'"
                          class="inline-block w-4 h-4 transform bg-white rounded-full transition-transform">
                        </span>
                      </button>
                      <label for="multiple-destinations" class="ml-2 text-sm text-gray-700">
                        Enable Multiple Final Destinations
                      </label>
                    </div>
                    <p class="text-xs text-italic text-red-500 mt-3">NB: * Please ensure that the total received in the
                      destination points
                      is accurate.</p>
                  </div>

                  <!-- Inside the destination loop -->
                  <div v-for="(destination, index) in destinations" :key="index" class="mb-4">
                    <label :for="'destination-' + index" class="block text-sm font-bold text-gray-700">FDP {{
                      multipleDestinations ? index +
                        1 : "" }}</label>
                    <div class="flex items-center space-x-2">
                      <input type="text" :id="'destination-' + index" v-model="destinations[index].name"
                        placeholder="Enter Final Destination Point"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400 sm:text-sm">
                      <button type="button" @click="removeDestination(index)"
                        class="inline-flex items-center p-2 text-sm font-bold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        v-if="multipleDestinations">
                        <MinusCircleIcon class="h-5 w-5" />
                      </button>
                    </div>

                    <table class="min-w-full divide-y divide-gray-200 mt-4">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col"
                            class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Commodity</th>
                          <th scope="col"
                            class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Remarks</th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(item, itemIndex) in destination.commodities" :key="itemIndex"
                          class="hover:bg-gray-100">
                          <td class="px-6 py-4 text-sm text-gray-900">{{ item.commodity.Name }} (Truck #: {{
                            item.TruckNumber }})</td>
                          <td class="py-2 px-4 border-b">
                            <div class="space-y-2">
                              <div v-for="(remark, i) in item.remarks" :key="i" class="flex items-center space-x-2">
                                <div class="col-span-6 sm:col-span-3">
                                  <label class="text-sm font-bold text-gray-700">Select Remark</label>
                                  <select name="Remarks" v-model="remark.remark" id="Remarks"
                                    class="mt-2 block w-60 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400 sm:text-sm">
                                    <option value="">Select Remark</option>
                                    <option value="received in good condition">Received in good condition</option>
                                    <option value="received but damaged">Received but damaged</option>
                                    <option value="missing">Missing</option>                                
                                    <option value="received in excess">Received in excess</option>
                                    <option value="received but not expected quantity">Received but not at the
                                      expected quantity</option>
                                    <option value="other">Other (please specify)</option>
                                  </select>
                                </div>
                                <div class="col-span-6 sm:col-span-3" v-if="remark.remark === 'received but damaged'">
                                  <label for="quantity" class="text-sm font-bold text-gray-700"> Extend of damage

                                    <select name="Extent" v-model="remark.extentofdamage" id="Remarks"
                                      class="mt-2 block w-60 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400 sm:text-sm">
                                      <option value="">Select Remark</option>
                                      <option value="received in good condition">Bags wet</option>
                                      <option value="received but damaged">Bags need reconstitution</option>
                                    </select>
                                  </label>
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                  <label for="quantity" class="text-sm font-bold text-gray-700">Quantity ({{
                                    item.commodity.Container_type }})</label>
                                  <input type="number" v-model.number="remark.quantity" min="0"
                                    placeholder="Qty Received"
                                    class="mt-2 block w-40 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400 sm:text-sm">
                                </div>
                                <button @click="removeRemark(index, itemIndex, i)" type="button"
                                  class="ml-2 mt-6 inline-flex items-center p-2 text-sm font-bold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                  <MinusCircleIcon class="h-5 w-5" />
                                </button>
                                <textarea v-if="remark.remark === 'other'" v-model="remark.Comments" id="CustomRemark"
                                  rows="3"
                                  class="mt-2 focus:ring-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  placeholder="Enter your custom remark here"></textarea>

                              </div>

                            </div>
                            <button @click="addRemark(index, itemIndex)" type="button"
                              class="mt-2 inline-flex items-center px-3 py-2 text-sm font-bold text-green-600 hover:text-green-900 bg-white rounded-md border border-gray-200 hover:bg-gray-100">
                              <PlusCircleIcon class="h-5 w-5 mr-1" />
                              Add Remark
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <button type="button" @click="addDestination" v-if="multipleDestinations"
                    class="inline-flex items-center px-3 py-2 text-sm font-bold text-green-600 hover:text-green-900 bg-white rounded-md border border-gray-200 hover:bg-gray-100">
                    <PlusCircleIcon class="h-5 w-5 mr-1" />
                    Add Destination
                  </button>
                </div>

                <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div class="flex justify-end space-x-3">
                    <!--  <button type="button" @click="saveProgress"
                      class="inline-flex items-center px-3 py-2 text-sm font-bold text-green-600 hover:text-green-900 bg-white rounded-md border border-gray-300 hover:bg-gray-100">
                      <SaveIcon class="h-5 w-5 mr-1" />
                      Save Progress
                    </button> -->

                    <button type="submit"
                      class="inline-flex items-center px-3 py-2 text-sm font-bold text-white bg-blue-400 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                      <CheckCircleIcon class="h-5 w-5 mr-1" />
                      Submit Receipt
                    </button>
                    <button type="button" @click="open = false"
                      class="inline-flex items-center px-3 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 bg-white rounded-md border border-gray-300 hover:bg-gray-100">
                      Cancel
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
import { ref, reactive, inject, defineProps, defineEmits, computed } from "vue";
import { PlusCircleIcon, MinusCircleIcon, XIcon, CheckCircleIcon, SaveIcon } from "@heroicons/vue/solid";
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { useForm, useSubmitForm } from "vee-validate";
import { CreateRequisitionSchema } from "../../../services/schema/requisition.schema";
import { useSessionStore } from "../../../stores/session.store";
import { usereceiptstore } from "../../../stores/receipt.store";

import spinnerWidget from "../../../components/widgets/spinners/default.spinner.vue";
const isLoading = ref(false);
const sessionStore = useSessionStore();
const receiptStore = usereceiptstore();
const user = ref(sessionStore.getUser);
const Swal = inject('Swal');
const props = defineProps({
  rowId: {
    type: [String, Number],
    required: true
  },
  dispatch: Object,
  dispatchedCommodities: Array
});

const emit = defineEmits(["create", "draft"]);
const open = ref(false);
const pdn = ref('')
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

const receivedCommodities = reactive([]);
const multipleDestinations = ref(false);
const destinations = ref([{
  name: "",
  commodities: JSON.parse(JSON.stringify(props.dispatch.dispatchedCommodities.map(commodity => ({
    ...commodity,
    remarks: []
  }))))
}]);

const removeDestination = (index) => {
  destinations.value.splice(index, 1);
};


const updateDestinations = () => {
  if (!multipleDestinations.value) {
    destinations.value = [{
      name: "",
      commodities: JSON.parse(JSON.stringify(props.dispatch.dispatchedCommodities.map(commodity => ({
        ...commodity,
        remarks: []
      }))))
    }];
  }
};

const toggleMultipleDestinations = () => {
  multipleDestinations.value = !multipleDestinations.value;
  if (!multipleDestinations.value) {
    resetDestinations();
  }
};

const resetDestinations = () => {
  while (destinations.length > 1) {
    destinations.pop();
  }
  destinations[0].name = '';
};

const addDestination = () => {
  if (destinations.value.every(dest => dest.name.trim() !== "")) {
    destinations.value.push({
      name: "",
      commodities: JSON.parse(JSON.stringify(props.dispatch.dispatchedCommodities.map(commodity => ({
        ...commodity,
        remarks: []
      }))))
    });
  } else {
    Swal.fire({
      icon: "warning",
      title: "Incomplete Destination",
      text: "Please enter a destination name before adding another."
    });
  }
};

const addRemark = (destinationIndex, commodityIndex) => {
  destinations.value[destinationIndex].commodities[commodityIndex].remarks.push({ remark: '', quantity: 0 });
};

const removeRemark = (destinationIndex, commodityIndex, remarkIndex) => {
  destinations.value[destinationIndex].commodities[commodityIndex].remarks.splice(remarkIndex, 1);
};

const isDecimal = (num) => {
  return num % 1 !== 0;
};

const computedTonnagePerRemark = (packsize, bags) => {
  let TonnageConversion = packsize / 1000;
  if (isDecimal(TonnageConversion)) {
    TonnageConversion = parseFloat(TonnageConversion.toFixed(2));
  }
  let Tonnage = bags * TonnageConversion;
  return isDecimal(Tonnage) ? parseFloat(Tonnage.toFixed(2)) : Tonnage;
};


const confirmSubmission = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "Once submitted, you will need to go through the reversal process if changes are required.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, submit it!'
  }).then((result) => {
    if (result.isConfirmed) {
      onSubmit(); // Call the actual submit function if confirmed
    }
  });
};

const onSubmit = useSubmitForm(async (values) => {
  isLoading.value = true;
  const receivedCommodities = [];
  const receivedRemarks = {}; // To track remarks per commodity

  try {
    // Check for Physical Delivery Note
    if (!pdn.value) {
      Swal.fire({
        icon: "warning",
        title: "🚫Missing Physical Delivery Note",
        html: `<p>Please provide the Physical Delivery Note before submitting the receipt.</p>`,
        allowOutsideClick: false,
        customClass: { popup: 'swal-wide' }
      });
      isLoading.value = false;
      return;
    }

    // Summary of dispatched quantities
    const dispatchedSummary = {};
    for (let item of props.dispatch.dispatchedCommodities) {
      if (!dispatchedSummary[item.commodity.Name]) {
        dispatchedSummary[item.commodity.Name] = {
          totalQuantity: 0,
          totalBags: 0
        };
      }
      dispatchedSummary[item.commodity.Name].totalQuantity += item.Quantity;
      dispatchedSummary[item.commodity.Name].totalBags += item.NoBags;
    }

    // Summary of received quantities and remarks
    const receivedSummary = {};

    for (let destination of destinations.value) {
      if (!destination.name) {
        Swal.fire({
          icon: "warning",
          title: "🚫Missing Destination",
          html: `<p>Please specify a final destination point for all entries before submission.</p>`,
          allowOutsideClick: false,
          customClass: { popup: 'swal-wide' }
        });
        isLoading.value = false;
        return;
      }

      for (let commodity of destination.commodities) {
        if (!commodity.remarks || commodity.remarks.length === 0) {
          Swal.fire({
            icon: "warning",
            title: "🚫Missing Remarks",
            html: `<p>Each commodity must have at least one remark before submission.</p>`,
            allowOutsideClick: false,
            customClass: { popup: 'swal-wide' }
          });
          isLoading.value = false;
          return;
        }

        // Initialize received quantity and remarks set
        if (!receivedSummary[commodity.commodity.Name]) {
          receivedSummary[commodity.commodity.Name] = 0;
        }
        if (!receivedRemarks[commodity.commodity.Name]) {
          receivedRemarks[commodity.commodity.Name] = new Set();
        }

        // Process each remark
        for (let remark of commodity.remarks) {
          if (remark.quantity <= 0) {
            Swal.fire({
              icon: "error",
              title: "❗Quantity Invalid",
              html: `<p>Quantity cannot be zero or negative. Please ensure all quantities are positive.</p>`,
              allowOutsideClick: false,
              customClass: { popup: 'swal-wide' }
            });
            isLoading.value = false;
            return;
          }

          receivedSummary[commodity.commodity.Name] += remark.quantity;
          receivedRemarks[commodity.commodity.Name].add(remark.remark);

          if (remark.remark) {
            const uniqueId = Date.now().toString() + Math.random().toString(36).substr(2, 7);

            receivedCommodities.push({
              BatchNumber: commodity.BatchNumber,
              commodityId: commodity.commodity.id,
              TruckNumber: commodity.TruckNumber,
              Comments: remark.Comments,
              extentofdamage: remark.extentofdamage,
              Date: new Date().toISOString(),
              Quantity: computedTonnagePerRemark(commodity.commodity?.PackSize, remark.quantity),
              NoBags: remark.quantity,
              Remarks: remark.remark,
              RefNO: destination.name.replace(/\s+/g, '') + "|" + (props.dispatch?.DeliveryNote || '') + "-" + uniqueId,
              FinalDestinationPoint: destination.name,
              PhysicalDeliveryNote: pdn.value
            });
          }
        }
      }
    }

    // Final validation for each commodity
    for (let commodityName in dispatchedSummary) {
      const dispatchedQuantity = dispatchedSummary[commodityName].totalBags;
      const receivedQuantity = receivedSummary[commodityName] || 0;
      const remarksSet = receivedRemarks[commodityName] || new Set();

      // Check for excess quantity
      if (receivedQuantity > dispatchedQuantity) {
        if (!remarksSet.has('received in excess')) {
          Swal.fire({
            icon: "error",
            title: "❗Quantity Exceeded",
            html: `<p>The total received quantity for <strong>${commodityName}</strong> across all destinations exceeds the dispatched quantity.</p>
                   <p>Please select <strong>'received in excess'</strong> in the remarks.</p>`,
            allowOutsideClick: false,
            customClass: { popup: 'swal-wide' }
          });
          isLoading.value = false;
          return;
        }
      }

      // Check for less quantity
      if (receivedQuantity < dispatchedQuantity) {
        if (!remarksSet.has('received but not expected quantity')) {
          Swal.fire({
            icon: "error",
            title: "❗Quantity Less Than Expected",
            html: `<p>The total received quantity for <strong>${commodityName}</strong> across all destinations is less than the dispatched quantity.</p>
                   <p>Please select <strong>'received but not expected quantity'</strong> in the remarks.</p>`,
            allowOutsideClick: false,
            customClass: { popup: 'swal-wide' }
          });
          isLoading.value = false;
          return;
        }
      }
    }

    // Submit the form if everything is validated
    if (receivedCommodities.length > 0) {
      let model = {
        RecipientId: user.value.id,
        CreatedOn: new Date().toISOString(),
        instructedDispatchId: props.rowId,
        receivedCommodities: receivedCommodities,
      };

      emit("create", model);

      Swal.fire({
        title: 'Processing...',
        text: 'Please wait while the receipt is being created.',
        allowOutsideClick: false, // Prevent closing by clicking outside
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Only close the dialog after the successful creation of the receipt
      open.value = false;
    }
  } catch (error) {
    console.error("Error during submission:", error);
    Swal.fire({
      icon: 'error',
      title: '❌ Submission Failed',
      html: `<p>There was an error during submission. Please try again later.</p>`,
      allowOutsideClick: false,
      customClass: { popup: 'swal-wide' }
    });
  } finally {
    isLoading.value = false;
  }
});



const summaryGoods = computed(() => {
  let summary = {};
  props.dispatch.dispatchedCommodities.forEach((item) => {
    if (!summary[item.commodity.Name]) {
      summary[item.commodity.Name] = {
        commodity: item.commodity,
        totalQuantity: 0,
        remarks: []
      };
    }
    summary[item.commodity.Name].totalQuantity += item.Quantity;
  });
  return Object.values(summary);
});






const saveProgress = () => {
  isLoading.value = true;
  const receivedCommodities = [];


  try {
    for (let destination of destinations.value) {
      // Validate that every destination has a name

      for (let commodity of destination.commodities) {
        if (commodity.remarks && commodity.remarks.length > 0) {

          for (let remark of commodity.remarks) {
            // Validate that no duplicate remarks for the same commodity index exist


            if (remark.remark) {
              const uniqueId = Date.now().toString() + Math.random().toString(36).substr(2, 7); // Generate a unique ID

              receivedCommodities.push({
                BatchNumber: commodity.BatchNumber,
                commodityId: commodity.commodity.id,
                TruckNumber: commodity.TruckNumber,
                Comments: remark.Comments,
                Date: new Date().toISOString(),
                Quantity: computedTonnagePerRemark(commodity.commodity?.PackSize, remark.quantity),
                NoBags: remark.quantity,
                Remarks: remark.remark,
                RefNO: destination.name.replace(/\s+/g, '') + "|" + (props.dispatch?.DeliveryNote || '') + "-" + uniqueId,
                FinalDestinationPoint: destination.name,
              });
            }
          }
        }
      }
    }

    let model = {
      RecipientId: user.value.id,
      CreatedOn: new Date().toISOString(),
      status: 3,
      instructedDispatchId: props.rowId,
      receivedCommodities: receivedCommodities,
    };

    emit("draft", model);

    Swal.fire({
      title: 'Processing...',
      text: 'Please wait while the receipt is being created.',
      allowOutsideClick: false, // Prevent closing by clicking outside
      didOpen: () => {
        Swal.showLoading();
      }
    });

  } catch (error) {
    console.error("An error occurred while submitting the form:", error);
  } finally {
    isLoading.value = false;
    open.value = false;
  }
};

</script>
