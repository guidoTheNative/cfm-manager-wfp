<template>
    <div class="flex justify-between items-center my-2 mt-3 text-sm">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-2 py-1 text-xs text-gray-800 rounded-md hover:text-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed transition duration-150"
      >
        &larr;
        <!-- Left Arrow -->
      </button>
      <span class="text-gray-400">{{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-2 py-1 text-xs text-gray-800 rounded-md hover:text-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed transition duration-150"
      >
        &rarr;
        <!-- Right Arrow -->
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    onNextPage: {
      type: Function,
      required: true,
    },
    onPrevPage: {
      type: Function,
      required: true,
    },
  });
  
  const nextPage = () => props.onNextPage();
  const prevPage = () => props.onPrevPage();
  </script>
  