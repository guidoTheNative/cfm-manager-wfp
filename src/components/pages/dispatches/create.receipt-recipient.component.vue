<template>

  <spinner-widget v-bind:open="isLoading" />
  <div>
    <!-- Modal -->
    <TransitionRoot as="template" :show="isOpen">
      <Dialog as="div" class="fixed inset-0 z-10 overflow-y-auto" @close="close" static>
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
              :class="{ 'max-h-screen overflow-y-auto': true }">
              <!-- Modal Header -->
              <div class="modal-header flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                <h5 class="text-lg font-bold text-gray-800">Lean Season Response Dispatch</h5>
                <h5 class="text-md font-bold text-gray-800">Create Receipt for Dispatch (ID: {{ dispatch.id }})</h5>
                <button type="button" class="text-gray-500 hover:text-gray-700" @click="close">
                  <XIcon class="h-6 w-6" />
                </button>
              </div>

              <!-- Form -->
              <form @submit.prevent="confirmSubmission">
                <div class="px-6 py-4">
                  <!-- Summary of Dispatched Goods -->
                  <p class="mb-4"><strong>System Delivery Note:</strong> {{ dispatch.DeliveryNote }}</p>
                  <p class="mb-4"><strong>Target FDP:</strong> {{ dispatch?.FinalDestinationPoint }}</p>
                  <p class="mb-4"><strong>Driver Phone #:</strong> {{ dispatch?.PhoneNumber }}</p>
                  <p class="mb-4"><strong>ATC Number:</strong> {{ dispatch?.loadingPlan?.ATCNumber }}</p>


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
                        <tr class="hover:bg-gray-100">
                          <td class="px-6 py-4 text-sm text-gray-900">{{ dispatch?.loadingPlan?.commodity?.Name }}</td>
                          <td class="px-6 py-4 text-sm text-gray-900">{{ dispatch?.Quantity }} {{
                            dispatch?.loadingPlan?.commodity?.Unit === 'Kg' ? 'MT' : 'Units' }} ({{ dispatch?.NoBags }}
                            {{
                              dispatch?.loadingPlan?.commodity?.Container_type }})</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <hr>
                  <div class="flex items-center space-x-2 mb-4">
                    <p class="text-xs text-italic text-red-500 mt-3">*</p> <input type="text" v-model="pdn"
                      placeholder="Enter Physical Delivery Note"
                      class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400 sm:text-sm">

                  </div>
                  <!-- Destination Points -->
                  <div class="mb-6">
                    <label for="multiple-destinations" class="block text-sm font-bold text-[#096eb4]">Select Multiple
                      Final Destination Points</label>
                    <div class="flex items-center mt-2">
                      <button @click="toggleMultipleDestinations" type="button"
                        :class="multipleDestinations ? 'bg-blue-400' : 'bg-gray-200'"
                        class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                        <span :class="multipleDestinations ? 'translate-x-6' : 'translate-x-1'"
                          class="inline-block w-4 h-4 transform bg-white rounded-full transition-transform">
                        </span>
                      </button>
                      <label for="multiple-destinations" class="ml-2 text-sm text-gray-700">Enable Multiple
                        Final Destinations</label>
                    </div>
                    <p class="text-xs text-italic text-red-500 mt-3">Please ensure that the total received in the
                      destination points
                      is accurate.</p>
                  </div>

                  <!-- Destination Form -->
                  <div v-for="(destination, index) in destinations" :key="index" class="mb-4">
                    <label :for="'destination-' + index" class="block text-sm font-bold text-gray-700">FDP {{
                      multipleDestinations ? index +
                        1 : "" }}</label>
                    <div class="flex items-center space-x-2">
                      <input type="text" :id="'destination-' + index" v-model="destination.name"
                        placeholder="Enter Final Destination Point"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400 sm:text-sm">
                      <button type="button" @click="removeDestination(index)"
                        class="inline-flex items-center p-2 text-sm font-bold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        v-if="multipleDestinations && index > 0">
                        <MinusCircleIcon class="h-5 w-5" />
                      </button>
                    </div>

                    <!-- Commodity Remarks Table -->
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
                        <tr class="hover:bg-gray-100">
                          <td class="px-6 py-4 text-sm text-gray-900">{{ dispatch?.loadingPlan?.commodity?.Name }}</td>
                          <td class="py-2 px-4 border-b">
                            <div class="space-y-2">
                              <div v-for="(remark, i) in destination.commodities[0].remarks" :key="i"
                                class="flex items-center space-x-2">
                                <div class="col-span-6 sm:col-span-3">
                                  <label class="text-sm font-bold text-gray-700">Select Remark</label>
                                  <select name="Remarks" v-model="remark.remark" id="Remarks"
                                    class="mt-2 block w-60 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400 sm:text-sm">
                                    <option value="">Select Remark</option>
                                    <option value="received in good condition">Received in good condition</option>
                                    <option value="missing">Missing</option>
                                    <option value="received but damaged">Received but damaged</option>
                                    <option value="received in excess">Received in excess</option>
                                    <option value="received but not expected quantity">Received but not at the expected
                                      quantity</option>
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
                                    dispatch?.loadingPlan?.commodity?.Container_type }})</label>
                                  <input type="number" v-model.number="remark.quantity" min="0"
                                    placeholder="Qty Received"
                                    class="mt-2 block w-40 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400 sm:text-sm">
                                </div>

                                <button @click="removeRemark(index, 0, i)" type="button"
                                  class="ml-2 mt-6 inline-flex items-center p-2 text-sm font-bold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                  <MinusCircleIcon class="h-5 w-5" />
                                </button>
                                <textarea v-if="remark.remark === 'other'" v-model="remark.Comments" id="CustomRemark"
                                  rows="3"
                                  class="mt-2 focus:ring-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  placeholder="Enter your custom remark here"></textarea>


                              </div>

                            </div>
                            <button @click="addRemark(index, 0)" type="button"
                              class="mt-2 inline-flex items-center px-3 py-2 text-sm font-bold text-green-600 hover:text-green-900 bg-white rounded-md border border-gray-200 hover:bg-gray-100">
                              <PlusCircleIcon class="h-5 w-5 mr-1" />
                              Add Remark
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>

                  <!-- Add Destination Button -->
                  <div class="mb-6" v-if="multipleDestinations">
                    <button @click="addDestination" type="button"
                      class="inline-flex items-center px-3 py-2 text-sm font-bold text-green-600 hover:text-green-900 bg-white rounded-md border border-gray-200 hover:bg-gray-100">
                      <PlusCircleIcon class="h-5 w-5 mr-1" />
                      Add Destination
                    </button>
                  </div>

                </div>

                <!-- Modal Footer -->
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

                    <button type="button" @click="close"
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
import { ref, reactive, inject, defineEmits } from 'vue';
import { Dialog, DialogOverlay, TransitionRoot, TransitionChild } from '@headlessui/vue';

import { PlusCircleIcon, MinusCircleIcon, XIcon, CheckCircleIcon, SaveIcon } from "@heroicons/vue/solid";

import { useSessionStore } from "../../../stores/session.store";
import { usereceiptstore } from "../../../stores/receipt.store";


import spinnerWidget from "../../../components/widgets/spinners/default.spinner.vue";
const isLoading = ref(false);

const receiptStore = usereceiptstore();
const sessionStore = useSessionStore();
const user = ref(sessionStore.getUser);
const pdn = ref('')
const emit = defineEmits(["create", "close", "update", "draft"]);
const Swal = inject('Swal');
// Props
const props = defineProps({
  isOpen: Boolean,
  dispatch: Object
});
const multipleDestinations = ref(false);

const destinations = reactive([{ name: '', commodities: [{ name: props.dispatch?.loadingPlan?.commodity?.Name, remarks: [] }] }]);

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


const checkPDNExists = async (pdn) => {
  try {
    const response = await receiptStore.check(pdn);
    return response;
  } catch (error) {
    console.error("Error checking PDN existence:", error);
    return false;
  }
}

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
      submitReceipt(); // Call the actual submit function if confirmed
    }
  });
};


const addDestination = () => {
  if (destinations.every(dest => dest.name.trim() !== "")) {
    destinations.push({ name: '', commodities: [{ name: props.dispatch?.loadingPlan?.commodity?.Name, remarks: [{ remark: '', quantity: 0 }] }] });

  } else {
    Swal.fire({
      icon: "warning",
      title: "Incomplete Destination",
      text: "Please enter a destination name before adding another."
    });
  }
};



const removeDestination = (index) => {
  if (destinations.length > 1) {
    destinations.splice(index, 1);
  }
};

const addRemark = (destinationIndex, commodityIndex) => {
  destinations[destinationIndex].commodities[commodityIndex].remarks.push({ remark: '', quantity: 0 });
};

const removeRemark = (destinationIndex, commodityIndex, remarkIndex) => {
  const remarks = destinations[destinationIndex].commodities[commodityIndex].remarks;
  if (remarks.length > 1) {
    remarks.splice(remarkIndex, 1);
  }
};

const close = () => {
  emit("close")
}

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

const submitReceipt = async () => {
  if (!pdn.value) {
    Swal.fire({
      icon: "warning",
      title: "🚫Missing Physical Delivery Note",
      html: `<p>Please provide the Physical Delivery Note before submitting the receipt.</p>`,
      allowOutsideClick: false,
      customClass: { popup: 'swal-wide' }
    });
    return;
  }

  // Check if PDN already exists
  const pdnExists = await checkPDNExists(pdn.value);
  if (pdnExists) {
    Swal.fire({
      icon: "error",
      title: "🚫 Duplicate Physical Delivery Note",
      html: `<p>The Physical Delivery Note <strong>${pdn.value}</strong> already exists in the database. Please use a unique PDN.</p>`,
      allowOutsideClick: false,
      customClass: { popup: 'swal-wide' }
    });
    isLoading.value = false;
    return;
  }
  const receivedCommodities = [];
  const commodityTotals = {}; // To track cumulative quantity per commodity across all destinations
  const remarksMap = {}; // To track if required remarks are added for each commodity

  for (let destination of destinations) {
    if (!destination.name) {
      Swal.fire({
        icon: "warning",
        title: "🚫Missing Destination",
        html: `<p>Please specify a final destination point for all entries before submission.</p>`,
        allowOutsideClick: false,
        customClass: { popup: 'swal-wide' }
      });
      return;
    }

    // Track remarks per destination to check for duplicates
    const destinationRemarksMap = {};

    for (let commodity of destination.commodities) {
      if (!commodity.remarks || commodity.remarks.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "🚫Missing Remarks",
          html: `<p>Each commodity must have at least one remark before submission.</p>`,
          allowOutsideClick: false,
          customClass: { popup: 'swal-wide' }
        });
        return;
      }

      const commodityName = props.dispatch?.loadingPlan?.commodity?.Name;

      if (!commodityTotals[commodityName]) {
        commodityTotals[commodityName] = 0;
        remarksMap[commodityName] = new Set();
      }

      for (let remark of commodity.remarks) {
        // Check for duplicate remarks per destination
        if (!destinationRemarksMap[remark.remark]) {
          destinationRemarksMap[remark.remark] = true;
        } else {
          Swal.fire({
            icon: "warning",
            title: "Duplicate Remark",
            text: "The same remark cannot be added multiple times for the same commodity within the same destination.",
          });
          return;
        }

        remarksMap[commodityName].add(remark.remark);
        commodityTotals[commodityName] += remark.quantity;

        if (remark.quantity <= 0) {
          Swal.fire({
            icon: "error",
            title: "❗Quantity Invalid",
            html: `<p>The quantity must be greater than 0.</p>`,
            allowOutsideClick: false,
            customClass: { popup: 'swal-wide' }
          });
          return;
        }
      }
    }
  }

  // Validate cumulative totals for each commodity across all destinations
  for (const [commodityName, totalReceived] of Object.entries(commodityTotals)) {
    const dispatchedQuantity = props.dispatch?.NoBags || 0;

    if (totalReceived < dispatchedQuantity &&
      !remarksMap[commodityName].has('received but not expected quantity') &&
      !remarksMap[commodityName].has('missing')) {
      Swal.fire({
        icon: "error",
        title: "❗Quantity Less Than Expected",
        html: `<p>The cumulative received quantity for ${commodityName} is less than the dispatched quantity. Please select either <strong>'received but not expected quantity'</strong> or <strong>'missing'</strong> in the remarks.</p>`,
        allowOutsideClick: false,
        customClass: { popup: 'swal-wide' }
      });
      return;
    }


    if (totalReceived > dispatchedQuantity && !remarksMap[commodityName].has('received in excess')) {
      Swal.fire({
        icon: "error",
        title: "❗Quantity Exceeded",
        html: `<p>The cumulative received quantity for ${commodityName} exceeds the dispatched quantity. Please select <strong>'received in excess'</strong> in the remarks.</p>`,
        allowOutsideClick: false,
        customClass: { popup: 'swal-wide' }
      });
      return;
    }
  }

  // Prepare received commodities for submission
  for (let destination of destinations) {
    for (let commodity of destination.commodities) {
      for (let remark of commodity.remarks) {
        const uniqueId = Date.now().toString() + Math.random().toString(36).substr(2, 7);

        receivedCommodities.push({
          Quantity: computedTonnagePerRemark(props.dispatch?.loadingPlan?.commodity?.PackSize, remark.quantity),
          NoBags: remark.quantity,
          Comments: remark.Comments,
          extentofdamage: remark.extentofdamage,
          Date: new Date().toISOString(),
          dispatchId: props.dispatch?.id,
          RecipientId: user.value.id,
          RefNO: destination.name.replace(/\s+/g, '') + "|" + (props.dispatch?.DeliveryNote || '') + "-" + uniqueId,
          IsArchived: true,
          Remarks: remark.remark,
          FinalDestinationPoint: destination.name,
          PhysicalDeliveryNote: pdn.value
        });
      }
    }
  }

  isLoading.value = true; // Start the loader

  try {
    emit("update", receivedCommodities);

    Swal.fire({
      title: 'Processing...',
      text: 'Please wait while the receipt is being created.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    close();
  } catch (error) {
    Swal.fire({
      title: "Creation Failed",
      text: `Failed to create receipt: ${error.message}`,
      icon: "error",
      confirmButtonText: "Ok"
    });
  } finally {
    isLoading.value = false; // Stop the loader
  }
};





const saveProgress = async () => {
  const receivedCommodities = [];

  for (let destination of destinations) {
    for (let commodity of destination.commodities) {
      // Ensure at least one empty remark if none exist
      if (commodity.remarks.length === 0) {
        commodity.remarks.push({ remark: '', quantity: 0, Comments: '' });
      }

      for (let remark of commodity.remarks) {
        const uniqueId = Date.now().toString() + Math.random().toString(36).substr(2, 7); // Generate a unique ID

        receivedCommodities.push({
          Quantity: computedTonnagePerRemark(props.dispatch?.loadingPlan?.commodity?.PackSize, remark.quantity),
          NoBags: remark.quantity,
          Comments: remark.Comments,
          Date: new Date().toISOString(),
          dispatchId: props.dispatch?.id,
          RecipientId: user.value.id,
          RefNO: destination.name.replace(/\s+/g, '') + "|" + (props.dispatch?.DeliveryNote || '') + "-" + uniqueId,
          IsArchived: true,
          status: 3,
          Remarks: remark.remark,
          FinalDestinationPoint: destination.name ?? 'N.A',
          PhysicalDeliveryNote: pdn.value
        });
      }
    }
  }

  isLoading.value = true; // Start the loader

  try {
    emit("draft", receivedCommodities);

    Swal.fire({
      text: "Receipt saved to drafts",
      toast: true,
      position: "top-right",
      icon: "success",
      showConfirmButton: false,  // Hide the button
      timer: 3000,  // Auto close after 3 seconds
      timerProgressBar: true   // Show a timer progress bar
    });

    close();
  } catch (error) {
    Swal.fire({
      title: "Drafting Failed",
      text: `Failed to draft receipt: ${error.message}`,
      icon: "error",
      confirmButtonText: "Ok"
    });
  } finally {
    isLoading.value = false; // Stop the loader
  }
};





</script>

<style scoped>
/* Add your custom styles here */
</style>
