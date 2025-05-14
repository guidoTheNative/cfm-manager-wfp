<template>
  <main class="font-bold">
    <!--spinner-->
    <spinner-widget v-bind:open="isLoading" />
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div>
        <breadcrumb-widget v-bind:breadcrumbs="breadcrumbs" />
      </div>
      <div class="mt-2 md:flex md:items-center md:justify-between mb-3">
        <div class="flex-1 min-w-0">
          <h2
            class="font-bold leading-7 text-[#096eb4] sm:text-2xl sm:truncate"
          >
          CFM Case Management
          </h2>
        </div>

        <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4"></div>
      </div>

      <!-- Tabs -->
      <div class="flex items-center bg-gray-100 p-4 rounded-md shadow-md">
        <button
          v-for="tab in ['view', 'edit']"
          :key="tab"
          :class="[
            'px-6 py-2 text-sm font-semibold transition-all duration-300 ease-in-out rounded-md mr-2',
            activeTab === tab
              ? 'text-white bg-[#096eb4] shadow-md'
              : 'text-gray-500 bg-white hover:text-[#096eb4] hover:bg-gray-200',
          ]"
          @click="setActiveTab(tab)"
        >
          {{ tab.charAt(0).toUpperCase() + tab.slice(1) }} Mode
        </button>
      </div>

      <!-- tabs -->
      <div
        class="align-middle inline-block min-w-full"
        v-if="activeTab === 'view'"
      >
        <div class="tab-content" id="tabs-case-options">
          <div class="tab-pane fade show active" id="case-settings">
            <div class="bg-white">
              <!-- Form -->
              <form @submit.prevent="submitForm" disabled>
                <div class="p-4 bg-white">
                  <div
                    class="p-4 rounded-md mb-4"
                    style="background-color: #096eb4; color: white"
                  >
                    <h2 class="text-md font-semibold mb-2">Intake Details</h2>
                  </div>

                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="intakeModality"
                        class="block text-sm font-bold text-gray-700"
                      >
                        Intake Modality
                      </label>
                      <select
                        id="intakeModality"
                        v-model="form.intakeModality"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      >
                        <option value="Helpdesk">Helpdesk</option>
                        <option value="Helpline">Helpline</option>
                        <option value="Suggestion Box">Suggestion Box</option>
                        <option value="Walk-in">Walk-in</option>
                        <option value="Other">Other (Specify)</option>
                      </select>
                      <input
                        v-if="form.intakeModality === 'Other'"
                        type="text"
                        v-model="form.intakeModalityOther"
                        placeholder="Specify other modality"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      />
                    </div>

                    <!-- Who is this issue affecting? -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="issueAffecting"
                        class="block text-sm font-bold text-gray-700"
                      >
                        Who is this issue affecting?
                      </label>
                      <select
                        id="issueAffecting"
                        v-model="form.issueAffecting"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      >
                        <option value="Myself">Myself</option>
                        <option value="Someone else">Someone else</option>
                      </select>
                    </div>

                    <!-- Relationship & Reason if "Someone else" -->
                    <div
                      v-if="form.issueAffecting === 'Someone else'"
                      class="col-span-12"
                    >
                      <div class="grid grid-cols-12 gap-4">
                        <!-- Relationship -->
                        <div class="col-span-6 sm:col-span-3">
                          <label
                            for="relationship"
                            class="block text-sm font-bold text-gray-700"
                          >
                            Relationship to Complainant
                          </label>
                          <select
                            id="relationship"
                            v-model="form.relationship"
                            disabled
                            class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                          >
                            <option value="Parent">Parent</option>
                            <option value="Child">Child</option>
                            <option value="Other close relative">
                              Other close relative
                            </option>
                            <option value="Neighbour">Neighbour</option>
                            <option value="Other">Other (Specify)</option>
                          </select>
                          <input
                            v-if="form.relationship === 'Other'"
                            type="text"
                            v-model="form.otherRelationship"
                            placeholder="Specify relationship"
                            disabled
                            class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                          />
                        </div>

                        <!-- Reason for not contacting -->
                        <div class="col-span-6 sm:col-span-3">
                          <label
                            for="reasonNotContact"
                            class="block text-sm font-bold text-gray-700"
                          >
                            Why did that person not contact us?
                          </label>
                          <select
                            id="reasonNotContact"
                            v-model="form.reasonNotContact"
                            disabled
                            class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                          >
                            <option value="Minor (< 17 years old)">
                              Minor (&lt; 17 years old)
                            </option>
                            <option value="Can't read or write">
                              Can't read or write
                            </option>
                            <option value="Older person">Older person</option>
                            <option value="Person with disability">
                              Person with disability
                            </option>
                            <option value="Gender related reasons">
                              Gender related reasons
                            </option>
                            <option value="Afraid of consequences">
                              Afraid of consequences
                            </option>
                            <option value="Does not know how to contact WFP">
                              Does not know how to contact WFP
                            </option>
                            <option value="Does not have a phone">
                              Does not have a phone
                            </option>
                            <option value="Language difference">
                              Language difference
                            </option>
                            <option value="Urgent - no time to consult">
                              Urgent - no time to consult
                            </option>
                            <option value="Other">Other (Specify)</option>
                          </select>
                          <input
                            v-if="form.reasonNotContact === 'Other'"
                            type="text"
                            v-model="form.otherReasonNotContact"
                            placeholder="Specify reason"
                            disabled
                            class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- District -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="district"
                        class="block text-sm font-bold text-gray-700"
                        >District</label
                      >
                      <select
                        id="district"
                        v-model="form.district"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      >
                        <option :value="form.district">
                          {{ form.district }}
                        </option>
                      </select>
                    </div>

                    <!-- T/A -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="ta"
                        class="block text-sm font-bold text-gray-700"
                        >T/A</label
                      >
                      <select
                        id="ta"
                        v-model="form.ta"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      >
                        <option :value="form.ta">{{ form.ta }}</option>
                      </select>
                    </div>

                    <!-- GVH -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="gvh"
                        class="block text-sm font-bold text-gray-700"
                        >GVH</label
                      >
                      <input
                        id="gvh"
                        type="text"
                        v-model="form.gvh"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      />
                    </div>

                    <!-- Village -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="village"
                        class="block text-sm font-bold text-gray-700"
                        >Village</label
                      >
                      <input
                        id="village"
                        type="text"
                        v-model="form.village"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="name_of_caller"
                        class="block text-sm font-bold text-gray-700"
                        >Name of Caller</label
                      >
                      <input
                        id="name_of_caller"
                        type="text"
                        v-model="form.name_of_caller"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      />
                    </div>

                    <!-- ID Number -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="idNumber"
                        class="block text-sm font-bold text-gray-700"
                        >ID Number</label
                      >
                      <input
                        id="idNumber"
                        type="text"
                        v-model="form.idNumber"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      />
                    </div>

                    <!-- Language of Interaction -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="languageOfInteraction"
                        class="block text-sm font-bold text-gray-700"
                      >
                        Language of Interaction
                      </label>
                      <select
                        id="languageOfInteraction"
                        v-model="form.languageOfInteraction"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      >
                        <option value="" disabled>Select Language</option>
                        <option value="Chichewa">Chichewa</option>
                        <option value="English">English</option>
                        <option value="French">French</option>
                        <option value="Swahili">Swahili</option>
                        <option value="Tumbuka">Tumbuka</option>
                        <option value="Other">Other (Specify)</option>
                      </select>
                      <input
                        v-if="form.languageOfInteraction === 'Other'"
                        type="text"
                        v-model="form.otherLanguageOfInteraction"
                        placeholder="Specify other language"
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                      />
                    </div>

                    <!-- Diversity Factor -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="diversityFactor"
                        class="block text-sm font-bold text-gray-700"
                      >
                        Diversity Factor
                      </label>
                      <select
                        id="diversityFactor"
                        v-model="form.diversityFactor"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      >
                        <option value="" disabled>
                          Select Diversity Factor
                        </option>
                        <option value="None">None</option>
                        <option value="Chronic illness">Chronic illness</option>
                        <option value="Member of religious minority">
                          Member of religious minority
                        </option>
                        <option value="Nursing mother">Nursing mother</option>
                        <option value="Older person living alone">
                          Older person living alone
                        </option>
                        <option value="Older person living with children">
                          Older person living with children
                        </option>
                        <option value="People with disability">
                          People with disability
                        </option>
                        <option value="Pregnant">Pregnant</option>
                        <option value="Single female headed household">
                          Single female headed household
                        </option>
                        <option
                          value="Single female headed household, people with disability"
                        >
                          Single female headed household, people with disability
                        </option>
                        <option value="Single male headed household">
                          Single male headed household
                        </option>
                        <option value="Other">Other (Specify)</option>
                      </select>
                      <input
                        v-if="form.diversityFactor === 'Other'"
                        type="text"
                        v-model="form.otherDiversityFactor"
                        placeholder="Specify other factor"
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                      />
                    </div>

                    <!-- Cooperating Partners Dropdown -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="cooperatingPartner"
                        class="block text-sm font-bold text-gray-700"
                      >
                        Cooperating Partner
                      </label>
                      <select
                        id="cooperatingPartner"
                        v-model="form.cooperatingPartner"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      >
                        <option :value="form.cooperatingPartner">
                          {{ form.cooperatingPartner }}
                        </option>
                      </select>
                    </div>

                    <!-- Conditional Input for 'Other (specify)' -->
                    <div
                      class="col-span-6 sm:col-span-3"
                      v-if="form.cooperatingPartner === 'Other (specify)'"
                    >
                      <label
                        for="otherCooperatingPartner"
                        class="block text-sm font-bold text-gray-700"
                      >
                        Specify Other Partner
                      </label>
                      <input
                        type="text"
                        id="otherCooperatingPartner"
                        v-model="form.otherCooperatingPartner"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                        placeholder="Enter partner name"
                      />
                    </div>

                    <!-- Issue Description -->
                    <div class="col-span-12 sm:col-span-12">
                      <label
                        for="issueDescription"
                        class="block text-sm font-bold text-gray-700"
                        >Issue Description</label
                      >
                      <textarea
                        id="issueDescription"
                        v-model="form.issueDescription"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      />
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
                    <div class="col-span-6 sm:col-span-3">
                      <!-- Macrocategory Dropdown -->
                      <label
                        for="macroCategory"
                        class="block text-sm font-bold text-gray-700"
                      >
                        Macrocategory
                      </label>
                      <select
                        id="macroCategory"
                        v-model="form.macrocategory"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      >
                        <option :value="form.macrocategory">
                          {{ form.macrocategory }}
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
                        v-model="form.category"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      >
                        <option :value="form.category">
                          {{ form.category }}
                        </option>
                      </select>
                    </div>

                    <!-- Subcategory Dropdown (Shown Only If There Are Valid Subcategories) -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="subCategory"
                        class="block text-sm font-bold text-gray-700"
                      >
                        Subcategory
                      </label>
                      <select
                        id="subCategory"
                        v-model="form.subCategory"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      >
                        <option :value="form.subCategory">
                          {{ form.subCategory }}
                        </option>
                      </select>
                    </div>

                    <!-- Programme -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="programme"
                        class="block text-sm font-bold text-gray-700"
                        >Programme</label
                      >

                      <select
                        id="programme"
                        name="programme"
                        v-model="form.programme"
                        autocomplete="programme-name"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      >
                        <option :value="form.programme">
                          {{ form.programme }}
                        </option>
                      </select>
                    </div>

                    <!-- Priority -->
                    <!-- Priority -->
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
                          {{ form.priority }}
                        </option>
                      </select>
                    </div>

                    <!-- Account Number -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="accountNumber"
                        class="block text-sm font-bold text-gray-700"
                        >Account Number</label
                      >
                      <input
                        id="accountNumber"
                        type="text"
                        v-model="form.accountNumber"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      />
                    </div>

                    <!-- Phone Number -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="phoneNumber"
                        class="block text-sm font-bold text-gray-700"
                        >Phone Number</label
                      >
                      <input
                        id="phoneNumber"
                        type="text"
                        v-model="form.phoneNumber"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      />
                    </div>

                    <!-- Nationality -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="nationality"
                        class="block text-sm font-bold text-gray-700"
                        >Nationality</label
                      >
                      <select
                        id="nationality"
                        name="nationality"
                        v-model="form.nationality"
                        autocomplete="nationality-name"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      >
                        <option :value="form.nationality">
                          {{ form.nationality }}
                        </option>
                      </select>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="district"
                        class="block text-sm font-bold text-gray-700"
                        >Age</label
                      >
                      <select
                        id="district"
                        v-model="form.age"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      >
                        <!-- Iterate over the dynamic list of districts -->
                        <option :value="form.age">{{ form.age }}</option>
                      </select>
                    </div>

                    <!-- Gender -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="gender"
                        class="block text-sm font-bold text-gray-700"
                        >Gender</label
                      >
                      <select
                        id="gender"
                        v-model="form.gender"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      >
                        <option :value="form.gender">{{ form.gender }}</option>
                      </select>
                    </div>

                    <!-- Disability -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="disability"
                        class="block text-sm font-bold text-gray-700"
                        >Disability</label
                      >
                      <select
                        id="disability"
                        name="disability"
                        v-model="form.disability"
                        autocomplete="disability-name"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      >
                        <option :value="form.disability">
                          {{ form.disability }}
                        </option>
                      </select>
                    </div>

                    <!-- Comment -->
                    <div class="col-span-12 sm:col-span-12">
                      <label
                        for="comment"
                        class="block text-sm font-bold text-gray-700"
                        >Comment</label
                      >
                      <textarea
                        id="comment"
                        v-model="form.comment"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      />
                    </div>

                    <!-- Status and Action (shown only when status is not "Closed") -->

                    <!-- Action -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="action"
                        class="block text-sm font-bold text-gray-700"
                      >
                        Action
                      </label>
                      <select
                        id="action"
                        v-model="form.action"
                        @change="updateStatus"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      >
                        <option :value="form.action">{{ form.action }}</option>
                      </select>
                    </div>

                    <!-- Status -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="status"
                        class="block text-sm font-bold text-gray-700"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        v-model="form.status"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      >
                        <option :value="form.status">{{ form.status }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'edit'">
        <editcases />
        <!-- Form -->
        <form @submit.prevent="submitForm" disabled></form>
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
import { useCaseStore } from "../../../stores/case.store";
const Swal = inject("Swal");

import { useRoute } from "vue-router";

import breadcrumbWidget from "../../../components/widgets/breadcrumbs/admin.breadcrumb.vue";

import editcases from "./edit.page.vue";
const breadcrumbs = [
  { name: "Home", href: "/admin/dashboard", current: false },
  { name: "CFM Cases", href: "/admin/cases", current: true },
  { name: "CFM Case Management", href: "#", current: true },
];
const moment = inject("moment");

const caseStore = useCaseStore();

const form = ref({
  district: "",
  ta: "",
  gvh: "",
  name_of_caller: "",
  cooperatingPartner: "",
  otherCooperatingPartner: "",
  village: "",
  idNumber: "",
  issueDescription: "",
  caseCategory: "",
  programme: "",
  priority: "",
  accountNumber: "",
  phoneNumber: "",
  nationality: "",
  age: "",
  gender: "",
  disability: "",
  comment: "",
  status: "",
  feedback: "",
  intakeModality: "",
  intakeModalityOther: "",
  issueAffecting: "",
  relationship: "",
  otherRelationship: "",
  reasonNotContact: "",
  otherReasonNotContact: "",
  languageOfInteraction: "",
  otherLanguageOfInteraction: "",
  diversityFactor: "",
  otherDiversityFactor: "",
});

const route = useRoute();
const caseId = route.params.id;

const activeTab = ref("view");

const setActiveTab = (tab) => {
  activeTab.value = tab;
};

onMounted(async () => {
  try {
    const result = await caseStore.get();
    const caseData = result.find((item) => item.id == caseId);
    if (caseData) {
      // Populate the form with the case data
      form.value = { ...form.value, ...caseData };
      // Optionally log the populated form to verify
    } else {
      console.log("No case found with the specified ID.");
    }
  } catch (error) {
    console.error("Error fetching cases:", error);
  }
});
</script>
<style>
/* Smooth fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
