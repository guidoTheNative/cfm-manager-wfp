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
          <h2 class="font-bold leading-7 text-blue-400 sm:text-2xl sm:truncate">
            About System
          </h2>
        </div>
      </div>

      <!-- Grouped Tiles -->
      <div class="py-4">
        <div class="max-w-3xl mx-auto sm:px-1 lg:max-w-7xl lg:px-1 lg:grid lg:grid-cols-12 lg:gap-5">
          <!-- Page Content -->
          <div class="lg:col-span-12 xl:col-span-12 bg-white p-8 rounded-lg shadow-lg">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">About the System</h2>
            <p class="text-gray-700 mb-4">The WFP Case Tracker system was developed by the World Food Programme (WFP) to improve the management and response to community feedback during food assistance programs. This system is designed to efficiently track and resolve feedback cases raised by beneficiaries, ensuring transparency and accountability in WFP operations.</p>
            <p class="text-gray-700 mb-4">The CFM system enhances the visibility and traceability of feedback cases, enabling WFP to act quickly on beneficiary concerns and improve program effectiveness. By leveraging technology, the system supports better decision-making and promotes community engagement throughout the project lifecycle.</p>
            <p class="text-gray-700">For more information, please contact the WFP Malawi Country Office or the WFP M&E team.</p>
            <div class="flex justify-center mt-8">
              <img class="img-fluid mx-2" style="height: 100px;" src="../../assets/images/wfp-logo.png" alt="WFP Logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

import breadcrumbWidget from "../../components/widgets/breadcrumbs/admin.breadcrumb.vue";
import { 
  OfficeBuildingIcon, 
  UserGroupIcon, 
  UserIcon, 
  KeyIcon, 
  ArchiveIcon, 
  FolderIcon, 
  MailIcon, 
  MapIcon, 
  ScaleIcon
} from "@heroicons/vue/outline";

const isLoading = ref(false); // Example reactive state
const breadcrumbs = [
  { name: "Home", href: "/callcenter/dashboard", current: false },
  { name: "WFP CASE TRACKER v1.0", href: "#", current: true },
];
const optionGroups = ref([
  {
    title: 'Organizational Management',
    options: [
    /*   { label: 'Organisations', icon: OfficeBuildingIcon, path: '/organisations' },
      { label: 'User Roles', icon: UserGroupIcon, path: '/roles' },
    */   { label: 'Users', icon: UserIcon, path: '/admin/users' },
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
