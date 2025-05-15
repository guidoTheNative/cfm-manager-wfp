<template>
  <main class="font-bold">
    <!--spinner-->
    <spinner-widget v-bind:open="isLoading" />
    <div>
      <!-- tabs -->
      <div class="align-middle inline-block min-w-full">
        <div class="tab-content" id="tabs-case-options">
          <div class="tab-pane fade show active" id="case-settings">
            <div class="bg-white">
              <!-- Form -->
              <form @submit.prevent="submitForm">
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                        @change="handleIssueAffectingChange"
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                            class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                            class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                            class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                            class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                        v-model="selectedDistrict"
                        class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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

                    <!-- T/A -->
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="ta"
                        class="block text-sm font-bold text-gray-700"
                        >T/A</label
                      >
                      <select
                        id="ta"
                        v-model="selectedTA"
                        :disabled="filteredTAs.length === 0"
                        class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      >
                        <option v-for="ta in filteredTAs" :key="ta" :value="ta">
                          {{ ta }}
                        </option>
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                      >
                        <option value="" disabled>Select Partner</option>
                        <option
                          v-for="partner in cooperatingPartner"
                          :key="partner"
                          :value="partner"
                        >
                          {{ partner }}
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                        v-model="selectedMacro"
                        @change="updateCategories"
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                      >
                        <option value="" disabled>Select Macrocategory</option>
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                      v-if="
                        selectedCategory && filteredSubCategories.length > 0
                      "
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
                          {{ sub }}
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
                        class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      >
                        <option
                          v-for="programme in [
                            'Refugees - Emergency',
                            'Lean Season Response - Emergency',
                            'Floods Response - Emergency',
                            'School Meals',
                            'FFA - Integrated Resilience',
                            'Insurance - Integrated Resilience',
                            'Nutrition',
                            'Other',
                            'Floods Response',
                            'Refugees',
                          ]"
                          :key="programme"
                          :value="programme"
                        >
                          {{ programme }}
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
                        v-model="computedPriority"
                        disabled
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm bg-gray-100"
                      >
                        <option :value="computedPriority">
                          {{ computedPriority }}
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                        class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      >
                        <option
                          v-for="nationality in nationalities"
                          :key="nationality"
                          :value="nationality"
                        >
                          {{ nationality }}
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                      >
                        <option value="" disabled selected>
                          Select Age range
                        </option>
                        <!-- Iterate over the dynamic list of districts -->
                        <option
                          v-for="range in ['5-17', '18-59', '60 and Above']"
                          :key="range"
                          :value="range"
                        >
                          {{ range }}
                        </option>
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
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
                        class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      >
                        <option
                          v-for="disability in ['Yes', 'No']"
                          :key="disability"
                          :value="disability"
                        >
                          {{ disability }}
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                      >
                        <option disabled value="">Select Action</option>
                        <option value="Callback">Callback</option>
                        <option value="External referral required">
                          External referral required
                        </option>
                        <option value="First case resolution">
                          First case resolution
                        </option>
                        <option value="Internal escalation - Action required">
                          Internal escalation - Action required
                        </option>
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
                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                        disabled
                      >
                        <option value="Open">Open</option>
                        <option value="Pending">Pending</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>

                    <div
                      class="col-span-12 sm:col-span-12"
                      v-if="computedPriority === 'High'"
                    >
                      <label
                        for="proofOfCase"
                        class="block text-sm font-bold text-gray-700"
                      >
                        Proof of Case (Attachment)
                      </label>

                      <div
                        class="tab-pane fade show active"
                        id="case-settings"
                        role="tabpanel"
                        aria-labelledby="tabs-case-settings"
                      >
                        <div class="bg-white">
                          <!-- Form -->
                          <proof-priority-file-component
                            :case-id="caseId"
                            :model="files"
                          ></proof-priority-file-component>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    style="background-color: #096eb4"
                    class="font-body inline-block px-6 py-2.5 text-white font-bold text-xs leading-tight rounded shadow-md hover:bg-blue-700 focus:outline-none"
                  >
                    Update Case
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
import { useCaseStore } from "../../../stores/case.store";
const Swal = inject("Swal");

import { useRoute } from "vue-router";
import breadcrumbWidget from "../../../components/widgets/breadcrumbs/admin.breadcrumb.vue";
import proofPriorityFileComponent from "../../../components/pages/cases/file-p1-proof.component.vue";

const districtStore = usedistrictstore();

import { useFileStore } from "../../../stores/file.store";

const fileStore = useFileStore();

const files = reactive([]);

import {
  activitysite,
  activities,
  districtTaData,
  nationalities,
  cooperatingPartner,
  categoriesData,
} from "@/composables/useConstants";

const sessionStore = useSessionStore();
const user = ref(sessionStore.getUser);
const moment = inject("moment");

const caseStore = useCaseStore();

const cases = reactive([]);
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
  { name: "CFM Cases", href: "#", current: true },
  { name: "Create", href: "#", current: true },
];
const priorities = [
  { id: "High", name: "High" },
  { id: "Medium", name: "Medium" },
  { id: "Low", name: "Low" },
];

const route = useRoute();
const caseId = route.params.id;
// Cooperating Partners List

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
  macrocategory: "",
  category: "",
  subCategory: "",
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

const selectedMacro = ref("");
const selectedCategory = ref("");
const selectedSubCategory = ref("");


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


// Computed property to get the priority
const computedPriority = computed(() => {
  const found = categoriesData.find(
    (item) =>
      item.macrocategory === selectedMacro.value &&
      item.category === selectedCategory.value &&
      item.subcategory.trim() === selectedSubCategory.value.trim()
  );
  return found ? found.Priority : ""; // Default to LOW if not found
});

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

const updateCategories = () => {
  selectedCategory.value = "";
  selectedSubCategory.value = "";
};

const updateSubCategories = () => {
  selectedSubCategory.value = "";
};

const handleIssueAffectingChange = () => {
  if (form.value.issueAffecting !== "Someone else") {
    form.value.relationship = "";
    form.value.reasonNotContact = "";
    form.value.otherRelationship = "";
    form.value.otherReasonNotContact = "";
  }
};

onMounted(async () => {
  getFiles()
  getDistricts();
  try {
    const result = await caseStore.get();
    const caseData = result.find((item) => item.id == caseId);
    if (caseData) {
      form.value = { ...form.value, ...caseData };

      form.value.district = caseData.district;
      form.value.ta = caseData.ta;
      form.value.gvh = caseData.gvh;
      form.value.village = caseData.village;
      form.value.issueDescription = caseData.issueDescription;
      form.value.macrocategory = caseData.macrocategory;
      form.value.category = caseData.category;
      form.value.subCategory = caseData.subCategory;

      // Set the selected values
      selectedDistrict.value = form.value.district;
      selectedTA.value = form.value.ta;
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

const closeDialog = () => {
  open.value = false;
};

const submitForm = async () => {
  form.value.district = selectedDistrict.value;
  form.value.ta = selectedTA.value;
  form.value.priority = computedPriority.value;
  form.value.macrocategory = selectedMacro.value;
  form.value.category = selectedCategory.value;
  form.value.subCategory = selectedSubCategory.value;
  try {
    await caseStore.update(form.value);
    Swal.fire({
      position: "top-end", // Position to the top right
      title: "Success",
      text: "Update case successfully",
      icon: "success",
      showConfirmButton: false, // Remove the confirm button
      timer: 3000, // Auto close after 3 seconds
      toast: true, // Enable toast-like notification
    });
  } catch (error) {
    Swal.fire({
      position: "top-end", // Position to the top right
      title: "Failed",
      text: "Failed to update case (" + error + ")",
      icon: "error",
      showConfirmButton: false, // Remove the confirm button
      timer: 3000, // Auto close after 3 seconds
      toast: true, // Enable toast-like notification
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

const uniqueDistricts = computed(() => {
  return [
    ...new Set(
      activitysite
        .filter((item) => item.District) // Exclude matching district
        .map((item) => item.District)
    ),
  ];
});

const filteredTAs = computed(() =>
  districtTaData
    .filter((item) => item.District === selectedDistrict.value)
    .map((item) => item.TA)
);

const updateStatus = () => {
  switch (form.value.action) {
    case "Callback":
    case "External referral required":
      form.value.status = "Pending";
      break;
    case "First case resolution":
      form.value.status = "Closed";
      break;
    case "Internal escalation - Action required":
      form.value.status = "Open";
      break;
    default:
      form.value.status = "Open";
  }
};

// Watch for changes to action and update status automatically
watch(() => form.action, updateStatus);
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
