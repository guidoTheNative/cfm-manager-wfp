<template>
  <div>
    <button
      type="button"
      class="font-body px-6 py-2.5 bg-gray-400 text-white font-bold text-sm rounded shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      @click="open = true"
    >
      New Case
    </button>

    <TransitionRoot as="template" :show="open">
      <Dialog
        as="div"
        class="fixed inset-0 z-10 overflow-y-auto"
        @close="closeDialog"
        static
      >
        <div class="min-h-screen px-4 text-center">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <span class="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div class="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <div class="flex items-center justify-between border-b pb-3">
                <h3 class="text-lg font-bold leading-6 text-gray-900">Create New Contact</h3>
                <button @click="closeDialog" class="text-gray-400 hover:text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form @submit.prevent="submitForm" class="space-y-4 mt-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="firstName" class="block text-sm font-bold text-gray-700">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      v-model="form.firstName"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label for="lastName" class="block text-sm font-bold text-gray-700">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      v-model="form.lastName"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label for="email" class="block text-sm font-bold text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      v-model="form.email"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label for="phone" class="block text-sm font-bold text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      v-model="form.phone"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label for="address" class="block text-sm font-bold text-gray-700">Address</label>
                    <input
                      type="text"
                      id="address"
                      v-model="form.address"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label for="notes" class="block text-sm font-bold text-gray-700">Notes</label>
                    <textarea
                      id="notes"
                      v-model="form.notes"
                      rows="3"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    ></textarea>
                  </div>
                </div>

                <div class="flex justify-end mt-6">
                  <button
                    type="button"
                    class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 mr-2"
                    @click="closeDialog"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                  >
                    Save Contact
                  </button>
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
  district: "",
  ta: "",
  gvh: "",
  name_of_caller: "",
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
});

onMounted(() => {
  getDistricts();
});

const closeDialog = () => {
  open.value = false;
};

const submitForm = () => {
  emit("create", form.value);

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
