<template>
  <main class="space-y-2">
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-bold leading-6 text-gray-900">Documents</h3>
          <p class="mt-1 text-sm text-gray-500">
            Upload and manage proof documents
          </p>
        </div>

        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="overflow-x-auto">
            <table
              class="min-w-full border-collapse border border-gray-300 rounded-md"
            >
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-2 text-left border border-gray-300">
                    File Name
                  </th>
                  <th class="px-4 py-2 text-left border border-gray-300">
                    File Type
                  </th>
                  <th class="px-4 py-2 text-center border border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(file, index) in files"
                  :key="file.id"
                  class="border-b"
                >
                  <td class="px-4 py-2 text-gray-900 border border-gray-300">
                    <span class="text-gray-700 font-bold">{{ file.name }}</span>
                  </td>
                  <td class="px-4 py-2 text-gray-900 border border-gray-300">
                    {{ getFileType(file.mimetype) }}
                  </td>
                  <td class="px-4 py-2 text-center border border-gray-300">
                    <button
                      @click="
                        downloadFromUrl(
                          system.api + '/files/download/' + file.url,
                          file.url.split('.').pop(),
                          file.name
                        )
                      "
                      class="text-blue-600 hover:underline mr-3"
                    >
                      Download
                    </button>
                    <button
                      @click="remove(file.id)"
                       v-if="!isedit"
                      class="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="px-4 text-right sm:px-6 pt-2"  v-if="!isedit">
            <button
              v-show="!open"
              @click="open = true"
              type="button"
              class="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-gray-500 hover:bg-gray-600"
            >
              Add Proof
            </button>
          </div>

          <div v-show="open" class="mt-4 p-4 bg-gray-50 rounded-lg">
            <form @submit.prevent="onSubmit" enctype="multipart/form-data">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6">
                  <label class="block text-sm font-bold text-gray-700"
                    >File Name</label
                  >
                  <input
                    type="text"
                    v-model="fileName"
                    placeholder="Enter file name"
                    class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div class="col-span-6">
                  <label class="block text-sm font-bold text-gray-700"
                    >Select Files</label
                  >
                  <input
                    type="file"
                    multiple
                    @change="handleFileUpload"
                    accept=".pdf,.docx,.xlsx,.txt,.pptx"
                    class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                  <p
                    class="text-red-500 text-xs italic pt-1"
                    v-if="attachmentError"
                  >
                    {{ attachmentError }}
                  </p>
                </div>
              </div>

              <div class="mt-4 text-right">
                <button
                  type="submit"
                  class="py-2 px-4 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-gray-500 hover:bg-gray-600"
                >
                  Upload Files
                </button>
                <button
                  type="button"
                  @click="open = false"
                  class="ml-2 py-2 px-4 border border-gray-300 shadow-sm text-sm font-bold rounded-md bg-white hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
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
const props = defineProps({ model: Object, caseId: String, isedit: Boolean });
const emit = defineEmits(["update"]);
const open = ref(false);
const files = reactive([]);
const fileName = ref(""); // User-defined file name
const attachments = ref([]); // Multiple files
const attachmentError = ref("");
onMounted(() => {
  getFiles();
});

// Handle file selection
const handleFileUpload = (e) => {
  attachments.value = Array.from(e.target.files);
};

// Fetch files
const getFiles = async () => {
  console.log("Fetching files for case ID:", props.caseId);
  fileStore
    .getByReference({ id: props.caseId, type: "P1-PROOFS" })
    .then((result) => {
      files.length = 0;
      files.push(...result);
    })
    .catch(() => {})
    .finally(() => {});
};

// Upload files
const onSubmit = async () => {
  console.log("Uploading files:", props.caseId);
  if (!props.caseId) {
    attachmentError.value =
      "Please save the case first before uploading files.";
    return;
  }

  if (!attachments.value.length || !fileName.value.trim()) {
    return alert("Please provide a file name and select at least one file.");
  }

  for (const file of attachments.value) {
    const data = {
      attachment: file,
      referenceId: props.caseId,
      type: "P1-PROOFS",
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
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "application/vnd.ms-excel": "XLS",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
    "text/plain": "TXT",
    "application/vnd.ms-powerpoint": "PPT",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      "PPTX",
  };

  return typeMap[mimetype] || "Unknown";
};

// Download file
const downloadFromUrl = (url, ext, title) => {
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      // Normalize extension
      let normalizedExt =
        ext.toLowerCase() === "sheet" ? "xlsx" : ext.toLowerCase();

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
      FileSaver.saveAs(
        URL.createObjectURL(fileBlob),
        `${title}.${normalizedExt}`
      );
    })
    .catch((error) => console.error("Download failed:", error));
};

// Delete file
const remove = async (id) => {
  await fileStore.remove(id);
  getFiles();
};
</script>
