import { defineStore } from "pinia";
import ProcessService from "../services/api/process.service";
import { useSessionStore } from "./session.store";
const processService = new ProcessService();

const sessionStore = useSessionStore();
export const useProcessStore = defineStore({
  id: "process",
  state: () => ({
    cases: [],
  }),
  getters: {},
  actions: {
    async get() {
      return await processService
        .get()
        .then((result) => {
          if (result) {
            var response = result.filter((item) => {
              return item.id != sessionStore.getUser.id;
            });
            response = response.filter((item) => {
              return item.name !== "administrator";
            });
            return response;
          }
        })
        .catch((error) => {
          switch (error.statusCode) {
            default:
              throw error.message;
          }
        });
    },

    

    async getfieldofficerSummary() {
      return await processService
        .getfieldofficerSummary()
        .then((result) => {
          if (result) {
            var response = result;
            return response;
          }
        })
        .catch((error) => {
          switch (error.statusCode) {
            default:
              throw error.message;
          }
        });
    },


    async getfieldofficerDistrictSummary(district) {
      return await processService
        .getfieldofficerDistrictSummary(district)
        .then((result) => {
          if (result) {
            var response = result;
            return response;
          }
        })
        .catch((error) => {
          switch (error.statusCode) {
            default:
              throw error.message;
          }
        });
    },

    async getadminofficerSummary() {
      return await processService
        .getadminofficerSummary()
        .then((result) => {
          if (result) {
            var response = result;
            return response;
          }
        })
        .catch((error) => {
          switch (error.statusCode) {
            default:
              throw error.message;
          }
        });
    },

    async getpseaofficerSummary() {
      return await processService
        .getpseaofficerSummary()
        .then((result) => {
          if (result) {
            var response = result;
            return response;
          }
        })
        .catch((error) => {
          switch (error.statusCode) {
            default:
              throw error.message;
          }
        });
    },

    async getactivityofficerSummary() {
      return await processService
        .getactivityofficerSummary()
        .then((result) => {
          if (result) {
            var response = result;
            return response;
          }
        })
        .catch((error) => {
          switch (error.statusCode) {
            default:
              throw error.message;
          }
        });
    },

    async getCallcenterSummary() {
      return await processService
        .getCallcenterSummary()
        .then((result) => {
          if (result) {
            var response = result;
            return response;
          }
        })
        .catch((error) => {
          switch (error.statusCode) {
            default:
              throw error.message;
          }
        });
    },

    async getProviders() {
      return await processService
        .getProviders()
        .then((result) => {
          return result;
        })
        .catch((error) => {
          switch (error.statusCode) {
            default:
              throw error.message;
          }
        });
    },

    async getOne(id) {
      return await processService
        .get(id)
        .then((result) => {
          if (result) {
            return result;
          }
        })
        .catch((error) => {
          switch (error.statusCode) {
            default:
              throw error.message;
          }
        });
    },
    async create(data) {
      return await processService
        .create(data)
        .then((result) => {
          if (result) {
            return result;
          }
        })
        .catch((error) => {
          switch (error.statusCode) {
            case 409:
              throw new Error(
                "this email is already in use , please enter another one "
              );
              break;
            default:
              throw error.message;
          }
        });
    },

    async remindersSend(data) {
      return await processService
        .remindersSend(data)
        .then((result) => {
          if (result) {
            return result;
          }
        })
        .catch((error) => {
          switch (error.statusCode) {
            case 409:
              throw new Error(
                "this email is already in use , please enter another one "
              );
              break;
            default:
              throw error.message;
          }
        });
    },

    async update(data) {
      return await processService
        .update(data)
        .then((result) => {
          if (result) {
            return result;
          }
        })
        .catch((error) => {
          switch (error.statusCode) {
            case 409:
              throw new Error(
                "this email is already in use , please enter another one "
              );
              break;
            default:
              throw error.message;
          }
        });
    },

    async changepass(data) {
      return await processService
        .changepassword(data)
        .then((result) => {
          if (result) {
            return result;
          }
        })
        .catch((error) => {
          switch (error.statusCode) {
            case 409:
              throw new Error("password change failed ");
              break;
            default:
              throw error.message;
          }
        });
    },

    async changepassnew(data) {
      return await processService
        .changepasswordnew(data)
        .then((result) => {
          if (result) {
            return result;
          }
        })
        .catch((error) => {
          switch (error.statusCode) {
            case 409:
              throw new Error("password change failed ");
              break;
            default:
              throw error.message;
          }
        });
    },

    async forgotpassword(data) {
      return await processService
        .forgotpassword(data)
        .then((result) => {
          if (result) {
            return result;
          }
        })
        .catch((error) => {
          switch (error.statusCode) {
            case 409:
              throw new Error("password reset failed ");
              break;
            default:
              throw error.message;
          }
        });
    },

    async resetpassword(data) {
      return await processService
        .resetpassword(data)
        .then((result) => {
          if (result) {
            return result;
          }
        })
        .catch((error) => {
          switch (error.statusCode) {
            case 409:
              throw new Error("password reset failed ");
              break;
            default:
              throw error.message;
          }
        });
    },

    async remove(id) {
      return await processService
        .remove(id)
        .then((result) => {
          if (result) {
            return result;
          }
        })
        .catch((error) => {
          switch (error.statusCode) {
            default:
              throw error.message;
          }
        });
    },

    async count() {
      return await processService
        .count()
        .then((result) => {
          if (result) {
            return result;
          }
        })
        .catch((error) => {
          switch (error.statusCode) {
            default:
              throw error.message;
          }
        });
    },
  },
});
