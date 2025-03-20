<template>
  <main class="font-bold">
    <!-- Spinner -->
    <spinner-widget v-bind:open="isLoading" />

    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <breadcrumb-widget v-bind:breadcrumbs="breadcrumbs" />

      <div class="mt-2 md:flex md:items-center md:justify-between mb-3">
        <div class="flex-1 min-w-0">
          <h2 class="font-bold leading-7 text-blue-400 sm:text-2xl sm:truncate">
            Create FAQs
          </h2>
        </div>
      </div>

      <!-- FAQ Creation Form -->
      <div class="bg-white shadow-0 rounded-lg p-6">
        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-12 gap-4">
            <!-- Question -->
            <div class="col-span-6 sm:col-span-3">
              <label
                for="question"
                class="block text-sm font-medium text-gray-700"
              >
                Question
              </label>
              <input
                id="question"
                type="text"
                v-model="form.question"
                class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-gray-300 sm:text-sm"
              />
            </div>

            <!-- Answer -->
            <div class="col-span-12 sm:col-span-12">
              <label
                for="Answer"
                class="block text-sm font-medium text-gray-700"
              >
                Answer
              </label>
              <textarea
                id="Answer"
                v-model="form.answer"
                class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-gray-500 focus:border-gray-300 sm:text-sm"
              />
            </div>
          </div>

          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-2">
            <button
              type="submit"
              class="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight rounded shadow-0"
              :class="
                isEditing
                  ? 'bg-gray-500 hover:bg-gray-700'
                  : 'bg-gray-500 hover:bg-gray-700'
              "
              :disabled="!form.question || !form.answer"
            >
              {{ isEditing ? "Update FAQ" : "Save FAQ" }}
            </button>

            <button
              v-if="isEditing"
              type="button"
              class="inline-block px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-xs leading-tight rounded shadow-0"
              @click="cancelEdit"
            >
              Cancel Edit
            </button>
          </div>
        </form>
      </div>

      <!-- FAQ List with Pagination -->
      <div class="mt-6 bg-white shadow-0 rounded-lg p-6">
        <h2 class="font-bold leading-7 text-blue-400 sm:text-2xl sm:truncate">
          FAQ List
        </h2>

        <div class="mt-4 space-y-2">
          <div
            v-for="(faq, index) in paginatedFaqs"
            :key="faq.id"
            class="border border-gray-300 rounded-lg overflow-hidden"
          >
            <button
              @click="toggleAccordion(index)"
              class="w-full text-left px-4 py-2 bg-gray-100 text-gray-700 font-medium flex justify-between items-center"
            >
              <!-- Left-Aligned Text -->
              <div class="flex-1">
                <span class="font-bold"
                  >Question {{ startNumber + index }}:
                </span>
                <span class="text-italic font-italic">{{ faq.question }}</span>
              </div>

              <!-- Icons on the Far Right -->
              <div class="flex items-center space-x-3">
                <!-- Edit Icon -->
                <button
                  @click.stop="editFAQ(faq)"
                  class="text-gray-500 hover:text-gray-700"
                >
                  <PencilIcon class="w-5 h-5" />
                </button>

                <!-- Delete Icon -->
                <button
                  @click.stop="deleteFAQ(faq.id)"
                  class="text-red-500 hover:text-red-700"
                >
                  <TrashIcon class="w-5 h-5" />
                </button>

                <!-- Accordion Toggle -->
                <!-- Accordion Toggle Button with Heroicons -->
                <button @click.stop="toggleAccordion(index)">
                  <component
                    :is="
                      activeIndex === index ? ChevronUpIcon : ChevronDownIcon
                    "
                    class="w-5 h-5 text-gray-500"
                  />
                </button>
              </div>
            </button>

            <div v-if="activeIndex === index" class="p-4 border-t text-left">
              <p class="text-gray-600">
                <span class="font-bold">Answer:</span> {{ faq.answer }}
              </p>
            </div>
          </div>

          <p v-if="faqList.length === 0" class="text-gray-500 text-center mt-4">
            No FAQs added yet.
          </p>
        </div>

        <!-- Pagination Controls -->
        <div class="mt-4 flex justify-between" v-if="faqList.length > 0">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 flex items-center"
          >
            <ChevronLeftIcon class="w-5 h-5" />
          </button>
          <span class="text-gray-700"
            >Page {{ currentPage }} of {{ totalPages }}</span
          >
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 flex items-center"
          >
            <ChevronRightIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, inject, onMounted, computed } from "vue";
import { usefaqstore } from "../../../stores/faq.store";
import {
  TrashIcon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/vue/solid";
const Swal = inject("Swal");

const faqStore = usefaqstore();
const faqList = ref([]);
const activeIndex = ref(null);
const isEditing = ref(false);
const editingFAQId = ref(null);

// Pagination State
const currentPage = ref(1);
const itemsPerPage = 5;

const form = ref({
  question: "",
  answer: "",
});

onMounted(() => {
  getFaqs();
});

const toggleAccordion = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const getFaqs = async () => {
  faqStore
    .get()
    .then((result) => {
      faqList.value = result;
    })
    .catch((error) => {
      console.error(error);
    });
};

const paginatedFaqs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return faqList.value.slice(start, end);
});

const startNumber = computed(() => {
  return (currentPage.value - 1) * itemsPerPage + 1;
});

const totalPages = computed(() => {
  return Math.ceil(faqList.value.length / itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const submitForm = async () => {
  if (!form.value.question || !form.value.answer) {
    Swal.fire({
      title: "Failed",
      text: "Please fill out both fields.",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return;
  }

  if (isEditing.value) {
    const index = faqList.value.findIndex(
      (faq) => faq.id === editingFAQId.value
    );
    if (index !== -1) {
      faqList.value[index].question = form.value.question;
      faqList.value[index].answer = form.value.answer;
    }

    faqStore
      .update(faqList.value[index])
      .then((result) => {
        Swal.fire({
          title: "Success",
          text: "updated FAQ details",
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Failed",
          text: "failed to update FAQ (" + error + ")",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  } else {
    const newFAQ = {
      question: form.value.question,
      answer: form.value.answer,
    };
    faqList.value.push(newFAQ);

    try {
      await faqStore.create(newFAQ);
      Swal.fire({
        title: "Success",
        text: "Created a new FAQ successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: "Failed to create FAQ (" + error + ")",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }

  resetForm();
};

const editFAQ = (faq) => {
  form.value.question = faq.question;
  form.value.answer = faq.answer;
  isEditing.value = true;
  editingFAQId.value = faq.id;
};

const cancelEdit = () => {
  resetForm(); // Reset the form and state
};

const deleteFAQ = async (id) => {
  faqStore
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
          Swal.fire("Deleted!", "Deleted user succesfully.", "success");
          getFaqs();
        }
      });
    })
    .catch((error) => {
      Swal.fire({
        title: "Failed",
        text: "failed to remove FAQ  (" + error + ")",
        icon: "error",
        confirmButtonText: "Ok",
      });
    });
};

const resetForm = () => {
  form.value.question = "";
  form.value.answer = "";
  isEditing.value = false;
  editingFAQId.value = null;
};
</script>
