<template>
  <main class="">
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 font-body ">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-bold leading-6 text-gray-900 capitalize">
            Details
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Document basic details (this information will be displayed
            publicly).
          </p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form
            class=" "
            @submit="onSubmit"
            :validation-schema="UpdateListingSchema"
          >
            <div class="overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-6">
                    <label
                      for="name"
                      class="block text-sm font-bold text-gray-700"
                      >Name</label
                    >
                    <input
                      type="text"
                      name="name"
                      id="name"
                      v-model="name"
                      autocomplete="name"
                      class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    <p class="text-red-500 text-xs italic pt-1">
                      {{ nameError }}
                    </p>
                  </div>

          <!--          <div class="col-span-6 sm:col-span-6" v-if="listingTypesId !== 'TYPE3'">
                      <label
                        for="Price"
                        class="block text-sm font-bold text-gray-700"
                        >Price (MWK)</label
                      >
                      <input
                        type="number"
                        min="0"
                        name="price"
                        id="price"
                        v-model="price"
                        autocomplete="price"
                        class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
 -->

 
 <div class="col-span-6 sm:col-span-6" v-if="listingTypesId !== 'TYPE3'">
  <label
    for="location_details"
    class="block text-sm font-bold text-gray-700"
    >Short Description</label
  >
  <input
    type="text"
    name="location_details"
    id="location_details"
    v-model="short_desc"
    autocomplete="location_details"
    class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
  />
</div>
                    
                  <div class="col-span-6 sm:col-span-6" v-if="listingTypesId !== 'TYPE3'">
                    <label
                      for="description"
                      class="block text-sm font-bold text-gray-700"
                    >
                      Description
                    </label>
                    <div class="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        v-model="description"
                        rows="3"
                        class="shadow-sm focus:ring-gray-500 focus:border-blue-300 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder=""
                      />
                    </div>
                    <p class="mt-2 text-sm text-gray-500">
                      Brief description of this catalogue.
                    </p>
                    <p class="text-red-500 text-xs italic pt-1">
                      {{ descriptionError }}
                    </p>
                  </div>


                  <!-- <div class="col-span-6 sm:col-span-4">
                    <label
                      for="publication-datee"
                      class="block text-sm font-bold text-gray-700"
                      >Publication date</label
                    >

                    <input
                      type="date"
                      name="publication-date"
                      id="publication-date"
                      v-model="publicationDate"
                      autocomplete="publication-date"
                      class="mt-1 focus:ring-gray-500 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div> -->

                 <!--  <div class="flex my-0" v-if="listingTypesId !== 'TYPE3'">
                    <input
                      id="status"
                      name="status"
                      v-model="status"
                      type="checkbox"
                      style="color: gray"
                      class="h-4 w-4 focus:ring-gray-500 border-gray-300 rounded"
                    />
                    <label for="status" class="inline text-sm text-gray-900">
                      Available
                    </label>
                  </div>
 -->

                <!--   <div class="flex my-0" v-if="listingTypesId !== 'TYPE3'">
                    <input
                      id="status"
                      name="status"
                      v-model="is_event"
                      type="checkbox"
                      style="color: gray"
                      class="h-4 w-4 focus:ring-gray-500 border-gray-300 rounded"
                    />
                    <label for="status" class="inline text-sm text-gray-900">
                      Event
                    </label>
                  </div> -->

                </div>
              </div>
              <div class="px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-gray-500 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { inject, ref, watch, reactive, onMounted, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useForm, useField, useSubmitForm, useIsFormValid } from "vee-validate";
//COMPONENTS
import { UpdateListingSchema } from "../../../services/schema/catalogue.schema";
import { useSessionStore } from "../../../stores/session.store";
//INJENCTIONS
const $router = useRouter();
const $route = useRoute();
const moment = inject("moment");
const Swal = inject("Swal");
const props = defineProps({
  model: Object,
});
//VARIABLES
const emit = defineEmits(["update"]);
const isLoading = ref(false);

const isFeatured = ref(false);
const open = ref(false);
const isPwd = ref(true);
const showModal = ref(false);
const roles = reactive([]);
const { model } = toRefs(props);

const sessionStore = useSessionStore();

const user = ref(sessionStore.getUser);
//FORM

const { meta } = useForm({
  validationSchema: UpdateListingSchema,
});
///FIELDS
const { value: name, errorMessage: nameError } = useField("name");
const { value: description, errorMessage: descriptionError } =
  useField("description");
const { value: short_desc, errorMessage: short_descError } = useField("short_desc");
const { value: from, errorMessage: fromError } =
  useField("from");
const { value: to, errorMessage:toError } = useField("to");


//MOUNTED
onMounted(() => {
  //Assign
  name.value = model.value.name;
  from.value = model.value.from;
  to.value = model.value.to;
  short_desc.value = model.value.short_desc;
  description.value = model.value.description;
});
//WATCH
//FUNCTIONS
const onSubmit = useSubmitForm((values, actions) => {
  let newValues = {
    id: model.value.id,
    name: name.value,
    from: from.value,
    to: to.value,
    short_desc: short_desc.value,
    description: description.value,
    
  };
  emit("update", newValues);
});




</script>
