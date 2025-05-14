<template>
  <main class="space-y-2">
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-bold leading-6 text-gray-900 capitalize">
            Case Information
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            This information is for the case you have selected to edit.
          </p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form @submit.prevent="onSubmit">
            <div class="overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 sm:p-6">
                <div class="grid grid-cols-6 gap-6">
           

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="district"
                      class="block text-sm font-bold text-gray-700"
                      >District</label
                    >
                    <select
                      id="district"
                      name="district"
                      v-model="model.district"
                      autocomplete="district-name"
                      class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    >
                      <option
                        v-for="district in districts"
                        :key="district.name"
                        :value="district.name"
                      >
                        <span>{{ district.name.toUpperCase() }}</span>
                      </option>
                    </select>
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="ta"
                      class="block text-sm font-bold text-gray-700"
                      >T/A</label
                    >
              
                    <input
                      type="text"
                      id="ta"
                      v-model="model.ta"
                      class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="gvh"
                      class="block text-sm font-bold text-gray-700"
                      >GVH</label
                    >
                    <input
                      type="text"
                      id="gvh"
                      v-model="model.gvh"
                      class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="name_of_caller"
                      class="block text-sm font-bold text-gray-700"
                      >Name of Caller</label
                    >
                    <input
                      type="text"
                      id="name_of_caller"
                      v-model="model.name_of_caller"
                      class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="village"
                      class="block text-sm font-bold text-gray-700"
                      >Village</label
                    >
                    <input
                      type="text"
                      id="village"
                      v-model="model.village"
                      class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="id-number"
                      class="block text-sm font-bold text-gray-700"
                      >ID Number</label
                    >
                    <input
                      type="text"
                      id="id-number"
                      v-model="model.idNumber"
                      class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-6">
                    <label
                      for="issue-description"
                      class="block text-sm font-bold text-gray-700"
                      >Issue Description</label
                    >
                 
                    <textarea
                          id="issueDescription"
                          v-model="model.issueDescription"
                          class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                        />
                  </div>

                  <div class="col-span-6 sm:col-span-6">
                    <label
                      for="case-category"
                      class="block text-sm font-bold text-gray-700"
                      >Case Category</label
                    >
                    <input
                      type="text"
                      id="case-category"
                      v-model="model.caseCategory"
                      class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="programme"
                      class="block text-sm font-bold text-gray-700"
                      >Programme</label
                    >

                    <select
                      id="programme"
                      name="programme"
                      v-model="model.programme"
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

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="priority"
                      class="block text-sm font-bold text-gray-700"
                      >Priority</label
                    >

                    <select
                      id="priority"
                      name="priority"
                      v-model="model.priority"
                      autocomplete="priority-name"
                      class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    >
                      <option
                        v-for="priority in ['High', 'Medium', 'Low']"
                        :key="priority"
                        :value="priority"
                      >
                        {{ priority.toUpperCase() }}
                      </option>
                    </select>
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="account-number"
                      class="block text-sm font-bold text-gray-700"
                      >Account Number</label
                    >
                    <input
                      type="text"
                      id="account-number"
                      v-model="model.accountNumber"
                      class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="phone-number"
                      class="block text-sm font-bold text-gray-700"
                      >Phone Number</label
                    >
                    <input
                      type="number"
                      id="phone-number"
                      v-model="model.phoneNumber"
                      class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="nationality"
                      class="block text-sm font-bold text-gray-700"
                      >Nationality</label
                    >
                    <select
                      id="nationality"
                      name="nationality"
                      v-model="model.nationality"
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

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="age"
                      class="block text-sm font-bold text-gray-700"
                      >Age</label
                    >
                    <input
                      type="text"
                      id="age"
                      v-model="model.age"
                      class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="gender"
                      class="block text-sm font-bold text-gray-700"
                      >Gender</label
                    >

                    <select
                      id="gender"
                      name="gender"
                      v-model="model.gender"
                      autocomplete="gender-name"
                      class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    >
                      <option
                        v-for="gender in ['Male', 'Female']"
                        :key="gender"
                        :value="gender"
                      >
                        {{ gender.toUpperCase() }}
                      </option>
                    </select>
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="disability"
                      class="block text-sm font-bold text-gray-700"
                      >Disability</label
                    >
                    <select
                      id="disability"
                      name="disability"
                      v-model="model.disability"
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

                  <div class="col-span-6 sm:col-span-6">
                    <label
                      for="comment"
                      class="block text-sm font-bold text-gray-700"
                      >Comment</label
                    >
                


                    <textarea
                          id="comment"
                          v-model="model.comment"
                          class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                        />
                  </div>

                  <div class="col-span-6 sm:col-span-6">
                    <label
                      for="status"
                      class="block text-sm font-bold text-gray-700"
                      >Status</label
                    >
                    <select
                      id="status"
                      name="status"
                      v-model="model.status"
                      autocomplete="status-name"
                      class="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    >
                      <option
                        v-for="status in ['Open', 'Closed', 'Pending']"
                        :key="status"
                        :value="status"
                      >
                        {{ status.toUpperCase() }}
                      </option>
                    </select>
                  </div>

                  <div class="col-span-6 sm:col-span-6">
                    <div class="flex justify-end space-x-3">
                      <button
                        style="background-color: #096eb4"
                        type="submit"
                        class="inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-bold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { inject, ref, watch, reactive, onMounted, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useForm, useField, useSubmitForm, useIsFormValid } from "vee-validate";
//COMPONENTS
//SCHEMA AND STORES
import { UpdateUserSchema } from "../../../services/schema/user.schema";
import { useRoleStore } from "../../../stores/role.store";

import { usedistrictstore } from "../../../stores/districts.store";
import { useCaseStore } from "../../../stores/case.store";

import { useSessionStore } from "../../../stores/session.store";
//INJENCTIONS
const $router = useRouter();
const $route = useRoute();
const moment = inject("moment");
const Swal = inject("Swal");
const props = defineProps({
  model: Object,
});
//VARIABLES
const emit = defineEmits(["update"]);
const isLoading = ref(false);
const breadcrumbs = [
  { name: "Home", href: "/admin/dashboard", current: false },
  { name: "Cases", href: "/admin/users", current: false },
  { name: "Edit", href: "/admin/users/edit", current: true },
];
const roleStore = useRoleStore();
const caseStore = useCaseStore();

const districtStore = usedistrictstore();

const sessionStore = useSessionStore();
const user = ref(sessionStore.getUser);

const roles = reactive([]);

const districts = reactive([]);
const { model } = toRefs(props);
///FORM

const delegations = ref([]); // Delegations receipient
const newDelegate = ref("");
const DelegateError = ref("");

const { meta } = useForm({
  validationSchema: UpdateUserSchema,
  // initialValues: {
  //   id: model.value.id,
  //   firstName: model.value.firstName,
  //   lastname:  model.value.lastname,
  //   phone:  model.value.phone,
  //   email:  model.value.email,
  //   status:  model.value.status,
  //   roleId:  model.value.roleId,
  // },
});
///FIELDS

const toggle = ref(false);
//MOUNTED
onMounted(() => {
  //Assign
  getRoles();

  getDistricts();
});
//FUNCTIONS
const onSubmit = () => {
  model.value.id = parseInt($route.params.id);
  model.value.editcount = 0;
  model.value.date = "";
  emit("update", model);
};

const getDistricts = async () => {
  isLoading.value = true;
  districtStore
    .get()
    .then((result) => {
      districts.push(...result);
    })
    .catch((error) => {
      Swal.fire({
        title: "Failed",
        text: "failed to get districts error (" + error + ")",
        icon: "error",
        confirmButtonText: "Ok",
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const getRoles = async () => {
  isLoading.value = true;
  roleStore
    .get()
    .then((result) => {
      roles.push(...result);
    })
    .catch((error) => {
      Swal.fire({
        title: "Failed",
        text: "failed to get roles error (" + error + ")",
        icon: "error",
        confirmButtonText: "Ok",
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const deleteAcc = async () => {
  let id = model.value.id;
  isLoading.value = true;

  caseStore
    .remove(id)
    .then((result) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#16a34a",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Deleted Case succesfully.", "success");
          isLoading.value = false;
          let role = user.value.roleId == "ADMIN1" ? "admin" : "manager";
          $router.push({ path: "/" + role + "/cases" });
        }
      });
    })
    .catch((error) => {
      Swal.fire({
        title: "Failed",
        text: "failed to remove theme  (" + error + ")",
        icon: "error",
        confirmButtonText: "Ok",
      });
    });
};


</script>
