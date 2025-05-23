<template>
  <main>
    <spinner-widget v-bind:open="isLoading" />

    <div class="max-w-2xl mx-auto px-2 sm:px-6 lg:max-w-5xl lg:px-2">
      <div>
        <breadcrumb-widget v-bind:breadcrumbs="breadcrumbs" />
      </div>

      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="font-bold leading-7 text-[#096eb4] sm:text-2xl sm:truncate">
            Receipt Management
          </h2>
        </div>
      </div>

      <div class="flex flex-wrap justify-center md:justify-start -mx-2 mt-7">
        <div
          v-for="option in options"
          :key="option.label"
          class="tile-container p-2 md:w-1/3 lg:w-1/5"
        >
          <router-link :to="option.path" class="block">
            <div class="tile-content">
              <component :is="option.icon" class="h-6 w-6 mb-2" />
              <span class="text-center p-2">{{ option.label }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import breadcrumbWidget from "../../../components/widgets/breadcrumbs/admin.breadcrumb.vue";
import {
  ClipboardListIcon,
  TruckIcon,
  ArchiveIcon,
  ReceiptRefundIcon,
  TemplateIcon,
  HeartIcon,
  LightningBoltIcon,
  ClipboardIcon
} from "@heroicons/vue/outline";

const isLoading = ref(false);
const breadcrumbs = [
  { name: "Home", href: "/admin/dashboard", current: false },
  { name: "Receipt Management", href: "#", current: true },
];

const options = ref([
  {
    label: "Lean Season Response & Emergency Assistance Receipts",
    icon: TemplateIcon,
    path: "/admin/receipts/leanseason",
  },
  {
    label: "Emergency Response Receipts",
    icon: LightningBoltIcon,
    path: "/admin/receipts/emergency",
  },
]);
</script>

<style scoped>
.tile-container {
  display: flex;
  align-items: stretch;
}

.tile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px; /* Fixed height for consistent size */
  background-color: #096eb4;
  color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 8px; /* Added margin to match previous design */
}

.tile-content:hover {
  background-color: #4299e1;
}
</style>
