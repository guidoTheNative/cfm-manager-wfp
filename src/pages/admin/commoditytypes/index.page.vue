<template>
  <main class="">
    <!--spinner-->
    <spinner-widget v-bind:open="isLoading" />
    <div class="max-w-2xl mx-auto px-2 sm:px-6 lg:max-w-5xl lg:px-2">
      <div>
        <breadcrumb-widget v-bind:breadcrumbs="breadcrumbs" />
      </div>
      <div class=" md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="
              font-bold
              leading-7
              text-[#096eb4]
              sm:text-2xl sm:truncate
            ">
            Commodity Types
          </h2>
        </div>
        <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
          <!-- <router-link :to="{ name: 'admin-create-users' }">
            <button
              type="button"
              class="
                ml-3
                inline-flex
                items-center
                px-4
                py-2
                border border-transparent
                rounded
                shadow-sm
                text-sm
                font-bold
                text-white
                bg-blue-400
                hover:bg-blue-400
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-blue-400
                capitalize
              "
            >
              new commodity type
            </button>
          </router-link> -->
          <create-commodity-form v-on:create="createCommodityType" />

        </div>
      </div>
      <!-- table  -->


      <div class="align-middle inline-block min-w-full mt-5 shadow-xl rounded-table">
        <vue-good-table :columns="columns" :rows="users" :search-options="{ enabled: true }"
          style="font-weight: bold; color: #096eb4;" :pagination-options="{ enabled: true }" theme="polar-bear"
          styleClass="vgt-table striped" compactMode>
          <template #table-actions> </template>

          <template #table-row="props">
            <span v-if="props.column.label == 'Options'">
              <router-link :to="{ path: '/admin/commodity-types/manage/' + props.row.id }">
                <a href="#" class="text-[#096eb4] text-sm hover:text-green-900">Manage </a>
              </router-link>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
  </main>
</template>

<script setup>
// import the styles

import { inject, ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/vue/solid";
//COMPONENTS
import spinnerWidget from "../../../components/widgets/spinners/default.spinner.vue";
import breadcrumbWidget from "../../../components/widgets/breadcrumbs/admin.breadcrumb.vue";
import createCommodityForm from "../../../components/pages/commodity-types/create.component.vue";


//SCHEMA//AND//STORES
import { usecommoditytypestore } from "../../../stores/commodity-type.store";
//INJENCTIONS
const $router = useRouter();
const moment = inject("moment");
const Swal = inject("Swal");



//VARIABLES
const isLoading = ref(false);
const breadcrumbs = [
  { name: "Home", href: "/admin/dashboard", current: false },
  { name: "Commodity Types", href: "#", current: true }
];
const CommodityTypeStore = usecommoditytypestore();
const users = reactive([]);
const columns = ref([

  {
    label: "#",
    field: (row) => row.originalIndex + 1,
    sortable: true,
    firstSortType: "asc",
    tdClass: "capitalize"
  },
  {
    label: "Name",
    field: row => row.Name,
    sortable: true,
    firstSortType: "asc",
    tdClass: "capitalize"
  }
  ,
  {
    label: "Options",
    field: row => row,
    sortable: false
  }

]);
//MOUNTED
onMounted(() => {
  getOrganisations();
});




//FUNCTIONS
const getOrganisations = async () => {
  isLoading.value = true;
  CommodityTypeStore
    .get()
    .then(result => {
      // for (let i = 0; i < 100; i++) {
      //   users.push(...result);
      // }

      users.length = 0; //empty array
      users.push(...result);

      users.sort((a, b) => new Date(b.created) - new Date(a.created));

    })
    .catch(error => {
      Swal.fire({
        title: "Organisation Retrieval Failed",
        text: "failed to get organisations (Please refresh to try again)",
        icon: "error",
        confirmButtonText: "Ok"
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const createCommodityType = async model => {
  isLoading.value = true;
  CommodityTypeStore
    .create(model)
    .then(result => {
      Swal.fire({
        title: "Success",
        text: "Created a new commodity type successfully",
        icon: "success",
        confirmButtonText: "Ok"
      });
    })
    .catch(error => {
      /*  Swal.fire({
         title: "Failed",
         text: "failed to get create user (" + error + ")",
         icon: "error",
         confirmButtonText: "Ok"
       }); */
    })
    .finally(() => {
      isLoading.value = false;
      getOrganisations();
    });
};
</script>

<style>
.rounded-table {
  border-radius: 10px;
  /* Adjust the radius as needed */
  overflow: hidden;
  /* This is important to apply rounded corners to child elements */
}
</style>
