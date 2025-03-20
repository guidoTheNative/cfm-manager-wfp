<template>
  <main class="font-bold">
    <spinner-widget v-bind:open="isLoading" />
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <breadcrumb-widget v-bind:breadcrumbs="breadcrumbs" />

      <div class="mt-2 md:flex md:items-center md:justify-between mb-3">
        <h2 class="font-bold leading-7 text-blue-400 sm:text-2xl sm:truncate">
          Create Monitoring Issue
        </h2>
      </div>

      <div class="bg-white">
        <form @submit.prevent="submitForm">
          <div class="p-4 bg-white grid grid-cols-12 gap-4">
            <!-- District -->
            <div class="col-span-6 sm:col-span-3">
              <label
                for="district"
                class="block text-sm font-medium text-gray-700"
                >District</label
              >
              <select
                v-model="form.district"
                id="district"
                class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
              >
                <option
                  v-for="district in districts"
                  :key="district"
                  :value="district.name"
                >
                  {{ district.name }}
                </option>
              </select>
            </div>

            <!-- Cooperating Partner -->
            <div class="col-span-6 sm:col-span-3">
              <label
                for="cooperatingPartner"
                class="block text-sm font-medium text-gray-700"
                >Cooperating Partner</label
              >

              <select
                v-model="form.cooperatingPartner"
                id="district"
                class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
              >
                <option
                  v-for="cooperatingPartner in [
                    'Government',
                    'World Vision International',
                    'Plan International',
                    'Emmanuel International',
                    'Evangellical Association of Malawi',
                  ]"
                  :key="cooperatingPartner"
                  :value="cooperatingPartner"
                >
                  {{ cooperatingPartner }}
                </option>
              </select>
            </div>

            <!-- Reporting Organization -->
            <div class="col-span-6 sm:col-span-3">
              <label
                for="reportingOrganization"
                class="block text-sm font-medium text-gray-700"
                >Reporting Organization</label
              >

              <select
                v-model="form.reportingOrganization"
                id="district"
                class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
              >
                <option
                  v-for="reportingOrganization in ['Government', 'WFP']"
                  :key="reportingOrganization"
                  :value="reportingOrganization"
                >
                  {{ reportingOrganization }}
                </option>
              </select>
            </div>

            <!-- Responsible CP -->
            <div class="col-span-6 sm:col-span-3">
              <label
                for="responsibleCp"
                class="block text-sm font-medium text-gray-700"
                >Responsible CP</label
              >

              <select
                v-model="form.responsibleCp"
                id="district"
                class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
              >
                <option
                  v-for="responsibleCp in [
                    'Government',
                    'World Vision International',
                    'Plan International',
                    'Emmanuel International',
                    'Evangellical Association of Malawi',
                  ]"
                  :key="responsibleCp"
                  :value="responsibleCp"
                >
                  {{ responsibleCp }}
                </option>
              </select>
            </div>

            <!-- Process Monitoring Activity -->
            <div class="col-span-6 sm:col-span-3">
              <label
                for="processMonitoringActivity"
                class="block text-sm font-medium text-gray-700"
                >Process Monitoring Activity</label
              >
              <input
                v-model="form.processMonitoringActivity"
                id="processMonitoringActivity"
                type="text"
                class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
              />
            </div>

            <!-- Activity -->
            <div class="col-span-6 sm:col-span-3">
              <label
                for="activity"
                class="block text-sm font-medium text-gray-700"
                >Activity</label
              >
              <input
                v-model="form.activity"
                id="activity"
                type="text"
                class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
              />
            </div>

            <!-- Subactivity -->
            <div class="col-span-6 sm:col-span-3">
              <label
                for="subActivity"
                class="block text-sm font-medium text-gray-700"
                >Subactivity</label
              >
              <input
                v-model="form.subActivity"
                id="subActivity"
                type="text"
                class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
              />
            </div>

            <!-- Transfer Modality -->
            <div class="col-span-6 sm:col-span-3">
              <label
                for="transferModality"
                class="block text-sm font-medium text-gray-700"
                >Transfer Modality</label
              >

              <select
                v-model="form.transferModality"
                id="district"
                class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
              >
                <option
                  v-for="transferModality in [
                    'Food',
                    'Cash',
                    'Cash-Based Transfer',
                    'Capacity Strengthening',
                    'E-Voucher',
                  ]"
                  :key="transferModality"
                  :value="transferModality"
                >
                  {{ transferModality }}
                </option>
              </select>
            </div>

            <!-- Macro Category -->
            <div class="col-span-6 sm:col-span-3">
              <label
                for="macroCategory"
                class="block text-sm font-medium text-gray-700"
                >Macro Category</label
              >
              <input
                v-model="form.macroCategory"
                id="macroCategory"
                type="text"
                class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
              />
            </div>

            <!-- Monitoring Date -->
            <div class="col-span-6 sm:col-span-3">
              <label
                for="monitoringDate"
                class="block text-sm font-medium text-gray-700"
                >Monitoring Date</label
              >
              <input
                v-model="form.monitoringDate"
                id="monitoringDate"
                type="date"
                class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
              />
            </div>

            <!-- Issue Encountered -->
            <!-- Issue Encountered -->
            <div class="col-span-6 sm:col-span-3">
              <label
                for="issueEncountered"
                class="block text-sm font-medium text-gray-700"
                >Issue Encountered?</label
              >
              <select
                v-model="form.issueEncountered"
                id="issueEncountered"
                class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
              >
                <option :value="true">Yes</option>
                <option :value="false">No</option>
              </select>
            </div>
            <!-- Additional Fields (Only Show If Issue Encountered) -->
            <template v-if="form.issueEncountered">
              <!-- Issue Description -->
              <div class="col-span-12">
                <label
                  for="issueDescription"
                  class="block text-sm font-medium text-gray-700"
                  >Issue Description</label
                >
                <textarea
                  v-model="form.issueDescription"
                  id="issueDescription"
                  class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
                ></textarea>
              </div>

              <!-- Issue Solved on Field -->
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="issueSolvedOnField"
                  class="block text-sm font-medium text-gray-700"
                  >Issue Solved on Field?</label
                >
                <select
                  v-model="form.issueSolvedOnField"
                  id="issueSolvedOnField"
                  class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
                >
                  <option :value="true">Yes</option>
                  <option :value="false">No</option>
                </select>
              </div>

              <!-- Proof of Issue -->
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="proofOfIssue"
                  class="block text-sm font-medium text-gray-700"
                  >Proof of Issue</label
                >
                <input
                  v-model="form.proofOfIssue"
                  id="proofOfIssue"
                  type="text"
                  class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
                />
              </div>

              <!-- Perpetrator -->
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="perpetrator"
                  class="block text-sm font-medium text-gray-700"
                  >Perpetrator's Name</label
                >
                <input
                  v-model="form.perpetrator"
                  id="perpetrator"
                  type="text"
                  class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
                />
              </div>

              <!-- Perpetrator's Gender -->
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="perpetratorGender"
                  class="block text-sm font-medium text-gray-700"
                  >Perpetrator's Gender</label
                >
                <select
                  v-model="form.perpetratorGender"
                  id="perpetratorGender"
                  class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <!-- Incident Date -->
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="incidentDate"
                  class="block text-sm font-medium text-gray-700"
                  >Incident Date</label
                >
                <input
                  v-model="form.incidentDate"
                  id="incidentDate"
                  type="date"
                  class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
                />
              </div>

              <!-- Incident Time -->
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="incidentTime"
                  class="block text-sm font-medium text-gray-700"
                  >Incident Time</label
                >
                <input
                  v-model="form.incidentTime"
                  id="incidentTime"
                  type="time"
                  class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
                />
              </div>

              <!-- Incident Location -->
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="incidentLocation"
                  class="block text-sm font-medium text-gray-700"
                  >Incident Location</label
                >
                <input
                  v-model="form.incidentLocation"
                  id="incidentLocation"
                  type="text"
                  class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
                />
              </div>

              <!-- Incident Witnesses -->
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="incidentWitnesses"
                  class="block text-sm font-medium text-gray-700"
                  >Incident Witnesses</label
                >
                <input
                  v-model="form.incidentWitnesses"
                  id="incidentWitnesses"
                  type="text"
                  class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
                />
              </div>

              <!-- Incident Reported to WFP -->
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="reportedToWfp"
                  class="block text-sm font-medium text-gray-700"
                  >Reported to WFP?</label
                >
                <select
                  v-model="form.reportedToWfp"
                  id="reportedToWfp"
                  class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
                >
                  <option :value="true">Yes</option>
                  <option :value="false">No</option>
                </select>
              </div>
            </template>
          </div>

          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              style="background-color: #096eb4"
              class="font-body inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 focus:outline-none"
            >
              Save Monitoring Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/outline";
import { ref, inject, reactive, onMounted, computed } from "vue";
import { usedistrictstore } from "../../../stores/districts.store";
import { useSessionStore } from "../../../stores/session.store";
import { useProcessStore } from "../../../stores/process.store";
const Swal = inject("Swal");

import breadcrumbWidget from "../../../components/widgets/breadcrumbs/admin.breadcrumb.vue";
const districtStore = usedistrictstore();

const sessionStore = useSessionStore();
const user = ref(sessionStore.getUser);
const moment = inject("moment");

const processStore = useProcessStore();

const process = reactive([]);
const districts = reactive([]);
const emit = defineEmits(["create"]);
const open = ref(false);
const roles = [
  { id: "ADMIN1", name: "Admin 1" },
  { id: "ADMIN2", name: "Admin 2" },
  // Add other roles...
];
const breadcrumbs = [
  { name: "Home", href: "/admin/dashboard", current: false },
  { name: "Process Monitoring", href: "#", current: true },
  { name: "Issue", href: "#", current: true },
  { name: "Create", href: "#", current: true },
];
const priorities = [
  { id: "High", name: "High" },
  { id: "Medium", name: "Medium" },
  { id: "Low", name: "Low" },
];
const form = ref({
  district: "",
  cooperatingPartner: "",
  reportingOrganization: "",
  responsibleCp: "",
  processMonitoringActivity: "",
  activity: "",
  subActivity: "",
  transferModality: "",
  macroCategory: "",
  category: "",
  subCategory: "",
  monitoringDate: "", // Date field
  issueEncountered: false, // Boolean
  issueDescription: "",
  issueSolvedOnField: false, // Boolean
  proofOfIssue: "",
  perpetrator: "",
  perpetratorGender: "",
  incidentDate: "", // Date field
  incidentTime: "", // Time field
  incidentLocation: "",
  incidentWitnesses: "",
  incidentWitnessDetails: "",
  reportedToWfp: false, // Boolean
  resourceType: "",
  divertedQuantity: 0, // Number field
});

const districtTaData = ref([
  {
    District: "Chitipa",
    TA: "TA Mwabulambya",
  },
  {
    District: "Chitipa",
    TA: "STA Bulambya Songwe",
  },
  {
    District: "Chitipa",
    TA: "TA Mwenemisuku",
  },
  {
    District: "Chitipa",
    TA: "STA Lwangwa",
  },
  {
    District: "Chitipa",
    TA: "TA Mwenewenya",
  },
  {
    District: "Chitipa",
    TA: "TA Nthalire",
  },
  {
    District: "Chitipa",
    TA: "STA Nthengatenga",
  },
  {
    District: "Chitipa",
    TA: "STA Wavikaza",
  },
  {
    District: "Chitipa",
    TA: "TA Kameme",
  },
  {
    District: "Chitipa",
    TA: "Nyika Ntational Park-Chitipa",
  },
  {
    District: "Chitipa",
    TA: "Chitipa Boma",
  },
  {
    District: "Karonga",
    TA: "TA Kilupula",
  },
  {
    District: "Karonga",
    TA: "TA Mwakaboko",
  },
  {
    District: "Karonga",
    TA: "TA Kyungu",
  },
  {
    District: "Karonga",
    TA: "TA Wasambo",
  },
  {
    District: "Karonga",
    TA: "TA Mwirang'ombe",
  },
  {
    District: "Karonga",
    TA: "Nyika National Park-Karonga",
  },
  {
    District: "Karonga",
    TA: "Karonga Town",
  },
  {
    District: "Nkhatabay",
    TA: "TA Kabunduli",
  },
  {
    District: "Nkhatabay",
    TA: "TA Fukamapiri",
  },
  {
    District: "Nkhatabay",
    TA: "TA Malenga Mzoma",
  },
  {
    District: "Nkhatabay",
    TA: "TA Malanda",
  },
  {
    District: "Nkhatabay",
    TA: "TA Zilakoma",
  },
  {
    District: "Nkhatabay",
    TA: "TA Mankhambira",
  },
  {
    District: "Nkhatabay",
    TA: "TA Fukamalaza",
  },
  {
    District: "Nkhatabay",
    TA: "TA Mkumbira",
  },
  {
    District: "Nkhatabay",
    TA: "TA M'bwana",
  },
  {
    District: "Nkhatabay",
    TA: "STA Nyaluwanga",
  },
  {
    District: "Nkhatabay",
    TA: "STA Kondowe",
  },
  {
    District: "Nkhatabay",
    TA: "TA Timbiri",
  },
  {
    District: "Nkhatabay",
    TA: "TA Boghoyo",
  },
  {
    District: "Nkhatabay",
    TA: "Nkhatabay Boma",
  },
  {
    District: "Rumphi",
    TA: "TA Chikulamayembe",
  },
  {
    District: "Rumphi",
    TA: "TA Mwamlowe",
  },
  {
    District: "Rumphi",
    TA: "TA Mwahenga",
  },
  {
    District: "Rumphi",
    TA: "TA Mwalweni",
  },
  {
    District: "Rumphi",
    TA: "STA Kachulu",
  },
  {
    District: "Rumphi",
    TA: "STA Chapinduka",
  },
  {
    District: "Rumphi",
    TA: "TA Mwankhunikira",
  },
  {
    District: "Rumphi",
    TA: "TA Katumbi",
  },
  {
    District: "Rumphi",
    TA: "STA Zolokere",
  },
  {
    District: "Rumphi",
    TA: "STA Chisovya",
  },
  {
    District: "Rumphi",
    TA: "STA Njikula",
  },
  {
    District: "Rumphi",
    TA: "Nyika National Park",
  },
  {
    District: "Rumphi",
    TA: "Vwaza Marsh Reserve",
  },
  {
    District: "Rumphi",
    TA: "Rumphi Boma",
  },
  {
    District: "Mzimba",
    TA: "TA M'Mbelwa",
  },
  {
    District: "Mzimba",
    TA: "TA Mtwalo",
  },
  {
    District: "Mzimba",
    TA: "TA Kampingo Sibande",
  },
  {
    District: "Mzimba",
    TA: "TA Jaravikuba Munthali",
  },
  {
    District: "Mzimba",
    TA: "TA Chindi",
  },
  {
    District: "Mzimba",
    TA: "TA Mzikubola",
  },
  {
    District: "Mzimba",
    TA: "TA Mabulabo",
  },
  {
    District: "Mzimba",
    TA: "TA Khosolo Gwaza Jere",
  },
  {
    District: "Mzimba",
    TA: "TA Mpherembe",
  },
  {
    District: "Mzimba",
    TA: "TA Mzukuzuku",
  },
  {
    District: "Mzimba",
    TA: "STA Levi Jere",
  },
  {
    District: "Mzimba",
    TA: "Vwaza Marsh Reserve",
  },
  {
    District: "Mzimba",
    TA: "Mzimba Boma",
  },
  {
    District: "Likoma",
    TA: "TA Mkumpha",
  },
  {
    District: "Likoma",
    TA: "Likoma Boma",
  },
  {
    District: "Mzuzu City",
    TA: "Chibavi East Ward",
  },
  {
    District: "Mzuzu City",
    TA: "Chibavi West Ward",
  },
  {
    District: "Mzuzu City",
    TA: "Chibanja Ward",
  },
  {
    District: "Mzuzu City",
    TA: "Chiputula Ward",
  },
  {
    District: "Mzuzu City",
    TA: "Jombo - Kaning'ina Ward",
  },
  {
    District: "Mzuzu City",
    TA: "Katawa Ward",
  },
  {
    District: "Mzuzu City",
    TA: "Luwinga Ward",
  },
  {
    District: "Mzuzu City",
    TA: "Masasa Ward",
  },
  {
    District: "Mzuzu City",
    TA: "Mchengautuwa East Ward",
  },
  {
    District: "Mzuzu City",
    TA: "Mchengautuwa West Ward",
  },
  {
    District: "Mzuzu City",
    TA: "Msongwe Ward",
  },
  {
    District: "Mzuzu City",
    TA: "Mzilawaingwe Ward",
  },
  {
    District: "Mzuzu City",
    TA: "Nkhorongo - Lupaso Ward",
  },
  {
    District: "Mzuzu City",
    TA: "Zolozolo East Ward",
  },
  {
    District: "Mzuzu City",
    TA: "Zolozolo West Ward",
  },
  {
    District: "Kasungu",
    TA: "TA Kaluluma",
  },
  {
    District: "Kasungu",
    TA: "TA Chisemphere",
  },
  {
    District: "Kasungu",
    TA: "TA Simlemba",
  },
  {
    District: "Kasungu",
    TA: "STA M'nyanja",
  },
  {
    District: "Kasungu",
    TA: "STA Chisikwa",
  },
  {
    District: "Kasungu",
    TA: "TA Kaomba",
  },
  {
    District: "Kasungu",
    TA: "TA Kawamba",
  },
  {
    District: "Kasungu",
    TA: "STA Nthunduwala",
  },
  {
    District: "Kasungu",
    TA: "TA Njombwa",
  },
  {
    District: "Kasungu",
    TA: "TA Chilowamatambe",
  },
  {
    District: "Kasungu",
    TA: "STA Chambwe",
  },
  {
    District: "Kasungu",
    TA: "TA Chulu",
  },
  {
    District: "Kasungu",
    TA: "STA Chisinga",
  },
  {
    District: "Kasungu",
    TA: "STA Mphomwa",
  },
  {
    District: "Kasungu",
    TA: "STA Chaima",
  },
  {
    District: "Kasungu",
    TA: "TA Kaphaizi",
  },
  {
    District: "Kasungu",
    TA: "STA Mangwazu",
  },
  {
    District: "Kasungu",
    TA: "STA Mawawa",
  },
  {
    District: "Kasungu",
    TA: "TA Lukwa",
  },
  {
    District: "Kasungu",
    TA: "Kasungu Boma",
  },
  {
    District: "Kasungu",
    TA: "TA Santhe",
  },
  {
    District: "Kasungu",
    TA: "TA Chidzuma",
  },
  {
    District: "Kasungu",
    TA: "TA Wimbe",
  },
  {
    District: "Kasungu",
    TA: "TA Kapelula",
  },
  {
    District: "Kasungu",
    TA: "STA Kapichira",
  },
  {
    District: "Kasungu",
    TA: "STA Mdunga",
  },
  {
    District: "Kasungu",
    TA: "TA Mwase",
  },
  {
    District: "Kasungu",
    TA: "Kasungu National Park",
  },
  {
    District: "Nkhotakota",
    TA: "TA Kanyenda",
  },
  {
    District: "Nkhotakota",
    TA: "TA Kafuzila",
  },
  {
    District: "Nkhotakota",
    TA: "STA Kalimanjira",
  },
  {
    District: "Nkhotakota",
    TA: "TA Malenga Chanzi",
  },
  {
    District: "Nkhotakota",
    TA: "TA Mphonde",
  },
  {
    District: "Nkhotakota",
    TA: "TA Mwadzama",
  },
  {
    District: "Nkhotakota",
    TA: "TA Mwansambo",
  },
  {
    District: "Nkhotakota",
    TA: "Nkhotakota Game Reserve",
  },
  {
    District: "Nkhotakota",
    TA: "Nkhotakota Boma",
  },
  {
    District: "Ntchisi",
    TA: "TA Kasakula",
  },
  {
    District: "Ntchisi",
    TA: "TA Chikho",
  },
  {
    District: "Ntchisi",
    TA: "TA Kalumo",
  },
  {
    District: "Ntchisi",
    TA: "TA Nthondo",
  },
  {
    District: "Ntchisi",
    TA: "TA Chilooko",
  },
  {
    District: "Ntchisi",
    TA: "TA Vuso Jere",
  },
  {
    District: "Ntchisi",
    TA: "TA Malenga",
  },
  {
    District: "Ntchisi",
    TA: "Ntchisi Boma",
  },
  {
    District: "Dowa",
    TA: "TA Dzoole",
  },
  {
    District: "Dowa",
    TA: "TA Chakhaza",
  },
  {
    District: "Dowa",
    TA: "TA Kayembe",
  },
  {
    District: "Dowa",
    TA: "TA Chiwere",
  },
  {
    District: "Dowa",
    TA: "TA Mkukula",
  },
  {
    District: "Dowa",
    TA: "TA Msakambewa",
  },
  {
    District: "Dowa",
    TA: "TA Mponela",
  },
  {
    District: "Dowa",
    TA: "Dowa Boma",
  },
  {
    District: "Dowa",
    TA: "Mponela Urban",
  },
  {
    District: "Salima",
    TA: "TA Maganga",
  },
  {
    District: "Salima",
    TA: "TA Karonga",
  },
  {
    District: "Salima",
    TA: "TA Pemba",
  },
  {
    District: "Salima",
    TA: "TA Kambwiri",
  },
  {
    District: "Salima",
    TA: "TA Ndindi",
  },
  {
    District: "Salima",
    TA: "TA Kambalame",
  },
  {
    District: "Salima",
    TA: "TA Khombedza",
  },
  {
    District: "Salima",
    TA: "TA Mwanza",
  },
  {
    District: "Salima",
    TA: "TA Kuluunda",
  },
  {
    District: "Salima",
    TA: "TA Msosa",
  },
  {
    District: "Salima",
    TA: "Lake Malawi National Park",
  },
  {
    District: "Salima",
    TA: "Salima Town",
  },
  {
    District: "Salima",
    TA: "Chipoka Urban",
  },
  {
    District: "Lilongwe",
    TA: "TA Chadza",
  },
  {
    District: "Lilongwe",
    TA: "TA Kalolo",
  },
  {
    District: "Lilongwe",
    TA: "TA Masula",
  },
  {
    District: "Lilongwe",
    TA: "TA Masumbankhunda",
  },
  {
    District: "Lilongwe",
    TA: "TA Chiseka",
  },
  {
    District: "Lilongwe",
    TA: "TA Mazengera",
  },
  {
    District: "Lilongwe",
    TA: "STA Chitekwele",
  },
  {
    District: "Lilongwe",
    TA: "TA Khongoni",
  },
  {
    District: "Lilongwe",
    TA: "TA Chimutu",
  },
  {
    District: "Lilongwe",
    TA: "TA Chitukula",
  },
  {
    District: "Lilongwe",
    TA: "TA Mtema",
  },
  {
    District: "Lilongwe",
    TA: "TA Kalumbu",
  },
  {
    District: "Lilongwe",
    TA: "TA Tsabango",
  },
  {
    District: "Lilongwe",
    TA: "TA Kalumba",
  },
  {
    District: "Lilongwe",
    TA: "TA Njewa",
  },
  {
    District: "Lilongwe",
    TA: "TA Malili",
  },
  {
    District: "Lilongwe",
    TA: "TA Kabudula",
  },
  {
    District: "Lilongwe",
    TA: "STA Mbang'ombe",
  },
  {
    District: "Mchinji",
    TA: "TA Mlonyeni",
  },
  {
    District: "Mchinji",
    TA: "TA Mavwere",
  },
  {
    District: "Mchinji",
    TA: "TA Zulu",
  },
  {
    District: "Mchinji",
    TA: "TA Simphasi",
  },
  {
    District: "Mchinji",
    TA: "TA Mduwa",
  },
  {
    District: "Mchinji",
    TA: "STA Nyoka",
  },
  {
    District: "Mchinji",
    TA: "TA Mkanda",
  },
  {
    District: "Mchinji",
    TA: "STA Gumba",
  },
  {
    District: "Mchinji",
    TA: "STA Pitala",
  },
  {
    District: "Mchinji",
    TA: "STA Kapunula",
  },
  {
    District: "Mchinji",
    TA: "TA Kazyozyo",
  },
  {
    District: "Mchinji",
    TA: "TA Dambe",
  },
  {
    District: "Mchinji",
    TA: "TA Kapondo",
  },
  {
    District: "Mchinji",
    TA: "Mchinji Boma",
  },
  {
    District: "Dedza",
    TA: "TA Kachere",
  },
  {
    District: "Dedza",
    TA: "TA Chilikumwendo",
  },
  {
    District: "Dedza",
    TA: "TA Kaphuka",
  },
  {
    District: "Dedza",
    TA: "TA Tambala",
  },
  {
    District: "Dedza",
    TA: "TA Chauma",
  },
  {
    District: "Dedza",
    TA: "TA Kasumbu",
  },
  {
    District: "Dedza",
    TA: "TA Kachindamoto",
  },
  {
    District: "Dedza",
    TA: "TA Kamenya Gwaza",
  },
  {
    District: "Dedza",
    TA: "Dedza Boma",
  },
  {
    District: "Ntcheu",
    TA: "TA Phambala",
  },
  {
    District: "Ntcheu",
    TA: "STA Tsikulamowa",
  },
  {
    District: "Ntcheu",
    TA: "TA Mpando",
  },
  {
    District: "Ntcheu",
    TA: "TA Kwataine",
  },
  {
    District: "Ntcheu",
    TA: "TA Makwangwala",
  },
  {
    District: "Ntcheu",
    TA: "STA Mkutumula",
  },
  {
    District: "Ntcheu",
    TA: "TA Champiti",
  },
  {
    District: "Ntcheu",
    TA: "TA Njolomole",
  },
  {
    District: "Ntcheu",
    TA: "TA Chakhumbira",
  },
  {
    District: "Ntcheu",
    TA: "TA Goodson Ganya",
  },
  {
    District: "Ntcheu",
    TA: "TA Masasa",
  },
  {
    District: "Ntcheu",
    TA: "Ntcheu Boma",
  },
  {
    District: "Lilongwe City",
    TA: "Area 1",
  },
  {
    District: "Lilongwe City",
    TA: "Area 2",
  },
  {
    District: "Lilongwe City",
    TA: "Area 3",
  },
  {
    District: "Lilongwe City",
    TA: "Area 4",
  },
  {
    District: "Lilongwe City",
    TA: "Area 5",
  },
  {
    District: "Lilongwe City",
    TA: "Area 6",
  },
  {
    District: "Lilongwe City",
    TA: "Area 7",
  },
  {
    District: "Lilongwe City",
    TA: "Area 8",
  },
  {
    District: "Lilongwe City",
    TA: "Area 9",
  },
  {
    District: "Lilongwe City",
    TA: "Area 10",
  },
  {
    District: "Lilongwe City",
    TA: "Area 11",
  },
  {
    District: "Lilongwe City",
    TA: "Area 12",
  },
  {
    District: "Lilongwe City",
    TA: "Area 13",
  },
  {
    District: "Lilongwe City",
    TA: "Area 14",
  },
  {
    District: "Lilongwe City",
    TA: "Area 15",
  },
  {
    District: "Lilongwe City",
    TA: "Area 16",
  },
  {
    District: "Lilongwe City",
    TA: "Area 17",
  },
  {
    District: "Lilongwe City",
    TA: "Area 18",
  },
  {
    District: "Lilongwe City",
    TA: "Area 19",
  },
  {
    District: "Lilongwe City",
    TA: "Area 20",
  },
  {
    District: "Lilongwe City",
    TA: "Area 21",
  },
  {
    District: "Lilongwe City",
    TA: "Area 22",
  },
  {
    District: "Lilongwe City",
    TA: "Area 23",
  },
  {
    District: "Lilongwe City",
    TA: "Area 24",
  },
  {
    District: "Lilongwe City",
    TA: "Area 25",
  },
  {
    District: "Lilongwe City",
    TA: "Area 26",
  },
  {
    District: "Lilongwe City",
    TA: "Area 27",
  },
  {
    District: "Lilongwe City",
    TA: "Area 28",
  },
  {
    District: "Lilongwe City",
    TA: "Area 29",
  },
  {
    District: "Lilongwe City",
    TA: "Area 30",
  },
  {
    District: "Lilongwe City",
    TA: "Area 31",
  },
  {
    District: "Lilongwe City",
    TA: "Area 32",
  },
  {
    District: "Lilongwe City",
    TA: "Area 33",
  },
  {
    District: "Lilongwe City",
    TA: "Area 34",
  },
  {
    District: "Lilongwe City",
    TA: "Area 35",
  },
  {
    District: "Lilongwe City",
    TA: "Area 36",
  },
  {
    District: "Lilongwe City",
    TA: "Area 37",
  },
  {
    District: "Lilongwe City",
    TA: "Area 38",
  },
  {
    District: "Lilongwe City",
    TA: "Area 39",
  },
  {
    District: "Lilongwe City",
    TA: "Area 40",
  },
  {
    District: "Lilongwe City",
    TA: "Area 41",
  },
  {
    District: "Lilongwe City",
    TA: "Area 42",
  },
  {
    District: "Lilongwe City",
    TA: "Area 43",
  },
  {
    District: "Lilongwe City",
    TA: "Area 44",
  },
  {
    District: "Lilongwe City",
    TA: "Area 45",
  },
  {
    District: "Lilongwe City",
    TA: "Area 46",
  },
  {
    District: "Lilongwe City",
    TA: "Area 47",
  },
  {
    District: "Lilongwe City",
    TA: "Area 48",
  },
  {
    District: "Lilongwe City",
    TA: "Area 49",
  },
  {
    District: "Lilongwe City",
    TA: "Area 50",
  },
  {
    District: "Lilongwe City",
    TA: "Area 51",
  },
  {
    District: "Lilongwe City",
    TA: "Area 52",
  },
  {
    District: "Lilongwe City",
    TA: "Area 53",
  },
  {
    District: "Lilongwe City",
    TA: "Area 54",
  },
  {
    District: "Lilongwe City",
    TA: "Area 55",
  },
  {
    District: "Lilongwe City",
    TA: "Area 56",
  },
  {
    District: "Lilongwe City",
    TA: "Area 57",
  },
  {
    District: "Lilongwe City",
    TA: "Area 58",
  },
  {
    District: "Mangochi",
    TA: "TA Mponda",
  },
  {
    District: "Mangochi",
    TA: "TA Chimwala",
  },
  {
    District: "Mangochi",
    TA: "TA Chilipa",
  },
  {
    District: "Mangochi",
    TA: "TA Nankumba",
  },
  {
    District: "Mangochi",
    TA: "TA Jalasi",
  },
  {
    District: "Mangochi",
    TA: "TA Mbwana Nyambi",
  },
  {
    District: "Mangochi",
    TA: "TA Chowe",
  },
  {
    District: "Mangochi",
    TA: "TA Katuli",
  },
  {
    District: "Mangochi",
    TA: "TA Makanjila",
  },
  {
    District: "Mangochi",
    TA: "STA Lulanga",
  },
  {
    District: "Mangochi",
    TA: "TA Namabvi",
  },
  {
    District: "Mangochi",
    TA: "Lake Malawi National Park",
  },
  {
    District: "Mangochi",
    TA: "STA Ntonda",
  },
  {
    District: "Mangochi",
    TA: "STA Chiunda",
  },
  {
    District: "Mangochi",
    TA: "Mangochi Town",
  },
  {
    District: "Mangochi",
    TA: "Monkey Bay Urban",
  },
  {
    District: "Mangochi",
    TA: "Lake Malombe",
  },
  {
    District: "Machinga",
    TA: "TA Liwonde",
  },
  {
    District: "Machinga",
    TA: "STA Nsanama",
  },
  {
    District: "Machinga",
    TA: "TA Sitola",
  },
  {
    District: "Machinga",
    TA: "TA Nkula",
  },
  {
    District: "Machinga",
    TA: "STA Nchinguza",
  },
  {
    District: "Machinga",
    TA: "TA Kawinga",
  },
  {
    District: "Machinga",
    TA: "TA Nkoola",
  },
  {
    District: "Machinga",
    TA: "TA Chamba",
  },
  {
    District: "Machinga",
    TA: "TA Mposa",
  },
  {
    District: "Machinga",
    TA: "TA Mlomba",
  },
  {
    District: "Machinga",
    TA: "TA Chikweo",
  },
  {
    District: "Machinga",
    TA: "TA Ngokwe",
  },
  {
    District: "Machinga",
    TA: "TA Chiwalo",
  },
  {
    District: "Machinga",
    TA: "TA Kapoloma",
  },
  {
    District: "Machinga",
    TA: "TA Nyambi",
  },
  {
    District: "Machinga",
    TA: "STA Chesale",
  },
  {
    District: "Machinga",
    TA: "Liwonde National Park",
  },
  {
    District: "Machinga",
    TA: "Machinga Boma",
  },
  {
    District: "Machinga",
    TA: "Liwonde Town",
  },
  {
    District: "Zomba",
    TA: "TA Kuntumanji",
  },
  {
    District: "Zomba",
    TA: "TA Mwambo",
  },
  {
    District: "Zomba",
    TA: "TA Mkumbira",
  },
  {
    District: "Zomba",
    TA: "TA Chikowi",
  },
  {
    District: "Zomba",
    TA: "TA Mbiza",
  },
  {
    District: "Zomba",
    TA: "TA Malemia",
  },
  {
    District: "Zomba",
    TA: "TA Mlumbe",
  },
  {
    District: "Zomba",
    TA: "STA Nkagula",
  },
  {
    District: "Zomba",
    TA: "STA Ntholowa",
  },
  {
    District: "Zomba",
    TA: "STA Ngwelero",
  },
  {
    District: "Zomba",
    TA: "STA Nkapita",
  },
  {
    District: "Chiradzulu",
    TA: "TA Mpama",
  },
  {
    District: "Chiradzulu",
    TA: "TA Likoswe",
  },
  {
    District: "Chiradzulu",
    TA: "TA Kadewere",
  },
  {
    District: "Chiradzulu",
    TA: "TA Nkalo",
  },
  {
    District: "Chiradzulu",
    TA: "TA Chitera",
  },
  {
    District: "Chiradzulu",
    TA: "TA Nchema",
  },
  {
    District: "Chiradzulu",
    TA: "STA Mpunga",
  },
  {
    District: "Chiradzulu",
    TA: "STA Sandareki",
  },
  {
    District: "Chiradzulu",
    TA: "STA Onga",
  },
  {
    District: "Chiradzulu",
    TA: "Chiradzulu Boma",
  },
  {
    District: "Blantyre",
    TA: "TA Kapeni",
  },
  {
    District: "Blantyre",
    TA: "TA Lundu",
  },
  {
    District: "Blantyre",
    TA: "TA Chigaru",
  },
  {
    District: "Blantyre",
    TA: "TA Kunthembwe",
  },
  {
    District: "Blantyre",
    TA: "TA Makata",
  },
  {
    District: "Blantyre",
    TA: "TA Kuntaja",
  },
  {
    District: "Blantyre",
    TA: "TA Machinjiri",
  },
  {
    District: "Blantyre",
    TA: "TA Somba",
  },
  {
    District: "Mwanza",
    TA: "TA Kanduku",
  },
  {
    District: "Mwanza",
    TA: "TA Nthache",
  },
  {
    District: "Mwanza",
    TA: "STA Govati",
  },
  {
    District: "Mwanza",
    TA: "Majete Game Reserve - Mwanza",
  },
  {
    District: "Mwanza",
    TA: "Mwanza Boma",
  },
  {
    District: "Thyolo",
    TA: "TA Nsabwe",
  },
  {
    District: "Thyolo",
    TA: "STA Thukuta",
  },
  {
    District: "Thyolo",
    TA: "STA Mbawela",
  },
  {
    District: "Thyolo",
    TA: "TA Changata",
  },
  {
    District: "Thyolo",
    TA: "TA Mphuka",
  },
  {
    District: "Thyolo",
    TA: "TA Kwethemule",
  },
  {
    District: "Thyolo",
    TA: "TA Kapichi",
  },
  {
    District: "Thyolo",
    TA: "TA Nchilamwela",
  },
  {
    District: "Thyolo",
    TA: "TA Chimaliro",
  },
  {
    District: "Thyolo",
    TA: "TA Bvumbwe",
  },
  {
    District: "Thyolo",
    TA: "TA Thomas",
  },
  {
    District: "Thyolo",
    TA: "TA Nanseta",
  },
  {
    District: "Thyolo",
    TA: "TA Ngolongoliwa",
  },
  {
    District: "Thyolo",
    TA: "STA Boyidi",
  },
  {
    District: "Thyolo",
    TA: "Thyolo Boma",
  },
  {
    District: "Thyolo",
    TA: "Luchenza Town",
  },
  {
    District: "Mulanje",
    TA: "TA Mabuka",
  },
  {
    District: "Mulanje",
    TA: "TA Laston Njema",
  },
  {
    District: "Mulanje",
    TA: "TA Chikumbu",
  },
  {
    District: "Mulanje",
    TA: "TA Nthiramanja",
  },
  {
    District: "Mulanje",
    TA: "TA Nkanda",
  },
  {
    District: "Mulanje",
    TA: "TA Juma",
  },
  {
    District: "Mulanje",
    TA: "STA Sunganinzeru",
  },
  {
    District: "Mulanje",
    TA: "STA Tombondiya",
  },
  {
    District: "Mulanje",
    TA: "Mulanje Mountain Reserve",
  },
  {
    District: "Mulanje",
    TA: "Mulanje Boma",
  },
  {
    District: "Phalombe",
    TA: "TA Mkhumba",
  },
  {
    District: "Phalombe",
    TA: "TA Nazombe",
  },
  {
    District: "Phalombe",
    TA: "TA Chiwalo",
  },
  {
    District: "Phalombe",
    TA: "TA Nkhulambe",
  },
  {
    District: "Phalombe",
    TA: "TA Jenala",
  },
  {
    District: "Phalombe",
    TA: "TA Kaduya",
  },
  {
    District: "Phalombe",
    TA: "Phalombe Boma",
  },
  {
    District: "Chikwawa",
    TA: "TA Ngabu",
  },
  {
    District: "Chikwawa",
    TA: "TA Lundu",
  },
  {
    District: "Chikwawa",
    TA: "TA Chapananga",
  },
  {
    District: "Chikwawa",
    TA: "TA Maseya",
  },
  {
    District: "Chikwawa",
    TA: "TA Katunga",
  },
  {
    District: "Chikwawa",
    TA: "TA Kasisi",
  },
  {
    District: "Chikwawa",
    TA: "TA Makhwira",
  },
  {
    District: "Chikwawa",
    TA: "STA Ndakwela",
  },
  {
    District: "Chikwawa",
    TA: "TA Mlilima",
  },
  {
    District: "Chikwawa",
    TA: "STA Masache",
  },
  {
    District: "Chikwawa",
    TA: "TA Ngowe",
  },
  {
    District: "Chikwawa",
    TA: "Lengwe National Park",
  },
  {
    District: "Chikwawa",
    TA: "Majete Game Reserve - Chikwawa",
  },
  {
    District: "Chikwawa",
    TA: "Chikwawa Boma",
  },
  {
    District: "Chikwawa",
    TA: "Ngabu Urban",
  },
  {
    District: "Nsanje",
    TA: "TA Ndamera",
  },
  {
    District: "Nsanje",
    TA: "TA Chimombo",
  },
  {
    District: "Nsanje",
    TA: "TA Nyachikadza",
  },
  {
    District: "Nsanje",
    TA: "TA Mlolo",
  },
  {
    District: "Nsanje",
    TA: "TA Tengani",
  },
  {
    District: "Nsanje",
    TA: "TA Malemia",
  },
  {
    District: "Nsanje",
    TA: "TA Mbenje",
  },
  {
    District: "Nsanje",
    TA: "TA Ngabu",
  },
  {
    District: "Nsanje",
    TA: "TA Makoko",
  },
  {
    District: "Nsanje",
    TA: "Mwabvi Game Reserve",
  },
  {
    District: "Nsanje",
    TA: "Nsanje Boma",
  },
  {
    District: "Balaka",
    TA: "TA Msamala",
  },
  {
    District: "Balaka",
    TA: "TA Kalembo",
  },
  {
    District: "Balaka",
    TA: "STA Kachenga",
  },
  {
    District: "Balaka",
    TA: "TA Amidu",
  },
  {
    District: "Balaka",
    TA: "TA Nkaya",
  },
  {
    District: "Balaka",
    TA: "STA Phalula",
  },
  {
    District: "Balaka",
    TA: "TA Chanthunya",
  },
  {
    District: "Balaka",
    TA: "TA Sawali",
  },
  {
    District: "Balaka",
    TA: "STA Matola",
  },
  {
    District: "Balaka",
    TA: "STA Toleza",
  },
  {
    District: "Balaka",
    TA: "Balaka Town",
  },
  {
    District: "Balaka",
    TA: "Liwonde Town",
  },
  {
    District: "Neno",
    TA: "TA Dambe",
  },
  {
    District: "Neno",
    TA: "TA Mlauli",
  },
  {
    District: "Neno",
    TA: "TA Symon Likongwe",
  },
  {
    District: "Neno",
    TA: "TA Chekucheku",
  },
  {
    District: "Neno",
    TA: "Neno Boma",
  },
  {
    District: "Zomba City",
    TA: "Mpira Ward",
  },
  {
    District: "Zomba City",
    TA: "Mbedza Ward",
  },
  {
    District: "Zomba City",
    TA: "Chinamwali Ward",
  },
  {
    District: "Zomba City",
    TA: "Chirunga Ward",
  },
  {
    District: "Zomba City",
    TA: "Mtiya Ward",
  },
  {
    District: "Zomba City",
    TA: "Masongola Ward",
  },
  {
    District: "Zomba City",
    TA: "Zomba Central Ward",
  },
  {
    District: "Zomba City",
    TA: "Likangala Ward",
  },
  {
    District: "Zomba City",
    TA: "Chambo Ward",
  },
  {
    District: "Zomba City",
    TA: "Sadzi Ward",
  },
  {
    District: "Blantyre City",
    TA: "Michiru Ward",
  },
  {
    District: "Blantyre City",
    TA: "South Lunzu Ward",
  },
  {
    District: "Blantyre City",
    TA: "Mapanga Ward",
  },
  {
    District: "Blantyre City",
    TA: "Nkolokoti Ward",
  },
  {
    District: "Blantyre City",
    TA: "Ndirande Matope Ward",
  },
  {
    District: "Blantyre City",
    TA: "Ndirande Makata Ward",
  },
  {
    District: "Blantyre City",
    TA: "Ndirande Gamulani Ward",
  },
  {
    District: "Blantyre City",
    TA: "Nyambadwe Ward",
  },
  {
    District: "Blantyre City",
    TA: "Mbayani Ward",
  },
  {
    District: "Blantyre City",
    TA: "Chilomoni Ward",
  },
  {
    District: "Blantyre City",
    TA: "Blantyre City Centre Ward",
  },
  {
    District: "Blantyre City",
    TA: "Namalimwe Ward",
  },
  {
    District: "Blantyre City",
    TA: "Limbe Central Ward",
  },
  {
    District: "Blantyre City",
    TA: "Mzedi Ward",
  },
  {
    District: "Blantyre City",
    TA: "Bangwe Ward",
  },
  {
    District: "Blantyre City",
    TA: "Bangwe Mthandizi Ward",
  },
  {
    District: "Blantyre City",
    TA: "Soche East Ward",
  },
  {
    District: "Blantyre City",
    TA: "Blantyre South Ward",
  },
  {
    District: "Blantyre City",
    TA: "Green Corner Ward",
  },
  {
    District: "Blantyre City",
    TA: "Soche West Ward",
  },
  {
    District: "Blantyre City",
    TA: "Namiyango Ward",
  },
  {
    District: "Blantyre City",
    TA: "Chigumula Ward",
  },
  {
    District: "Blantyre City",
    TA: "Misesa Ward",
  },
]);

onMounted(() => {
  getDistricts();
});

const closeDialog = () => {
  open.value = false;
};

const submitForm = async () => {
  form.value.submittedBy = user.value.firstname + " " + user.value.lastname;
  form.value.created = moment().toDate(); // This will set the current date and time

  try {
    await processStore.create(form.value);
    Swal.fire({
      title: "Success",
      text: "Created a new case successfully",
      icon: "success",
      confirmButtonText: "Ok",
    });
  } catch (error) {
    Swal.fire({
      title: "Failed",
      text: "Failed to create case (" + error + ")",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

const getDistricts = async () => {
  districtStore
    .get()
    .then((result) => {
      districts.length = 0; //empty array
      districts.push(...result);
    })
    .catch((error) => {
      // Handle error
    })
    .finally(() => {
      // Finalize
    });
};

const selectedDistrict = ref("");
const selectedTA = ref("");

const uniqueDistricts = computed(() => [
  ...new Set(districtTaData.value.map((item) => item.District)),
]);

const filteredTAs = computed(() =>
  districtTaData.value
    .filter((item) => item.District === selectedDistrict.value)
    .map((item) => item.TA)
);
</script>
