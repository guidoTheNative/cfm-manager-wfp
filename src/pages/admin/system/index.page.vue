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
            System Management Panel
          </h2>
        </div>
      </div>

    

      <!-- Grouped Tiles -->
      <div v-for="group in optionGroups" :key="group.title" class="mt-4">
        <h3 class="text-lg text-[#096eb4] font-bold">{{ group.title }}</h3>
        <div class="flex flex-wrap justify-center md:justify-start -mx-2 mt-4">
          <div v-for="option in group.options" :key="option.label" class="p-2 md:w-1/3 lg:w-1/5">
            <router-link :to="option.path" class="block">
              <div
                class="flex flex-col items-center justify-center bg-[#096eb4] rounded-lg p-4 text-white font-bold text-sm shadow-xl cursor-pointer hover:bg-blue-400 transition m-2">
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
  QuestionMarkCircleIcon,
  ClipboardListIcon,
  UserIcon,
  KeyIcon,
  ArchiveIcon,
  FolderIcon,
  ClipboardDocumentCheckIcon,
  TrendingUpIcon,
  TruckIcon,
  MailIcon,
  BellIcon,
  DocumentDownloadIcon,
  DocumentIcon,
  ChartBarIcon,
  MapIcon,
  ScaleIcon
} from "@heroicons/vue/outline";
import { DocumentTextIcon } from '@heroicons/vue/solid';

const isLoading = ref(false); // Example reactive state
const breadcrumbs = [
  { name: "Home", href: "/admin/dashboard", current: false },
  { name: "System Management Panel", href: "#", current: true },
];
const optionGroups = ref([
  {
    title: 'User Management',
    options: [
    /*   { label: 'Organisations', icon: OfficeBuildingIcon, path: '/admin/organisations' },
     */  { label: 'User Roles', icon: UserGroupIcon, path: '/admin/userroles' },
      { label: 'Users', icon: UserIcon, path: '/admin/users' },
     /*  { label: 'Performance Stats', icon: ChartBarIcon, path: '/admin/performance-stats' }, // Change to ChartBarIcon
   
      { label: 'Reminders', icon: BellIcon, path: '/admin/reminders' }, // Change to BellIcon
      { label: 'Mailing Groups', icon: MailIcon, path: '/admin/mailinggroups' }, // Change to BellIcon
 */    
    ],
  },


  {
    title: 'Case Management',
    options: [
    /*   { label: 'Organisations', icon: OfficeBuildingIcon, path: '/admin/organisations' },
     */  { label: 'CFM Cases', icon: DocumentIcon, path: '/admin/cases' },
     { label: 'Process Monitoring', icon: ClipboardListIcon, path: '/admin/process' },
      /*  { label: 'Performance Stats', icon: ChartBarIcon, path: '/admin/performance-stats' }, // Change to ChartBarIcon
   
      { label: 'Reminders', icon: BellIcon, path: '/admin/reminders' }, // Change to BellIcon
      { label: 'Mailing Groups', icon: MailIcon, path: '/admin/mailinggroups' }, // Change to BellIcon
 */     { label: 'FAQs', icon: QuestionMarkCircleIcon, path: '/admin/faqs' },
 { label: 'SOPs', icon: DocumentDownloadIcon, path: '/admin/sops' },
    ],
  },
 
/* 
  {
    title: 'Commodity Management',
    options: [
    { label: 'Activities', icon: KeyIcon, path: '/admin/activity-management' },
    { label: 'User Dispatches', icon: TruckIcon, path: '/admin/user-dispatches' },
   
      
    { label: 'Stock Register', icon: ClipboardListIcon, path: '/admin/stock-management' },
    { label: 'Warehouses', icon: OfficeBuildingIcon, path: '/admin/warehouse-management' },
    { label: 'Transporters', icon: TruckIcon, path: '/admin/transporter-management' },
   
      { label: 'Commodities', icon: MapIcon, path: '/admin/commodity-management' },
      { label: 'Commodity Types', icon: ScaleIcon, path: '/admin/commodity-types' },
      { label: 'Receipts', icon: DocumentTextIcon, path: '/admin/receipts' },
   
    ],
  }, */


  {
    title: 'Reporting and Logs',
    options: [
      { label: 'Logs', icon: ArchiveIcon, path: '/admin/logs' },
   /*    { label: 'Usage Stats', icon: TrendingUpIcon, path: '/admin/usage-stats' }, // Change to ChartBarIcon
   */
    ],
  },
  // Add more groups and options as needed
]);
</script>

<style>
/* Additional styles if needed */
</style>
