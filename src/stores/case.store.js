import { defineStore } from "pinia";
import CaseService from "../services/api/case.service";
import { useSessionStore } from "./session.store";
const caseService = new CaseService();

const sessionStore = useSessionStore();
export const useCaseStore = defineStore({
  id: "case",
  state: () => ({
    cases: [],
  }),
  getters: {},
  actions: {
    async get() {
      return await caseService
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
      return await caseService
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
      return await caseService
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
      return await caseService
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
      return await caseService
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
      return await caseService
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
      return await caseService
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
      return await caseService
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
      return await caseService
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
      return await caseService
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
      return await caseService
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
      return await caseService
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
      return await caseService
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
      return await caseService
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
      return await caseService
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
      return await caseService
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
      return await caseService
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
      return await caseService
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
