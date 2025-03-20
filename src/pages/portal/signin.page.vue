<template>
  <div class="min-h-screen flex items-center justify-center bg-blue-600">
    <spinner-widget :open="isLoading" />

    <!-- Form Container -->

    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-8 mx-2">
      <div class="text-center">
        <div
          class="flex justify-center items-center mb-4 rounded-md p-4"
          style="background-color: #096eb4"
        >
          <img
            class="h-24"
            src="../../assets/images/wfp-logo-emblem-white.png"
            alt="WFP"
          />
        </div>
        <h2 class="mt-6 text-md font-extrabold text-gray-700 text-center">
          WFP CASE TRACKER <span class="text-sm font-normal">(v1.0)</span>
        </h2>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div class="mt-8">
        <form @submit="onSubmit" :validation-schema="schema" class="space-y-6">
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email address</label
            >
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                v-model="email"
                autocomplete="email"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
              />
              <p class="text-red-500 text-xs italic pt-1">{{ emailError }}</p>
            </div>
          </div>

          <!-- Password Input -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <div class="mt-1">
              <input
                id="password"
                name="password"
                :type="isPwd ? 'text' : 'password'"
                v-model="password"
                autocomplete="current-password"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
              />
              <p class="text-red-500 text-xs italic pt-1">
                {{ passwordError }}
              </p>
            </div>
          </div>

          <!-- Show Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="hide-password"
                name="hide-password"
                type="checkbox"
                v-model="isPwd"
                class="h-4 w-4 text-blue-400 border-gray-300 rounded focus:ring-blue-400"
              />
              <label for="show-password" class="ml-2 text-sm text-gray-900"
                >Show password</label
              >
            </div>
            <router-link
              :to="{ name: 'portal-forgot-password' }"
              style="color: #096eb4"
              class="text-sm"
            >
              Forgot your password?
            </router-link>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              style="background-color: #096eb4"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            >
              Sign in
            </button>
          </div>
        </form>

        <div class="mt-10 text-center">
          <p class="text-sm text-gray-600">
            &copy; {{ moment().format("YYYY") }} {{ system.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ChevronLeftIcon } from "@heroicons/vue/solid";
import { useField, useForm, useSubmitForm } from "vee-validate";
import { inject, onMounted, reactive, ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";
import { useSessionStore } from "../../stores/session.store";

import { useDisasterstore } from "../../stores/disaster.store";

import { usecommoditiestore } from "../../stores/commodity.store";

import { usecommoditytypestore } from "../../stores/commodity-type.store";

import { usedistrictstore } from "../../stores/districts.store";

import { useorganisationstore } from "../../stores/organisations.store";
import { useprojectstore } from "../../stores/project.store";

import { usewarehousestore } from "../../stores/warehouse.store";

import { usetransporterstore } from "../../stores/transporter.store";

//DECLARATIONS
const system = reactive({
  name: process.env.VUE_APP_NAME,
  short: process.env.VUE_APP_SHORT_NAME,
  mode: process.env.VUE_APP_MODE,
  version: process.env.VUE_APP_VERSION,
});
const $router = useRouter();
//COMPONENTS
import spinnerWidget from "../../components/widgets/spinners/roller.spinner.vue";
//INJENCTIONS
const moment = inject("moment");
const Swal = inject("Swal");
//VARIABLES
const disasterStore = useDisasterstore();
const commodityStore = usecommoditiestore();
const commoditytypeStore = usecommoditytypestore();
const districtStore = usedistrictstore();
const organisationStore = useorganisationstore();
const projectStore = useprojectstore();
const warehouseStore = usewarehousestore();
const transporterStore = usetransporterstore();
const sessionStore = useSessionStore();
import { saveDataOffline, getDataOffline } from "@/services/localbase";

const isPwd = ref(false);
const isLoading = ref(false);
//FORM
///SCHEMA
const schema = yup.object({
  email: yup.string().required("filed is required").email("enter valid email"),
  password: yup.string().required("filed is required"),
});
///FORM
const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    email: "",
    password: "",
  },
});
///FIELDS
const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");
import { checkOnlineStatus } from "@/services/utils/network";

const storedRole = sessionStorage.getItem("RLE");
//MOUNTED
//Mounted
onMounted(async () => {
  await nextTick();
  //checkSession();
});
//FUNCTIONS

const sessionObject = ref(null);
const onSubmit = useSubmitForm((values, actions) => {
  isLoading.value = true;
  const model = {
    email: email.value,
    password: password.value,
  };

  sessionStore
    .signIn(model)
    .then(async (result) => {
      // Display success toast
      Swal.fire({
        text: "Successfully signed in",
        icon: "success",
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      // Check the role and redirect accordingly
      if (result.role === "Admin") {
        $router.push({ path: "/Admin" });
      } else if (result.role === "Activity manager") {
        $router.push({ path: "/activitymanager" });
      } else if (result.role === "Call center") {
        $router.push({ path: "/callcenter" });
      } else if (result.role === "Co-operating Partner") {
        $router.push({ path: "/cp" });
      } else if (result.role === "PSEA/Gender Focal Point") {
        $router.push({ path: "/psea" });
      } else if (result.role === "Field staff") {
        $router.push({ path: "/field" });
      } else if (result.role === "Head of Programme") {
        $router.push({ path: "/hop" });
      } else {
        $router.push({ path: "/" + result.role });
      }
    })
    .catch((error) => {
      // Extract error message if it's an object with a `message` property
      const errorMessage =
        typeof error === "object" && error.message
          ? error.message
          : String(error);

      // Check for specific errors
      if (errorMessage.includes("This user is disabled")) {
        Swal.fire({
          text: "User is inactive. Please contact the administrator.",
          icon: "error",
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } else if (errorMessage.includes("Invalid credentials")) {
        Swal.fire({
          text: "Invalid email or password. Please try again.",
          icon: "error",
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        // General error handling
        Swal.fire({
          text: "Failed to login (Check network connection! If the problem persists, contact admin).",
          icon: "error",
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    })
    .finally(() => {
      isLoading.value = false;
      actions.resetForm();
    });
});

const checkSession = async () => {
  const session = await getDataOffline("session");

  if (session.length > 0) {
    if (session[0].role === "district officer") {
      await $router.push({ name: "warehouse-dashboard" });
    } else if (session[0].role === "central user (DoDMA)") {
      await $router.push({ name: "planner-dashboard" });
    } else if (session[0].role === "receipient officer") {
      await $router.push({ name: "receipient-dashboard" });
    } else if (session[0].role === "Commissioner (DODMA)") {
      await $router.push({ name: "commissioner-dashboard" });
    }
  }
};
</script>

<style scoped>
/* Ensure the background is full screen */
body,
html {
  height: 100%;
  margin: 0;
}

.bg-blue-600 {
  background-color: #096eb4;
}
</style>
