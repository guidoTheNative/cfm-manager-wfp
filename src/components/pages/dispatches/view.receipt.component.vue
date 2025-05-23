<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="fixed inset-0 z-10 overflow-y-auto" @close="closeDialog" static>
      <div class="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
          leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <TransitionChild as="template" enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">

          <div id="content">
            <div
              class="inline-block align-top bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-start sm:my-8 sm:max-w-4xl sm:w-full relative">
              
              <!-- ATC Number positioned at the top-right -->
              <div class="absolute top-0 right-0 p-4">
                <span class="text-sm font-bold text-gray-700">ATC No: </span>
                <span class="text-sm text-gray-600">{{ receipt?.atcNumber }}</span>
              </div>

              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="container mx-auto px-4 py-6">
                  <!-- Flex container for the two main sections -->
                  <div class="text-center mb-4">
                    <img src="../../../assets/images/images.png" alt="Department Logo" class="w-20 mx-auto mb-2">
                    <h3 class="font-bold text-xl">DEPARTMENT OF DISASTER MANAGEMENT AFFAIRS</h3>
                    <h2 class="text-center text-2xl font-semibold text-gray-800"> Goods Receive
                      Note
                    </h2>
                    <h2 class="text-center text-lg font-bold text-gray-800 mb-6"> {{
                      receipt?.receipts[0]?.dispatch?.loadingPlan?.district?.Name }}
                    </h2>
                  </div>

                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="text-sm font-bold text-gray-700  mr-2">System Delivery Note No:</span>
                            <span class="text-sm text-gray-600">{{ receipt.deliveryNote }}</span>
                          </td>

                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="text-sm font-bold text-gray-700  mr-2">Physical Delivery Note No:</span>
                            <span class="text-sm text-gray-600">{{ receipt?.receipts[0]?.PhysicalDeliveryNote }}</span>
                          </td>
                        </tr>

                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="text-sm font-bold text-gray-700  mr-2">District:</span>
                            <span class="text-sm text-gray-600"> {{
                              receipt?.receipts[0]?.dispatch?.loadingPlan?.district?.Name }}</span>
                          </td>

                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="text-sm font-bold text-gray-700 mr-2">Created On:</span>
                            <span class="text-sm text-gray-600">{{
                              moment(receipt.createdOn).format("DD/MM/YYYY") }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <!-- Goods List Section -->
                    <div class="mt-6 mx-6">
                      <h3 class="text-lg font-semibold text-gray-700 mb-3">Condition of received commodity</h3>
                      <table class="min-w-full mt-2 bg-white">
                        <thead>
                          <tr class="w-full bg-gray-200">
                            <th class="px-4 py-2">FDP</th>
                            <th class="px-4 py-2">Truck #</th>
                            <th class="px-4 py-2">Condition</th>
                            <th class="px-4 py-2">Commodity</th>
                            <th class="px-4 py-2">Qty</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in receipt?.receipts" :key="item" class="w-full text-center">
                            <td class="border px-4 py-2"> {{ item?.FinalDestinationPoint }}</td>
                            <td class="border px-4 py-2"> {{ item?.dispatch?.TruckNumber }}</td>
                            <td class="border px-4 py-2">{{ item?.Remarks }} <span v-if="item?.Remarks == 'other'"> ({{
                                item?.Comments }} )</span></td>
                            <td class="border px-4 py-2"> {{ item?.dispatch?.loadingPlan?.commodity?.Name }}</td>
                            <td class="border px-4 py-2">
                              {{ item?.Quantity }} MT({{ item?.NoBags }} Bags)
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                <div class="text-center mb-2">
                  <img src="../../../assets/received.jpg" alt="Department Logo" class="w-20 mx-auto mb-2">
                </div>

                <div class="mt-3 mx-9">
                  <h3 class="text-lg font-semibold text-gray-700">Approvals</h3>
                  <div class="grid grid-cols-3 gap-4 mt-2">
                    <div>
                      <label class="block text-sm font-bold text-gray-700">Dispatched By:</label>
                      <p class="text-sm text-gray-600">
                        {{ receipt?.dispatcher }}
                      </p>
                    </div>
                    <div>
                      <label class="block text-sm font-bold text-gray-700">Authorized By:</label>
                      <p class="text-sm text-gray-600">
                        <span v-if="receipt?.receipts[0]?.dispatch?.loadingPlan?.ApprovedBy.includes('(d)')">
                          {{ receipt?.receipts[0]?.dispatch?.loadingPlan?.ApprovedBy.replace(' (d)', '') }}
                          <br>
                          <em class="text-xs text-gray-500">on behalf of the DoDMA commissioner</em>
                        </span>
                        <span v-else>
                          {{ receipt?.receipts[0]?.dispatch?.loadingPlan?.ApprovedBy }}
                          <br>
                          <em class="text-xs text-gray-500">The DODMA commissioner</em>
                        </span>
                      </p>
                    </div>
                    <div>
                      <label class="block text-sm font-bold text-gray-700">Received By:</label>
                      <p class="text-sm text-gray-600">
                        {{ receipt?.receipts[0]?.Recipient?.username?.split('.')
                          .map(word => word.charAt(0) + word.slice(1))
                        .join(' ') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
                <button type="button"
                  class="w-full inline-flex no-print justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 sm:w-auto sm:text-sm"
                  @click="closeDialog">
                  Close
                </button>
                <button @click="printPDF"
                  class="mr-3 bg-green-500 text-white px-4 py-2 rounded-md  no-print">Print</button>
              </div>
            </div>
          </div>

        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogOverlay, TransitionRoot, TransitionChild } from '@headlessui/vue';


import { useRouter } from "vue-router";
import { inject, ref, reactive, defineEmits, onMounted, watch, computed } from "vue";

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const $router = useRouter();

import { usereceiptstore } from "../../../stores/receipt.store";


import { useSessionStore } from "../../../stores/session.store";



const dispatchstore = usereceiptstore();



const receiptstore = usereceiptstore();


const selectedRemark = ref('');
const sessionStore = useSessionStore();

const user = ref(sessionStore.getUser);

const moment = inject("moment");

const Swal = inject("Swal");
const emit = defineEmits(['update', 'close']);

const props = defineProps({
  isOpen: Boolean,
  receipt: Object
});



const closeDialog = () => {
  emit('close');
};

// Function to print the instruction details
const printPDF = async () => {
  const noPrintElements = document.querySelectorAll('.no-print');
  noPrintElements.forEach(element => {
    element.style.display = 'none';
  });

  const contentElement = document.getElementById('content');

  const scaleFactor = 2;
  const canvas = await html2canvas(contentElement, {
    scale: scaleFactor,
    useCORS: true,
  });

  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const imgWidth = 190;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

  const currentDate = new Date().toLocaleString();
  const footerText = `WFP CASE TRACKER - ${currentDate}`;
  const footerYPosition = 290;

  pdf.setFontSize(14);
  pdf.text(footerText, 10, footerYPosition);

  pdf.save('GoodsReceiptLSR.pdf');

  noPrintElements.forEach(element => {
    element.style.display = 'block';
  });
};




</script>
