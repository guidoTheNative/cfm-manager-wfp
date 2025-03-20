<template>
  <main class="space-y-2">
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Documents</h3>
          <p class="mt-1 text-sm text-gray-500">SOP documents</p>
        </div>

        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="overflow-x-auto">
            <table class="min-w-full border-collapse border border-gray-300 rounded-md">
              <thead class="bg-gray-200">
                <tr>
                  <th class="px-4 py-2 text-left border border-gray-300">File Name</th>
                  <th class="px-4 py-2 text-left border border-gray-300">File Type</th>
                  <th class="px-4 py-2 text-center border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(file, index) in files" :key="file.id" class="border-b">
                  <td class="px-4 py-2 text-gray-900 border border-gray-300">
                    <span class="text-gray-700 font-medium">{{ file.name }}</span>
                  </td>
                  <td class="px-4 py-2 text-gray-900 border border-gray-300">
                    {{ getFileType(file.mimetype) }}
                  </td>
                  <td class="px-4 py-2 text-center border border-gray-300">
                    <button
                      @click="downloadFromUrl(system.api + '/files/download/' + file.url, file.url.split('.').pop(), file.name)"
                      class="text-blue-600 hover:underline mr-3"
                    >
                      Download
                    </button>
                  
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { inject, ref, reactive, onMounted } from "vue";
import * as FileSaver from "file-saver";
import { useFileStore } from "../../../stores/file.store";

const system = reactive({
  api: process.env.VUE_APP_ROOT_API,
});

const fileStore = useFileStore();
const props = defineProps({ model: Object });
const emit = defineEmits(["update"]);
const open = ref(false);
const files = reactive([]);
const fileName = ref(""); // User-defined file name
const attachments = ref([]); // Multiple files

onMounted(() => {
  getFiles();
});

// Handle file selection
const handleFileUpload = (e) => {
  attachments.value = Array.from(e.target.files);
};

// Fetch files
const getFiles = async () => {
  fileStore
    .getByReference({ id: props.model.id, type: "SOP" })
    .then((result) => {
      files.length = 0;
      files.push(...result);
    })
    .catch(() => {})
    .finally(() => {});
};

// Upload files
const onSubmit = async () => {
  if (!attachments.value.length || !fileName.value.trim()) {
    return alert("Please provide a file name and select at least one file.");
  }

  for (const file of attachments.value) {
    const data = {
      attachment: file,
      referenceId: props.model.id,
      type: "SOP",
      name: fileName.value, // Use user-defined name
      metadata: {
        publicationDate: new Date().toISOString().split("T")[0],
      },
    };

    await fileStore.upload(data);
  }

  open.value = false;
  fileName.value = "";
  attachments.value = [];
  getFiles();
};

// Get simple file type from mimetype
const getFileType = (mimetype) => {
  const typeMap = {
    "application/pdf": "PDF",
    "application/msword": "DOC",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
    "application/vnd.ms-excel": "XLS",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
    "text/plain": "TXT",
    "application/vnd.ms-powerpoint": "PPT",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": "PPTX",
  };

  return typeMap[mimetype] || "Unknown";
};

// Download file
const downloadFromUrl = (url, ext, title) => {
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      // Normalize extension
      let normalizedExt = ext.toLowerCase() === "sheet" ? "xlsx" : ext.toLowerCase();

      // Define correct MIME types
      const mimeTypes = {
        pdf: "application/pdf",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        xls: "application/vnd.ms-excel",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        txt: "text/plain",
        ppt: "application/vnd.ms-powerpoint",
        pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      };

      // Get MIME type based on the normalized extension
      const mimeType = mimeTypes[normalizedExt] || "application/octet-stream";

      // Create a Blob with the correct MIME type
      const fileBlob = new Blob([blob], { type: mimeType });

      // Download file with the correct format
      FileSaver.saveAs(URL.createObjectURL(fileBlob), `${title}.${normalizedExt}`);
    })
    .catch((error) => console.error("Download failed:", error));
};


// Delete file
const remove = async (id) => {
  await fileStore.remove(id);
  getFiles();
};
</script>
