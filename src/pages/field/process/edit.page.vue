<template>
  <main class="font-bold">
    <spinner-widget v-bind:open="isLoading" />
    <div>
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
                  v-model="selectedDistrict"
                  @change="updateActivitySites"
                  id="district"
                  class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
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
                  v-model="selectedTA"
                  @change="updateActivitySites"
                  id="ta"
                  class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
                >
                  <option v-for="ta in uniqueTAs" :key="ta" :value="ta">
                    {{ ta }}
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
                  class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
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
                  <h2 class="text-md font-semibold mb-2">Additional Details</h2>
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
                  class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
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
                  class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
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
                  class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
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
                    class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
                    placeholder="Enter activity site"
                  />
                </template>

                <template v-else>
                  <select
                    v-model="form.activitySite"
                    id="activitySite"
                    :disabled="filteredActivitySites.length <= 0"
                    class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
                  >
                    <option
                      v-for="site in filteredActivitySites"
                      :key="site.ActivitySite"
                      :value="site.ActivitySite"
                    >
                      {{ site.ActivitySite }}
                    </option>
                  </select>
                </template>
              </div>
              <!-- Transfer Modality -->
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="transferModality"
                  class="block text-sm font-bold text-gray-700"
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
                  class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                    {{ macro.toUpperCase() }}
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
                  class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                >
                  <option value="" disabled>Select Category</option>
                  <option
                    v-for="category in filteredCategories"
                    :key="category"
                    :value="category"
                  >
                    {{ category.toUpperCase() }}
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
                  class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                >
                  <option value="" disabled>Select Subcategory</option>
                  <option
                    v-for="sub in filteredSubCategories"
                    :key="sub"
                    :value="sub"
                  >
                    {{ sub.toUpperCase() }}
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
                  v-model="computedPriority"
                  disabled
                  class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                >
                  <option :value="computedPriority">
                    {{ computedPriority.toUpperCase() }}
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
                  class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
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
                    class="block text-sm font-bold text-gray-700"
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
                    class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
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
                    class="block text-sm font-bold text-gray-700"
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
                    class="block text-sm font-bold text-gray-700"
                    >Incident Time</label
                  >

                  <select
                    id="district"
                    v-model="form.incidentTime"
                    class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                    class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
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
                    class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                      class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                      class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                    />
                  </div>
                </transition>

                <!-- Proof of Issue -->
         <!--        <div class="col-span-12 sm:col-span-12">
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
                    class="mt-1 block w-full shadow-sm border-gray-300 rounded-md sm:text-sm"
                  >
                    <option :value="true">Yes</option>
                    <option :value="false">No</option>
                  </select>
                </div>
              </template>
            </div>
          </div>

          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              style="background-color: #096eb4"
              class="font-body inline-block px-6 py-2.5 text-white font-bold text-xs leading-tight rounded shadow-md hover:bg-blue-700 focus:outline-none"
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
import { ref, inject, reactive, onMounted, computed, watch } from "vue";
import { usedistrictstore } from "../../../stores/districts.store";
import { useSessionStore } from "../../../stores/session.store";
import { useProcessStore } from "../../../stores/process.store";

import { useRoute } from "vue-router";
const Swal = inject("Swal");

import breadcrumbWidget from "../../../components/widgets/breadcrumbs/admin.breadcrumb.vue";
import proofFileComponent from "../../../components/pages/cases/file-proof.component.vue";

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
  { name: "Home", href: "/field/dashboard", current: false },
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
  processMonitoringActivity: "",
  activity: "",
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
  witnessName: "",
  witnessPhone: "",
  activitySite: "",
  resourceType: "",
  divertedQuantity: 0, // Number field
  priority: "Low",
});

onMounted(async () => {
  getDistricts();
  getFiles();
  try {
    const result = await processStore.get();
    const issueData = result.find((item) => item.id == issueId);
    if (issueData) {
      form.value = { ...form.value, ...issueData };

      form.value.district = issueData.district;
      form.value.ta = issueData.ta;
      form.value.gvh = issueData.gvh;
      form.value.village = issueData.village;
      form.value.issueDescription = issueData.issueDescription;
      form.value.macrocategory = issueData.macrocategory;
      form.value.category = issueData.category;
      form.value.subCategory = issueData.subCategory;

      // Set the selected values
      selectedDistrict.value = form.value.district;
      selectedTA.value = form.value.TA;
      selectedMacro.value = form.value.macrocategory;
      selectedCategory.value = form.value.category;
      selectedSubCategory.value = form.value.subCategory;
    } else {
      console.log("No case found with the specified ID.");
    }
  } catch (error) {
    console.error("Error fetching case data:", error);
  }
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
  form.value.created = moment().toDate(); // Set the current date and time
  form.value.macrocategory = selectedMacro.value;
  form.value.category = selectedCategory.value;
  form.value.subCategory = selectedSubCategory.value;
  form.value.district = selectedDistrict.value;
  form.value.TA = selectedTA.value;
  form.value.priority = computedPriority.value;
  form.value.witnessName = form.value.witnessName ?? "";
  form.value.witnessPhone = form.value.witnessPhone ?? "";

  try {
    await processStore.update(form.value);

    Swal.fire({
      position: "top-end", // Position to the top right
      title: "Success",
      text: "Updated issue successfully",
      icon: "success",
      showConfirmButton: false, // Hide the confirm button
      timer: 3000, // Auto close after 3 seconds
      toast: true, // Make it look like a toast
    });
  } catch (error) {
    Swal.fire({
      position: "top-end", // Position to the top right
      title: "Failed",
      text: "Failed to update issue (" + error + ")",
      icon: "error",
      showConfirmButton: false, // Hide the confirm button
      timer: 3000, // Auto close after 3 seconds
      toast: true, // Make it look like a toast
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
  return [...new Set(activitysite.filter((item) => item.District == user.value.district).map((item) => item.District))];
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
watch(filteredActivitySites, (newVal) => {}, { deep: true });

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
