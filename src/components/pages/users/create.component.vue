<template>
  <div>
    <button
      type="button"
      class="font-body inline-block px-6 py-2.5 bg-gray-500 text-white font-bold text-xs leading-tight rounded shadow-md hover:bg-gray-400 hover:shadow-lg focus:bg-gray-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-400 active:shadow-lg transition duration-100 ease-in-out capitalize"
      @click="open = true"
    >
      new user
    </button>
    <TransitionRoot as="template" :show="open">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="open = false"
        static
      >
        <div
          class="flex min-h-screen text-center md:block md:px-2 lg:px-4"
          style="font-size: 0"
        >
          <TransitionChild
            class=" "
            v-if="open"
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

          <!-- This element is to trick the browser into centering the modal contents. -->
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
                class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md bg-white"
              >
                <h5
                  class="text-md font-bold leading-normal text-gray-800"
                  id="formModalLabel"
                >
                  Create User
                </h5>
                <button
                  type="button"
                  class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  @click="open = false"
                >
                  <XIcon class="h-4 w-4" />
                </button>
              </div>

              <div class="grid grid-cols-6 bg-white">
                <div class="col-span-6 sm:col-span-3 mx-6 my-3">
                  <label
                    for="user-role"
                    class="block text-sm font-bold text-gray-700"
                  >
                    Select User Type</label
                  >
                  <select
                    id="role"
                    name="role"
                    v-model="roleId"
                    autocomplete="role-name"
                    class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  >
                    <option
                      v-for="role in roles"
                      :key="role.id"
                      :value="role.id"
                      class="uppercase"
                    >
                      {{ role.name }}
                    </option>
                  </select>
                  <p class="text-red-500 text-xs italic pt-1">
                    {{ roleIdError }}
                  </p>
                </div>
              </div>

              <form
                @submit="onSubmit"
                :validation-schema="CreateUserSchema"
                v-if="
                  roleId == 'ADMIN1' ||
                  roleId == 'ADMIN2' ||
                  roleId == 'ADMIN3' ||
                  roleId == 'ADMIN4' ||
                  roleId == 'ADMIN5' ||
                  roleId == 'ADMIN6' ||
                  roleId == 'ADMIN7' ||
                  roleId == 'ADMIN8' ||
                  roleId == 'ADMIN9'
                "
              >
                <div class="px-4 py-5 bg-white sm:p-6">
                  <div class="grid grid-cols-6 gap-2">
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="first-name"
                        class="block text-sm font-bold text-gray-700"
                        >First name</label
                      >
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        v-model="firstname"
                        autocomplete="given-name"
                        class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <p class="text-red-500 text-xs italic pt-1">
                        {{ firstNameError }}
                      </p>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="last-name"
                        class="block text-sm font-bold text-gray-700"
                        >Last name</label
                      >
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        v-model="lastname"
                        autocomplete="family-name"
                        class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <p class="text-red-500 text-xs italic pt-1">
                        {{ lastNameError }}
                      </p>
                    </div>

                    <div class="col-span-6 sm:col-span-5">
                      <label
                        for="email-address"
                        class="block text-sm font-bold text-gray-700"
                        >Email address</label
                      >
                      <input
                        type="text"
                        name="email-address"
                        id="email-address"
                        v-model="email"
                        autocomplete="email"
                        class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <p class="text-red-500 text-xs italic pt-1">
                        {{ emailError }}
                      </p>
                    </div>
                    <div class="col-span-6 sm:col-span-4">
                      <label
                        for="phone-number"
                        class="block text-sm font-bold text-gray-700"
                        >Phone</label
                      >
                      <input
                        type="text"
                        v-model="phone"
                        name="phone-number"
                        id="phone-number"
                        autocomplete="off"
                        placeholder="e.g. 0999123456"
                        class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <p class="text-red-500 text-xs italic pt-1">
                        {{ phoneError }}
                      </p>
                    </div>

                    <div
                      class="col-span-6 sm:col-span-4"
                      v-if="
                        roleId == 'ADMIN8' ||
                        roleId == 'ADMIN7' ||
                        roleId == 'ADMIN5'
                      "
                    >
                      <label
                        for="user-district"
                        class="block text-sm font-bold text-gray-700"
                        >Select District</label
                      >
                      <select
                        id="district"
                        name="district"
                        v-model="district"
                        autocomplete="district-name"
                        class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      >
                        <option
                          v-for="district in districts"
                          :key="district.name"
                          :value="district.name"
                          class="uppercase"
                        >
                          {{ district.name }}
                        </option>
                      </select>
                      <p class="text-red-500 text-xs italic pt-1">
                        {{ districtError }}
                      </p>

                      <!-- Message for ADMIN5 role -->
                      <p
                        v-if="roleId === 'ADMIN5'"
                        class="text-gray-600 text-xs italic pt-1"
                      >
                        For national dispatchers, you can leave the district
                        blank.
                      </p>
                    </div>

                    <div
                      class="col-span-6 sm:col-span-4"
                      v-if="roleId == 'ADMIN2'"
                    >
                      <label
                        for="user-activity"
                        class="block text-sm font-bold text-gray-700"
                        >Select activity they manage</label
                      >
                      <select
                        id="activity"
                        name="activity"
                        v-model="activity"
                        autocomplete="district-name"
                        class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      >
                        <option
                          v-for="activity in [
                            'Act 1: General Food Distribution (URT1)',
                            'Act 2: Unconditional Resource Transfer (URT2)',
                            'Act 3: Malnutrition Prevention Activities (NPA)',
                            'Act 4: School Meals Programme (SMP)',
                            'Act 5: Asset Creation and Livelihoods (ACL)',
                          ]"
                          :key="activity"
                          :value="activity"
                          class="uppercase"
                        >
                          {{ activity }}
                        </option>
                      </select>
                      <p class="text-red-500 text-xs italic pt-1">
                        {{ activityError }}
                      </p>

                      <!-- Message for ADMIN5 role -->
                      <p
                        v-if="roleId === 'ADMIN5'"
                        class="text-gray-600 text-xs italic pt-1"
                      >
                        For national dispatchers, you can leave the district
                        blank.
                      </p>
                    </div>

                    <div
                      class="col-span-12 sm:col-span-12"
                      v-if="roleId == 'ADMIN1'"
                    >
                      <label
                        for="privileges"
                        class="block text-sm font-bold text-gray-700"
                      >
                        User Privileges
                      </label>
                      <div
                        class="flex flex-wrap items-center border-gray-300 rounded-md border p-2 mt-1"
                      >
                        <span
                          v-for="(privilege, index) in privileges"
                          :key="index"
                          class="mr-2 mb-2 px-2 py-1 bg-blue-200 text-blue-800 rounded-lg text-sm flex items-center"
                        >
                          {{ privilege }}
                          <button
                            @click="removePrivilege(index)"
                            class="ml-1 text-red-500"
                          >
                            &times;
                          </button>
                        </span>
                      </div>
                      <div class="mt-2">
                        <select
                          v-model="selectedPrivilege"
                          @change="addPrivilege"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-blue-300 sm:text-sm"
                        >
                          <option value="" disabled selected>
                            Select user privileges
                          </option>
                          <option
                            v-for="priv in availablePrivileges"
                            :key="priv"
                            :value="priv"
                          >
                            {{ priv }}
                          </option>
                        </select>
                      </div>
                      <p class="text-red-500 text-xs italic pt-1">
                        {{ privilegeError }}
                      </p>
                    </div>
                  </div>

                  <div class="grid grid-cols-6 gap-6 mt-3">
                    <div class="col-span-6 sm:col-span-4">
                      <label
                        for="password"
                        class="block text-sm font-bold text-gray-700"
                      >
                        Password</label
                      >
                      <input
                        id="password"
                        name="password"
                        :type="isPwd ? 'text' : 'password'"
                        v-model="password"
                        autocomplete="off"
                        class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <div class="flex items-center w-full">
                        <input
                          id="hide-password"
                          name="show-password"
                          v-model="isPwd"
                          type="checkbox"
                          class="ml-2 h-4 w-4 border-gray-300 text-[#096eb4] focus:ring-blue-400 rounded"
                        />
                        <label
                          for="show-password"
                          class="block text-sm text-gray-900 p-2"
                          >Show password</label
                        >
                      </div>
                      <p class="text-red-500 text-xs italic pt-1">
                        {{ passwordError }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    style="background-color: #096eb4"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-bold rounded-md text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                  >
                    Save
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
import { inject, ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useForm, useField, useSubmitForm, useIsFormValid } from "vee-validate";
//COMPONENTS
import spinnerWidget from "../../../components/widgets/spinners/default.spinner.vue";
//SCHEMA AND STORES
import { CreateUserSchema } from "../../../services/schema/user.schema";
import { useRoleStore } from "../../../stores/role.store";
import { useUserStore } from "../../../stores/user.store";
import { usedistrictstore } from "../../../stores/districts.store";
import { useSessionStore } from "../../../stores/session.store";
//INJENCTIONS
const $router = useRouter();
const moment = inject("moment");
const emit = defineEmits(["create"]);
//VARIABLES
const isLoading = ref(false);
const open = ref(false);
const isPwd = ref(false);
const showModal = ref(false);
const roleStore = useRoleStore();
const userStore = useUserStore();
const roles = reactive([]);
const districtstore = usedistrictstore();
const districts = reactive([]);
const sessionStore = useSessionStore();
const user = ref(sessionStore.getUser);
const privileges = ref([]);
const selectedPrivilege = ref("");
const privilegeError = ref("");
const availablePrivileges = [
  "All",
 
];

//FORM
const { meta } = useForm({
  validationSchema: CreateUserSchema,
  initialValues: {
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    status: true,
    roleId: "",
    district: "National",
    activity: ""
  },
});
///FIELDS
const { value: firstname, errorMessage: firstnameError } =
  useField("firstname");
const { value: lastname, errorMessage: lastnameError } = useField("lastname");
const { value: phone, errorMessage: phoneError } = useField("phone");
const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField("confirmPassword");
const { value: status, errorMessage: statusError } = useField("status");
const { value: roleId, errorMessage: roleIdError } = useField("roleId");
const { value: district, errorMessage: districtError } = useField("district");
const { value: activity, errorMessage: activityError } = useField("activity");

//MOUNTED
onMounted(() => {
  getRoles();
  getDistricts();
});
//FUNCTIONS

const props = defineProps({
  users: Array,
});

const delegations = ref([]); // Array of tags (places)
const newDelegate = ref(""); // Input value for new tags
const DelegateError = ref(""); // Error message (if applicable)
const isDelegated = ref(false);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Methods
function addTag() {
  const delegate = newDelegate.value.trim();
  const emailExists = props.users.some((user) => user.email.includes(delegate));
  if (
    delegate &&
    emailPattern.test(delegate) &&
    !delegations.value.includes(delegate) &&
    !emailExists
  ) {
    delegations.value.push(delegate);
    newDelegate.value = "";
    DelegateError.value = "";
  } else {
    DelegateError.value = emailExists
      ? "Delegation must not be an existing system user!"
      : "Please enter a valid email address!";
  }
}

function removeTag(index) {
  delegations.value.splice(index, 1);
}

const getDistricts = async () => {
  districtstore
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

const onSubmit = useSubmitForm((values, actions) => {
  let model = {
    firstname: firstname.value,
    lastname: lastname.value,
    username: firstname.value + "." + lastname.value,
    phone: phone.value,
    email: email.value,
    country: "Malawi",
    password: password.value,
    status: status.value,
    roleId: roleId.value,
    district: district.value,
    activity: activity.value,
    privileges: privileges.value.join(),
    isDelegated: isDelegated.value == "false" ? false : true,
  };
  emit("create", model);
  open.value = false;
  actions.resetForm();
});

const getRoles = async () => {
  isLoading.value = true;
  roleStore
    .get()
    .then((result) => {
      roles.push(...result);
    })
    .catch((error) => {
      // Handle error
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const addPrivilege = () => {
  if (
    selectedPrivilege.value &&
    !privileges.value.includes(selectedPrivilege.value)
  ) {
    if (selectedPrivilege.value === "All") {
      privileges.value = ["All"];
    } else {
      privileges.value.push(selectedPrivilege.value);
      privileges.value = privileges.value.filter((priv) => priv !== "All");
    }
    selectedPrivilege.value = "";
  }
};

const removePrivilege = (index) => {
  privileges.value.splice(index, 1);
};
</script>

<style>
.rounded-table {
  border-radius: 10px;
  overflow: hidden;
}

.from-color {
  color: #096eb4;
}

.to-color {
  color: green;
}

.by-color {
  color: gray;
}
</style>
