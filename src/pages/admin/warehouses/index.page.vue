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
            Warehouses
          </h2>
        </div>
        <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
          <!-- <router-link :to="{ name: 'admin-create-warehouses' }">
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
              new warehouse
            </button>
          </router-link> -->
          <create-warehouse-form v-on:create="createWarehouse" />
          
        </div>
      </div>
      <!-- table  -->


      <div class="align-middle inline-block min-w-full mt-5 shadow-xl rounded-table">
        <vue-good-table :columns="columns" :rows="warehouses" :search-options="{ enabled: true }"
          style="font-weight: bold; color: #096eb4;" :pagination-options="{ enabled: true }" theme="polar-bear"
          styleClass="vgt-table striped" compactMode>
          <template #table-actions> </template>
       
          <template #table-row="props">
            <span v-if="props.column.label == 'Options'">
              <router-link :to="{ path: '/admin/warehouse-management/manage/' + props.row.id }">
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
import createWarehouseForm from "../../../components/pages/warehouse/create.component.vue";


//SCHEMA//AND//STORES
import { usewarehousestore } from "../../../stores/warehouse.store";
//INJENCTIONS
const $router = useRouter();
const moment = inject("moment");
const Swal = inject("Swal");



//VARIABLES
const isLoading = ref(false);
const breadcrumbs = [
  { name: "Home", href: "/admin/dashboard", current: false },
  { name: "Warehouses", href: "#", current: true }
];
const warehousestore = usewarehousestore();
const warehouses = reactive([]);
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
  },
 

  {
    label: "Max Storage (MT)",
    field: row => row.MaxStorage,
    sortable: true,
    firstSortType: "asc"
  },

  {
    label: "Organisation",
    hidden: false,
    field: row => row.organisation.Name,
    sortable: true,
    firstSortType: "asc"
  },
 
  {
    label: "Options",
    field: row => row,
    sortable: false
  }
]);
//MOUNTED
onMounted(() => {
  getWarehouses();
});




//FUNCTIONS
const getWarehouses = async () => {
  isLoading.value = true;
  warehousestore
    .get()
    .then(result => {
      // for (let i = 0; i < 100; i++) {
      //   warehouses.push(...result);
      // }

      warehouses.length = 0; //empty array
      warehouses.push(...result);

   
    })
    .catch(error => {
      Swal.fire({
        title: "Warehouse Retrieval Failed",
        text: "failed to get warehouses (Please refresh to try again)",
        icon: "error",
        confirmButtonText: "Ok"
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const createWarehouse = async model => {
  isLoading.value = true;
  warehousestore
    .create(model)
    .then(result => {
      Swal.fire({
        title: "Success",
        text: "Created a new warehouse successfully",
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
      getWarehouses();
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
