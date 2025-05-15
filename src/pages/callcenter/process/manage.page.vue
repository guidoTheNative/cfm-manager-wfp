<template>
  <main class="font-bold">
    <spinner-widget v-bind:open="isLoading" />
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <breadcrumb-widget v-bind:breadcrumbs="breadcrumbs" />

      <div class="mt-2 md:flex md:items-center md:justify-between mb-3">
        <div class="flex-1 min-w-0">
          <h2
            class="font-bold leading-7 text-[#096eb4] sm:text-2xl sm:truncate"
          >
            Process Monitoring Issue Management
          </h2>
        </div>

        <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4"></div>
      </div>

      <!-- Tabs -->
      <div class="flex items-center bg-gray-100 p-4 rounded-md shadow-md">
        <button
          v-for="tab in ['View', 'Edit']"
          :key="tab"
          :class="[
            'px-6 py-2 text-sm font-semibold transition-all duration-300 ease-in-out rounded-md mr-2',
            activeTab === tab
              ? 'text-white bg-[#096eb4] shadow-md'
              : 'text-gray-500 bg-white hover:text-[#096eb4] hover:bg-gray-200',
          ]"
          @click="setActiveTab(tab)"
        >
          {{ tab.charAt(0) + tab.slice(1) }} Mode
        </button>
      </div>

      <div
        class="align-middle inline-block min-w-full"
        v-if="activeTab === 'View'"
      >
        <div class="bg-white">
          <form @submit.prevent="submitForm">
            <div class="p-4 bg-white">
              <div
                class="p-4 rounded-md mb-4"
                style="background-color: #096eb4; color: white"
              >
                <h2 class="text-md font-semibold mb-2">Intake Details</h2>
              </div>
              <!-- District -->
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="district"
                    class="block text-sm font-bold text-gray-700"
                    >District</label
                  >

                  <select
                    v-model="form.district"
                    @change="updateActivitySites"
                    id="district"
                    disabled
                    class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                  >
                    <option
                      v-for="district in uniqueDistricts"
                      :key="district"
                      :value="district"
                    >
                      {{ district }}
                    </option>
                  </select>
                </div>

                <!-- Traditional Authority (TA) -->
                <div class="col-span-6 sm:col-span-3">
                  <label for="ta" class="block text-sm font-bold text-gray-700"
                    >T/A</label
                  >
                  <select
                    v-model="form.TA"
                    @change="updateActivitySites"
                    id="ta"
                    disabled
                    class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                  >
                    <option :value="form.TA">
                      {{ form.TA }}
                    </option>
                  </select>
                </div>

                <!-- Cooperating Partner -->
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="cooperatingPartner"
                    class="block text-sm font-bold text-gray-700"
                    >Cooperating Partner</label
                  >

                  <select
                    v-model="form.cooperatingPartner"
                    id="district"
                    disabled
                    class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                  >
                    <option
                      v-for="cooperatingPartner in cooperatingPartner"
                      :key="cooperatingPartner"
                      :value="cooperatingPartner"
                    >
                      {{ cooperatingPartner }}
                    </option>
                  </select>
                </div>

                <div class="col-span-12 sm:col-span-12">
                  <hr class="my-4 border-blue-300" />

                  <div
                    class="p-4 rounded-md mb-4"
                    style="background-color: #096eb4; color: white"
                  >
                    <h2 class="text-md font-semibold mb-2">
                      Additional Details
                    </h2>
                  </div>
                </div>

                <!-- Process Monitoring Activity -->
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="processMonitoringActivity"
                    class="block text-sm font-bold text-gray-700"
                    >Process Monitoring Activity</label
                  >

                  <select
                    v-model="form.processMonitoringActivity"
                    id="district"
                    disabled
                    class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                  >
                    <option
                      v-for="processMonitoringActivity in [
                        'Distribution Monitoring',
                        'Activity Implementation Monitoring (AIM)',
                        'Warehouse Monitoring',
                        'Retailer Performance Monitoring and Evaluation (RPME)',
                        'Post Distribution Monitoring',
                        'Focus Group Discussions',
                      ]"
                      :key="processMonitoringActivity"
                      :value="processMonitoringActivity"
                    >
                      {{ processMonitoringActivity }}
                    </option>
                  </select>
                </div>

                <!-- Activity -->
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="activity"
                    class="block text-sm font-bold text-gray-700"
                  >
                    Activity
                  </label>
                  <select
                    v-model="form.activity"
                    @change="updateSubactivities"
                    id="activity"
                    disabled
                    class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                  >
                    <option
                      v-for="(act, index) in uniqueActivities"
                      :key="index"
                      :value="act"
                    >
                      {{ act }}
                    </option>
                  </select>
                </div>

                <!-- Subactivity -->
                <div
                  v-if="filteredSubactivities.length > 0"
                  class="col-span-6 sm:col-span-3"
                >
                  <label
                    for="subActivity"
                    class="block text-sm font-bold text-gray-700"
                  >
                    Subactivity
                  </label>
                  <select
                    v-model="form.subActivity"
                    id="subActivity"
                    disabled
                    class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                  >
                    <option
                      v-for="(sub, index) in filteredSubactivities"
                      :key="index"
                      :value="sub"
                    >
                      {{ sub }}
                    </option>
                  </select>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="activitySite"
                    class="block text-sm font-bold text-gray-700"
                  >
                    Activity Site 
                  </label>

                  <template
                    v-if="
                      form.subActivity === 'Emergency Response' ||
                      form.subActivity === 'Lean Season Response'
                    "
                  >
                    <input
                      v-model="form.activitySite"
                      id="activitySite"
                      type="text"
                      disabled
                      class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      placeholder="Enter activity site"
                    />
                  </template>

                  <template v-else>
                    <select
                      v-model="form.activitySite"
                      id="activitySite"
                      disabled
                      class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                    >
                      <option
                         :value="form.activitySite"
                      >
                        {{ form.activitySite }}
                      </option>
                    </select>
                  </template>
                </div>
                <!-- Transfer Modality -->
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="transferModality"
                    disabled
                    class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                    >Transfer Modality</label
                  >

                  <select
                    v-model="form.transferModality"
                    id="district"
                    disabled
                    class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
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

                <div class="col-span-6 sm:col-span-3">
                  <!-- Macrocategory Dropdown -->
                  <label
                    for="macroCategory"
                    class="block text-sm font-bold text-gray-700"
                  >
                    Macro category
                  </label>
                  <select
                    id="macroCategory"
                    v-model="selectedMacro"
                    @change="updateCategories"
                    disabled
                    class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                  >
                    <option value="" disabled>Select Macro category</option>
                    <option
                      v-for="macro in [
                        ...new Set(
                          categoriesData.map((item) => item.macrocategory)
                        ),
                      ]"
                      :key="macro"
                      :value="macro"
                    >
                      {{ macro }}
                    </option>
                  </select>
                </div>
                <!-- Category Dropdown (Shown Only If Macrocategory is Selected) -->
                <div v-if="selectedMacro" class="col-span-6 sm:col-span-3">
                  <label
                    for="category"
                    class="block text-sm font-bold text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    v-model="selectedCategory"
                    @change="updateSubCategories"
                    disabled
                    class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                  >
                    <option value="" disabled>Select Category</option>
                    <option
                      v-for="category in filteredCategories"
                      :key="category"
                      :value="category"
                    >
                      {{ category }}
                    </option>
                  </select>
                </div>

                <!-- Subcategory Dropdown (Shown Only If There Are Valid Subcategories) -->
                <div
                  v-if="selectedCategory && filteredSubCategories.length > 0"
                  class="col-span-6 sm:col-span-3"
                >
                  <label
                    for="subCategory"
                    class="block text-sm font-bold text-gray-700"
                  >
                    Subcategory
                  </label>
                  <select
                    id="subCategory"
                    v-model="selectedSubCategory"
                    disabled
                    class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                  >
                    <option value="" disabled>Select Subcategory</option>
                    <option
                      v-for="sub in filteredSubCategories"
                      :key="sub"
                      :value="sub"
                    >
                      {{ sub }}
                    </option>
                  </select>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="priority"
                    class="block text-sm font-bold text-gray-700"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    v-model="form.priority"
                    disabled
                    class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                  >
                    <option :value="form.priority">
                      {{ form.priority}}
                    </option>
                  </select>
                </div>

                <!-- Monitoring Date -->
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="monitoringDate"
                    class="block text-sm font-bold text-gray-700"
                    >Monitoring Date</label
                  >
                  <input
                    v-model="form.monitoringDate"
                    id="monitoringDate"
                    type="date"
                    disabled
                    class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                  />
                </div>

                <!-- Issue Encountered -->
                <!-- Issue Encountered -->
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="issueEncountered"
                    class="block text-sm font-bold text-gray-700"
                    >Issue Encountered?</label
                  >
                  <select
                    v-model="form.issueEncountered"
                    id="issueEncountered"
                    disabled
                    class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
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
                      class="block text-sm font-bold text-gray-700"
                      >Issue Description</label
                    >
                    <textarea
                      v-model="form.issueDescription"
                      id="issueDescription"
                      disabled
                      class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                    />
                  </div>

                  <!-- Issue Solved on Field -->
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="issueSolvedOnField"
                      class="block text-sm font-bold text-gray-700"
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

                  <!-- Perpetrator -->
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="perpetrator"
                      class="block text-sm font-bold text-gray-700"
                      >Perpetrator's Name</label
                    >
                    <input
                      v-model="form.perpetrator"
                      id="perpetrator"
                      type="text"
                      disabled
                      class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                    />
                  </div>

                  <!-- Perpetrator's Gender -->
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="perpetratorGender"
                      class="block text-sm font-bold text-gray-700"
                      >Perpetrator's Gender</label
                    >
                    <select
                      v-model="form.perpetratorGender"
                      id="perpetratorGender"
                      disabled
                      class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <!-- Incident Date -->
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="incidentDate"
                      class="block text-sm font-bold text-gray-700"
                      >Incident Date</label
                    >
                    <input
                      v-model="form.incidentDate"
                      id="incidentDate"
                      type="date"
                      disabled
                      class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                    />
                  </div>

                  <!-- Incident Time -->
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="incidentTime"
                      class="block text-sm font-bold text-gray-700"
                      >Incident Time</label
                    >

                    <select
                      id="district"
                      v-model="form.incidentTime"
                      disabled
                      class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                    >
                      <option value="" disabled selected>
                        Select Incident time
                      </option>
                      <!-- Iterate over the dynamic list of districts -->
                      <option
                        v-for="incidentTime in [
                          'Morning (6-11:59)',
                          'Mid-day (12-13:59)',
                          'Afternoon (14-18:59)',
                          'Evening (19-23:59)',
                          'Night (00-5:59)',
                          'No information',
                        ]"
                        :key="incidentTime"
                        :value="incidentTime"
                      >
                        {{ incidentTime }}
                      </option>
                    </select>
                  </div>

                  <!-- Incident Location -->
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="incidentLocation"
                      class="block text-sm font-bold text-gray-700"
                      >Incident Location</label
                    >
                    <input
                      v-model="form.incidentLocation"
                      id="incidentLocation"
                      type="text"
                      disabled
                      class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="incidentWitnesses"
                      class="block text-sm font-bold text-gray-700"
                    >
                      Are there incident witnesses?
                    </label>
                    <select
                      id="incidentWitnesses"
                      v-model="form.incidentWitnesses"
                      disabled
                      class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <!-- Show these fields only if there are witnesses -->
                  <transition name="fade">
                    <div
                      v-if="form.incidentWitnesses === 'Yes'"
                      class="col-span-6 sm:col-span-3"
                    >
                      <label
                        for="witnessName"
                        class="block text-sm font-bold text-gray-700"
                      >
                        Witness Name
                      </label>
                      <input
                        id="witnessName"
                        type="text"
                        v-model="form.witnessName"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      />
                    </div>
                  </transition>

                  <transition name="fade">
                    <div
                      v-if="form.incidentWitnesses === 'Yes'"
                      class="col-span-6 sm:col-span-3"
                    >
                      <label
                        for="witnessPhone"
                        class="block text-sm font-bold text-gray-700"
                      >
                        Witness Phone Number
                      </label>
                      <input
                        id="witnessPhone"
                        type="text"
                        v-model="form.witnessPhone"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      />
                    </div>
                  </transition>

                  <!-- Proof of Issue -->
                  <!-- <div class="col-span-12 sm:col-span-12">
                    <label
                      for="proofOfIssue"
                      class="block text-sm font-bold text-gray-700"
                    >
                      Proof of Issue (Attachment)
                    </label>

                    <div
                      class="tab-pane fade show active"
                      id="case-settings"
                      role="tabpanel"
                      disabled
                      aria-labelledby="tabs-case-settings"
                    >
                      <div class="bg-white 
                      disabled">
                        <proof-file-component
                          :issue-id="files.issueId"
                          :model="files"
                        ></proof-file-component>
                      </div>
                    </div>
                  </div> -->
                  <!-- Incident Reported to WFP -->
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="reportedToWfp"
                      class="block text-sm font-bold text-gray-700"
                      >Reported to WFP?</label
                    >
                    <select
                      v-model="form.reportedToWfp"
                      id="reportedToWfp"
                      disabled
                      class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                    >
                      <option :value="true">Yes</option>
                      <option :value="false">No</option>
                    </select>
                  </div>
                </template>

                <div class="col-span-12 sm:col-span-12">
                 <label
                  for="proofOfIssue"
                  class="block text-sm font-bold text-gray-700"
                 >
                   Proof of Issue (Attachment)
                 </label>

                 <div
                  class="tab-pane fade show active"
                  id="case-settings"
                  role="tabpanel"
                  aria-labelledby="tabs-case-settings"
                 >
                  <div class="bg-white">
                    <!-- Form -->
                    <proof-file-component
                      :issue-id="issueId"
                      :="true"
                      :model="files"
                    ></proof-file-component>
                  </div>
                </div>
              </div>
              </div>
            </div>

            
          </form>
        </div>
      </div>
      <div
        class="align-middle inline-block min-w-full"
        v-if="activeTab === 'Edit'"
      >
      <editissues />
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
import { ref, inject, reactive, onMounted, computed, watch } from "vue";
import { usedistrictstore } from "../../../stores/districts.store";
import { useSessionStore } from "../../../stores/session.store";
import { useProcessStore } from "../../../stores/process.store";
const Swal = inject("Swal");

import { useRoute } from "vue-router";
import breadcrumbWidget from "../../../components/widgets/breadcrumbs/admin.breadcrumb.vue";
import proofFileComponent from "../../../components/pages/cases/file-proof.component.vue";

import editissues from "./edit.page.vue";
import {
  activitysite,
  activities,
  districtTaData,
  nationalities,
  cooperatingPartner,
  categoriesData,
} from "@/composables/useConstants";

const districtStore = usedistrictstore();

const sessionStore = useSessionStore();
const user = ref(sessionStore.getUser);
const moment = inject("moment");

const processStore = useProcessStore();

import { useFileStore } from "../../../stores/file.store";
const fileStore = useFileStore();

const route = useRoute();
const issueId = route.params.id;

const activeTab = ref("View");

const setActiveTab = (tab) => {
  activeTab.value = tab;
};

const cases = reactive([]);
const files = reactive([]);

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
  { name: "Home", href: "/callcenter/dashboard", current: false },
  { name: "Process Monitoring", href: "#", current: true },
  { name: "Issue Management", href: "#", current: true },
];
const priorities = [
  { id: "High", name: "High" },
  { id: "Medium", name: "Medium" },
  { id: "Low", name: "Low" },
];

const form = ref({
  district: "",
  cooperatingPartner: "",
  processMonitoringActivity: "",
  activity: "",
  activitySite: "",
  subActivity: "",
  transferModality: "",
  macrocategory: "",
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
  priority: "Low",
});

const getFiles = async () => {
  fileStore
    .get()
    .then((result) => {
      files.length = 0; //empty array
      files.push(...result);
    })
    .catch((error) => {
      // Handle error
    })
    .finally(() => {
      // Finalize
    });
};

const closeDialog = () => {
  open.value = false;
};

const submitForm = async () => {
  form.value.submittedBy = user.value.firstname + " " + user.value.lastname;
  form.value.created = moment().toDate(); // This will set the current date and time
  form.value.macrocategory = selectedMacro.value;
  form.value.category = selectedCategory.value;
  form.value.subCategory = selectedSubCategory.value;
  form.value.district = selectedDistrict.value;
  form.value.TA = selectedTA.value;
  form.value.priority = computedPriority.value;

  try {
    const result = await processStore.create(form.value);

    files.issueId = result.id; // Bind the issue ID to the file component

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

const filteredTAs = computed(() =>
  districtTaData
    .filter((item) => item.District === selectedDistrict.value)
    .map((item) => item.TA)
);

// Get unique activities
const uniqueActivities = computed(() => {
  return [...new Set(activities.map((item) => item.activity))];
});

// Filter subactivities based on selected activity
const filteredSubactivities = computed(() => {
  return activities
    .filter((item) => item.activity === form.value.activity)
    .map((item) => item.subactivity);
});

onMounted(async () => {
  getDistricts();
  getFiles();
  try {
    const result = await processStore.get();
    const issueData = result.find((item) => item.id == issueId);
    if (issueData) {
      // Populate the form with the case data
      form.value = { ...form.value, ...issueData };
      // Optionally log the populated form to verify
    } else {
      console.log("No issue found with the specified ID.");
    }
  } catch (error) {
    console.error("Error fetching issue:", error);
  }
});
// Reset subActivity when activity changes
const updateSubactivities = () => {
  form.value.subActivity = "";
};

// Get unique TAs based on selected District
const uniqueTAs = computed(() => {
  return selectedDistrict.value
    ? [
        ...new Set(
          activitysite
            .filter((item) => item.District === selectedDistrict.value)
            .map((item) => item.TraditionalAuthority)
        ),
      ]
    : [];
});

// Get unique districts from dataset
const uniqueDistricts = computed(() => {
  return [...new Set(activitysite.map((item) => item.District))];
});

const filteredActivitySites = computed(() => {
  // Filter based on selected District, TA, and Activity
  const filtered = activitysite.filter(
    (site) =>
      site.District === selectedDistrict.value &&
      site.TraditionalAuthority === selectedTA.value &&
      site.Activity === form.value.activity
  );

  // Remove duplicates using Set
  const uniqueSites = [
    ...new Map(filtered.map((site) => [site.ActivitySite, site])).values(),
  ];

  // Sort alphabetically
  return uniqueSites.sort((a, b) =>
    a.ActivitySite.localeCompare(b.ActivitySite)
  );
});

// Watcher: Log values whenever filteredActivitySites changes
watch(
  filteredActivitySites,
  (newVal) => {
    console.log("Filtered Activity Sites:", newVal);
  },
  { deep: true }
);

// Update activity sites when selections change
const updateActivitySites = () => {
  form.value.activitySite = ""; // Reset activity site selection when filters change
};

const selectedMacro = ref("");
const selectedCategory = ref("");
const selectedSubCategory = ref("");

// Computed property to filter categories based on selected macrocategory
const filteredCategories = computed(() => {
  return [
    ...new Set(
      categoriesData
        .filter((item) => item.macrocategory === selectedMacro.value)
        .map((item) => item.category)
    ),
  ];
});

const computedPriority = computed(() => {
  const found = categoriesData.find(
    (item) =>
      item.macrocategory === selectedMacro.value &&
      item.category === selectedCategory.value &&
      item.subcategory.trim() === selectedSubCategory.value.trim()
  );
  return found ? found.Priority : ""; // Default to LOW if not found
});

// Computed property to filter subcategories based on selected category
const filteredSubCategories = computed(() => {
  return [
    ...new Set(
      categoriesData
        .filter(
          (item) =>
            item.macrocategory === selectedMacro.value &&
            item.category === selectedCategory.value
        )
        .map((item) => item.subcategory)
    ),
  ].filter((sub) => sub.trim() !== ""); // Removes empty subcategories
});

// Reset dependent selections when macro or category changes
const updateCategories = () => {
  selectedCategory.value = "";
  selectedSubCategory.value = "";
};

const updateSubCategories = () => {
  selectedSubCategory.value = "";
};
</script>
