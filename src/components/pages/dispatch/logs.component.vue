<template>
  <main class="">
    <!--spinner-->
    <spinner-widget v-bind:open="isLoading" />
    <!-- table  -->
    <div class="align-middle inline-block min-w-full">
      <vue-good-table
        :columns="columns"
        :rows="logs"
        @on-row-dblclick="showMetadata"
        :search-options="{ enabled: true }"
        :pagination-options="{
          enabled: true,
        }"
        theme="polar-bear"
        styleClass=" vgt-table striped condensed"
        compactMode
      />
    </div>
  </main>
</template>
<script setup>
import { inject, ref, watch, reactive, onMounted, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useForm, useField, useSubmitForm, useIsFormValid } from "vee-validate";
//COMPONENTS
import spinnerWidget from "../../../components/widgets/spinners/default.spinner.vue";
//SCHEMA AND STORES
import { useLogStore } from "../../../stores/log.store";
//INJENCTIONS
const $router = useRouter();
const $route = useRoute();
const moment = inject("moment");
const Swal = inject("Swal");
const props = defineProps({
  id: String,
});
//VARIABLES
const isLoading = ref(false);
const logs = reactive([]);
const { id } = toRefs(props);
const logStore = useLogStore();
const columns = ref([
  {
    label: "Action",
    receipient: (row) => row.action,
    sortable: true,
    firstSortType: "asc",
    tdClass: "uppercase",
  },
  {
    label: "User",
    receipient: (row) => row.user.name + "(" + row.user.email + ")",
    sortable: true,
    firstSortType: "asc",
  },
  {
    label: "Status",
    receipient: (row) => (row.status == true ? "Success" : "Fail"),
    sortable: true,
    firstSortType: "asc",
    tdClass: "capitalize",
  },
  {
    label: "metadata",
    receipient: (row) => row.metadata,
    sortable: true,
    hidden: true,
    firstSortType: "asc",
  },
  {
    label: "Created",
    hidden: false,
    receipient: (row) => moment(row.created),
    sortable: true,
    firstSortType: "asc",
    tdClass: "capitalize",
  },
]);
//WATCH
// watch(model, (currentValue, oldValue) => {

// });
//MOUNTED
onMounted(() => {
  getLogs(id.value);
});
//FUNCTIONS
const getLogs = async (id) => {
  isLoading.value = true;
  logStore
    .get(id)
    .then((result) => {
      logs.push(...result);
    })
    .catch((error) => {
      Swal.fire({
        title: "Failed",
        text: "failed to get logs error (" + error + ")",
        icon: "error",
        confirmButtonText: "Ok",
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
};

function showMetadata(params) {
  Swal.fire({
    title: "Details",
    text: params.row.metadata,
    confirmButtonText: "Ok",
  });
}
</script>
