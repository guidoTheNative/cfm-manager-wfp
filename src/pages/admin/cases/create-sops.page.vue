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
          <h2 class="font-bold leading-7 text-blue-400 sm:text-2xl sm:truncate">
            Create SOP
          </h2>
        </div>
        <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4"></div>
      </div>
      <!-- tabs -->
      <div class="align-middle inline-block min-w-full">
        <div class="tab-content" id="tabs-case-options">
          <div
            class="tab-pane fade show active"
            id="case-settings"
            role="tabpanel"
            aria-labelledby="tabs-case-settings"
          >
            <div class="bg-white">
              <!-- Form -->
              <sop-file-component :model="files"></sop-file-component>
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
import { ref, inject, reactive, onMounted, computed } from "vue";
import { useSessionStore } from "../../../stores/session.store";
const Swal = inject("Swal");

import breadcrumbWidget from "../../../components/widgets/breadcrumbs/admin.breadcrumb.vue";
import sopFileComponent from "../../../components/pages/cases/file.component.vue";

import { useFileStore } from "../../../stores/file.store";
const fileStore = useFileStore();

const sessionStore = useSessionStore();
const user = ref(sessionStore.getUser);
const moment = inject("moment");


const cases = reactive([]);
const files = reactive([]);
const emit = defineEmits(["create"]);
const open = ref(false);
const roles = [
  { id: "ADMIN1", name: "Admin 1" },
  { id: "ADMIN2", name: "Admin 2" },
  // Add other roles...
];
const breadcrumbs = [
  { name: "Home", href: "/admin/dashboard", current: false },
  { name: "SOP", href: "#", current: true },
  { name: "Create", href: "#", current: true },
];
const priorities = [
  { id: "High", name: "High" },
  { id: "Medium", name: "Medium" },
  { id: "Low", name: "Low" },
];

onMounted(() => {
  getFiles();
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
</script>
