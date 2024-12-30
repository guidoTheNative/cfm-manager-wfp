<template>
  <div>
    <button
      type="button"
      class="font-body inline-block px-6 py-2.5 bg-gray-500 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-gray-600 hover:shadow-lg focus:bg-gray-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-400 active:shadow-lg transition duration-100 ease-in-out capitalize"
      @click="open = true"
    >
      New Case
    </button>

    <!-- Dialog -->
    <TransitionRoot as="template" :show="open">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="closeDialog"
        static
      >
        <div
          class="flex min-h-screen text-center md:block md:px-2 lg:px-4"
          style="font-size: 0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay
              class="hidden pointer-events-none fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block"
            />
          </TransitionChild>

          <!-- Centering Trick -->
          <span
            class="hidden md:inline-block md:align-middle md:h-screen"
            aria-hidden="true"
            >&#8203;</span
          >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enter-to="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 md:scale-100"
            leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <div
              class="font-body flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-2xl"
            >
              <div
                class="modal-header flex items-center justify-between p-4 border-b border-gray-200 rounded-t-md bg-white"
              >
                <h5 class="text-md font-medium text-gray-800">Create Case</h5>
                <button
                  type="button"
                  class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 hover:opacity-75"
                  @click="closeDialog"
                >
                  <XIcon class="h-4 w-4" />
                </button>
              </div>
              <div class="bg-white">
                <!-- Form -->
                <form @submit.prevent="submitForm">
                  <div class="p-4 bg-white">
                    <div class="grid grid-cols-12 gap-4">
                      <!-- Agent Name -->
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="agent-name"
                          class="block text-sm font-medium text-gray-700"
                          >Agent Name</label
                        >
                        <input
                          id="agent-name"
                          type="text"
                          v-model="form.agentName"
                          class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                        />
                      </div>

                      <!-- District -->
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="district"
                          class="block text-sm font-medium text-gray-700"
                          >District</label
                        >
                        <select
                          id="district"
                          v-model="form.district"
                          class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                        >
                          <option value="" disabled selected>
                            Select a district
                          </option>
                          <!-- Iterate over the dynamic list of districts -->
                          <option
                            v-for="district in districts"
                            :key="district.id"
                            :value="district.id"
                          >
                            {{ district.name }}
                          </option>
                        </select>
                      </div>

                      <!-- T/A -->
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="ta"
                          class="block text-sm font-medium text-gray-700"
                          >T/A</label
                        >
                        <input
                          id="ta"
                          type="text"
                          v-model="form.ta"
                          class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                        />
                      </div>

                      <!-- GVH -->
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="gvh"
                          class="block text-sm font-medium text-gray-700"
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
                          class="block text-sm font-medium text-gray-700"
                          >Village</label
                        >
                        <input
                          id="village"
                          type="text"
                          v-model="form.village"
                          class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                        />
                      </div>

                      <!-- ID Number -->
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="idNumber"
                          class="block text-sm font-medium text-gray-700"
                          >ID Number</label
                        >
                        <input
                          id="idNumber"
                          type="text"
                          v-model="form.idNumber"
                          class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                        />
                      </div>

                      <!-- Issue Description -->
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="issueDescription"
                          class="block text-sm font-medium text-gray-700"
                          >Issue Description</label
                        >
                        <textarea
                          id="issueDescription"
                          v-model="form.issueDescription"
                          class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                        />
                      </div>

                      <!-- Case Category -->
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="caseCategory"
                          class="block text-sm font-medium text-gray-700"
                          >Case Category</label
                        >
                        <select
                          id="caseCategory"
                          v-model="form.caseCategory"
                          class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                        >
                          <option value="Category 1">Category 1</option>
                          <option value="Category 2">Category 2</option>
                          <option value="Category 3">Category 3</option>
                        </select>
                      </div>

                      <!-- Programme -->
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="programme"
                          class="block text-sm font-medium text-gray-700"
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
                            {{ programme.toUpperCase() }}
                          </option>
                        </select>
                      </div>

                      <!-- Priority -->
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="priority"
                          class="block text-sm font-medium text-gray-700"
                          >Priority</label
                        >
                        <select
                          id="priority"
                          v-model="form.priority"
                          class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>

                      <!-- Account Number -->
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="accountNumber"
                          class="block text-sm font-medium text-gray-700"
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
                          class="block text-sm font-medium text-gray-700"
                          >Phone Number</label
                        >
                        <input
                          id="phoneNumber"
                          type="number"
                          v-model="form.phoneNumber"
                          class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                        />
                      </div>

                      <!-- Nationality -->
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="nationality"
                          class="block text-sm font-medium text-gray-700"
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
                            v-for="nationality in [
                              'Malawian',
                              'Congolese',
                              'Rwandeese',
                              'Burundian',
                            ]"
                            :key="nationality"
                            :value="nationality"
                          >
                            {{ nationality.toUpperCase() }}
                          </option>
                        </select>
                      </div>

                      <!-- Age -->
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="age"
                          class="block text-sm font-medium text-gray-700"
                          >Age</label
                        >
                        <input
                          id="age"
                          type="text"
                          v-model="form.age"
                          class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                        />
                      </div>

                      <!-- Gender -->
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="gender"
                          class="block text-sm font-medium text-gray-700"
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
                          class="block text-sm font-medium text-gray-700"
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
                            {{ disability.toUpperCase() }}
                          </option>
                        </select>
                      </div>

                      <!-- Comment -->
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="comment"
                          class="block text-sm font-medium text-gray-700"
                          >Comment</label
                        >
                        <textarea
                          id="comment"
                          v-model="form.comment"
                          class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                        />
                      </div>

                      <!-- Status -->
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="status"
                          class="block text-sm font-medium text-gray-700"
                          >Status</label
                        >
                        <select
                          id="status"
                          v-model="form.status"
                          class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                        >
                          <option value="Open">Open</option>
                          <option value="Closed">Closed</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>

                      <!-- Feedback -->
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="feedback"
                          class="block text-sm font-medium text-gray-700"
                          >Feedback</label
                        >
                        <textarea
                          id="feedback"
                          v-model="form.feedback"
                          class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                        />
                      </div>

                      <!-- Date Closed -->
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="dateClosed"
                          class="block text-sm font-medium text-gray-700"
                          >Date Closed</label
                        >
                        <input
                          id="dateClosed"
                          type="date"
                          v-model="form.dateClosed"
                          class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      style="background-color: #096eb4"
                      class="font-body inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 focus:outline-none"
                    >
                      Save Case
                    </button>
                  </div>
                </form>
              </div>
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
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/outline";
import { ref, inject, reactive, onMounted } from "vue";
import { usedistrictstore } from "../../../stores/districts.store";

const districtStore = usedistrictstore();
const moment = inject("moment");

const districts = reactive([]);
const emit = defineEmits(["create"]);
const open = ref(false);
const roles = [
  { id: "ADMIN1", name: "Admin 1" },
  { id: "ADMIN2", name: "Admin 2" },
  // Add other roles...
];

const priorities = [
  { id: "High", name: "High" },
  { id: "Medium", name: "Medium" },
  { id: "Low", name: "Low" },
];
const form = ref({
  agentName: "",
  district: "",
  ta: "",
  gvh: "",
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
  dateClosed: "",
});

onMounted(() => {
  getDistricts();
});

const closeDialog = () => {
  open.value = false;
};

const submitForm = () => {
  emit("create", form.value);

  console.log(form.value, "ABF");
  open.value = false;
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
</script>
