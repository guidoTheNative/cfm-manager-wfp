<template>
  <main>
    <!--spinner-->
    <spinner-widget v-bind:open="isLoading" />

    <div class="max-w-2xl mx-auto px-2 sm:px-6 lg:max-w-5xl lg:px-2">
      <div>
        <breadcrumb-widget v-bind:breadcrumbs="breadcrumbs" />
      </div>
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="font-bold leading-7 text-[#096eb4] sm:text-2xl sm:truncate">
            Resource Panel
          </h2>
        </div>
      </div>

      <!-- Grouped Tiles -->
      <div v-for="group in optionGroups" :key="group.title" class="mt-2">
        <h3 class="text-lg text-[#096eb4] font-bold">{{ group.title }}</h3>
        <div class="flex flex-wrap justify-center md:justify-start -mx-2 mt-4">
          <div v-for="option in group.options" :key="option.label" class="p-2 md:w-1/3 lg:w-1/5">
            <router-link :to="option.path" class="block">
              <div class="flex flex-col items-center justify-center bg-[#096eb4] rounded-lg p-4 font-bold text-white shadow-xl cursor-pointer hover:bg-blue-400 transition m-2">
                <component :is="option.icon" class="h-6 w-6 mb-2" />
                <span>{{ option.label }}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

import breadcrumbWidget from "../../../components/widgets/breadcrumbs/admin.breadcrumb.vue";
import { 
  OfficeBuildingIcon, 
  UserGroupIcon, 
  UserIcon, 
  QuestionMarkCircleIcon,
  DocumentDownloadIcon,
  KeyIcon, 
  ArchiveIcon, 
  FolderIcon, 
  MailIcon, 
  MapIcon, 
  ScaleIcon
} from "@heroicons/vue/outline";

const isLoading = ref(false); // Example reactive state
const breadcrumbs = [
  { name: "Home", href: "/cp/dashboard", current: false },
  { name: "Resource Panel", href: "#", current: true },
];
const optionGroups = ref([
  {
    title: 'Resources',
    options: [
    /*   { label: 'Organisations', icon: OfficeBuildingIcon, path: '/organisations' },
      { label: 'User Roles', icon: UserGroupIcon, path: '/roles' },
    */   { label: 'FAQs', icon: QuestionMarkCircleIcon, path: '/cp/faqs' },
    
      { label: 'SOPs', icon: DocumentDownloadIcon, path: '/cp/sops' }
    ],
  },
 /*  {
    title: 'Reporting and Logs',
    options: [
      { label: 'Logs', icon: ArchiveIcon, path: '/logs' },
     ],
  },
  {
    title: 'Geographical and Unit Management',
    options: [
      { label: 'Districts', icon: MapIcon, path: '/districts' },
      { label: 'Units', icon: ScaleIcon, path: '/units' },
    ],
  }, */
  // Add more groups and options as needed
]);
</script>

<style>
/* Additional styles if needed */
</style>
