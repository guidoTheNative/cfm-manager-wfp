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
          <h2 class="font-bold leading-7 text-[#096eb4] sm:text-2xl sm:truncate">
            Manage Rejected Case
          </h2>
        </div>
        <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4"></div>
      </div>
      <!-- tabs -->
      <div class="align-middle inline-block min-w-full">
        <div class="tab-content" id="tabs-case-options">
          <!-- <div
            class="tab-pane fade show active"
            id="case-profile"
            role="tabpanel"
            aria-labelledby="tabs-case-profile"
          >
            <case-profile v-bind:model="model" v-on:update="updateCase" :key="model.id+'profile'"/>
          </div> -->
          <div
            class="tab-pane fade show active"
            id="case-settings"
            role="tabpanel"
            aria-labelledby="tabs-case-settings"
          >
            <case-settings
              v-bind:model="model"
              v-on:update="updateCase"
              :key="model.id + 'settings'"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { inject, ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
//COMPONENTS
import spinnerWidget from "../../../components/widgets/spinners/default.spinner.vue";
import breadcrumbWidget from "../../../components/widgets/breadcrumbs/admin.breadcrumb.vue";
import UserProfile from "../../../components/pages/users/profile.component.vue";
import UserLogs from "../../../components/pages/users/logs.component.vue";
import CaseSettings from "../../../components/pages/cases/settings-rejected.component.vue";
//SCHEMA//AND//STORES
import { useCaseStore } from "../../../stores/case.store";
import eventBus from "../../../services/events/eventbus";

//INJENCTIONS
const $router = useRouter();
const $route = useRoute();
const moment = inject("moment");
const Swal = inject("Swal");
//VARIABLES
const id = ref(null);
const isLoading = ref(false);
const breadcrumbs = [
  { name: "Home", href: "/callcenter/dashboard", current: false },
  { name: "Rejected Cases", href: "/callcenter/users", current: false },
  { name: "Manage", href: "/callcenter/users/Manage", current: true },
];
const caseStore = useCaseStore();
const model = ref({});
//MOUNTED
onMounted(() => {
  id.value = $route.params.id;
  getCases();
});
///FORM

///FIELDS

//FUNCTIONS
const getCases = async () => {
  isLoading.value = true;
  caseStore
    .getOne(id.value)
    .then((result) => {
      model.value = result;
    })
    .catch((error) => {
      Swal.fire({
        title: "Failed",
        text: "failed to get case error (" + error + ")",
        icon: "error",
        confirmButtonText: "Ok",
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const updateCase = async (newValues) => {
  isLoading.value = true;

  caseStore
    .update(newValues.value)
    .then((result) => {
      Swal.fire({
        title: "Success",
        text: "updated case details",
        icon: "success",
      });

      eventBus.emit("CasesArchived", newValues.value.id);
    })
    .catch((error) => {
      Swal.fire({
        title: "Failed",
        text: "failed to update case (" + error + ")",
        icon: "error",
        confirmButtonText: "Ok",
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
