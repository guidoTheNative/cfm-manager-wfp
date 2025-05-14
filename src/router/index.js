import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { saveDataOffline, getDataOffline } from "../services/localbase";

const routes = [
  {
    path: "/",
    component: () => import("../components/layouts/plain.layout.vue"),
    children: [
      {
        path: "",
        name: "portal-home",
        redirect: { name: "portal-signin" },
      },
      {
        name: "portal-signin",
        path: "/portal/signin",
        component: () => import("../pages/portal/signin.page.vue"),
      },

      {
        name: "portal-forgot-password",
        path: "/portal/forgot-password",
        component: () => import("../pages/portal/forgot-password.page.vue"),
      },

      {
        name: "portal-reset-password",
        path: "/portal/reset-password/:email",
        component: () => import("../pages/portal/reset-password.page.vue"),
      },
    ],
  },

  //Admin
  {
    path: "/admin",
    name: "admin",
    component: () => import("../components/layouts/admin.layout.vue"),
    children: [
      //Dashboard
      {
        path: "",
        name: "admin-home",
        redirect: { name: "admin-dashboard" },
      },

      {
        path: "/admin/reversals",
        name: "admin-reversals",
        component: () =>
          import("../pages/admin/receipts/reversal.receipts.page.vue"),
      },

      {
        path: "/admin/cases/create",
        name: "admin-cases-create",
        component: () => import("../pages/admin/cases/create-cases.page"),
      },

      {
        path: "/admin/process/create",
        name: "admin-process-create",
        component: () => import("../pages/admin/process/create-cases.page"),
      },

      {
        path: "/admin/faqs",
        name: "admin-cases-faqs",
        component: () => import("../pages/admin/cases/create-faqs.page"),
      },

      {
        path: "/admin/sops",
        name: "admin-cases-sops",
        component: () => import("../pages/admin/cases/create-sops.page"),
      },

      {
        path: "/admin/dashboard",
        name: "admin-dashboard",
        component: () => import("../pages/admin/dashboard/index.page.vue"),
      },

      {
        path: "/admin/report-management",
        name: "admin-report-management",
        component: () => import("../pages/admin/reports/index.page.vue"),
      },
      //Users
      {
        path: "/admin/users",
        name: "admin-users",
        component: () => import("../pages/admin/users/index.page.vue"),
      },

      {
        path: "/admin/mailinggroups",
        name: "admin-mailinggroups",
        component: () => import("../pages/admin/mailinggroups/index.page.vue"),
      },

      {
        path: "/admin/mailinggroups/manage/:id",
        name: "admin-manage-mailinggroups",
        component: () => import("../pages/admin/mailinggroups/manage.page.vue"),
      },

      {
        path: "/admin/users/manage/:id",
        name: "admin-manage-user",
        component: () => import("../pages/admin/users/manage.page.vue"),
      },

      {
        path: "/admin/dispatch-management",
        name: "admin-dispatch-management",
        component: () => import("../pages/admin/dispatch/index.page.vue"),
      },

      {
        path: "/admin/dispatches",
        name: "admin-dispatches",
        component: () => import("../pages/admin/dispatch/dispatches.page.vue"),
      },

      {
        path: "/admin/loadingplans",
        name: "admin-loadingplans",
        component: () => import("../pages/admin/loadingplans/index.page.vue"),
      },
      {
        path: "/admin/dispatch-management/manage/:id",
        name: "admin-manage-catalogue",
        component: () => import("../pages/admin/dispatch/manage.page.vue"),
      },

      {
        path: "/admin/commodity-tracking",
        name: "admin-commodity-tracking",
        component: () => import("../pages/admin/commodities/index.page.vue"),
      },
      {
        path: "/admin/commodity-tracking/manage/:id",
        name: "admin-manage-commodity-tracking",
        component: () => import("../pages/admin/commodities/manage.page.vue"),
      },

      {
        path: "/admin/receipt-management",
        name: "admin-receipt-management",
        component: () => import("../pages/admin/receipts/index.page.vue"),
      },

      {
        path: "/admin/receipts",
        name: "admin-receipts",
        component: () => import("../pages/admin/receipts/index.page.vue"),
      },

      {
        path: "/admin/receipts/emergency",
        name: "admin-receipts-emergency",
        component: () =>
          import("../pages/admin/receipts/emergency.receipts.page.vue"),
      },

      {
        path: "/admin/receipts/leanseason",
        name: "admin-receipts-leanseason",
        component: () =>
          import("../pages/admin/receipts/leanseason.receipts.page.vue"),
      },
      {
        path: "/admin/change-password",
        name: "admin-change-password",
        component: () =>
          import("../components/pages/users/change.password.vue"),
      },
      {
        path: "/admin/receipt-management/manage/:id",
        name: "admin-manage-receipt-management",
        component: () => import("../pages/admin/receipts/manage.page.vue"),
      },

      {
        path: "/admin/requisition-management",
        name: "admin-requisition-management",
        component: () => import("../pages/admin/requisitions/index.page.vue"),
      },
      {
        path: "/admin/receipt-management/manage/:id",
        name: "admin-manage-requisition-management",
        component: () => import("../pages/admin/requisitions/manage.page.vue"),
      },

      {
        path: "/admin/system",
        name: "admin-system",
        component: () => import("../pages/admin/system/index.page.vue"),
      },

      {
        path: "/admin/user-dispatches",
        name: "admin-user-dispatches",
        component: () => import("../pages/admin/users/dispatches.page.vue"),
      },

      {
        path: "/admin/logs",
        name: "admin-logs",
        component: () => import("../pages/admin/logs/index.page.vue"),
      },

      {
        path: "/admin/userroles",
        name: "admin-userroles",
        component: () => import("../pages/admin/usersroles/index.page.vue"),
      },

      {
        path: "/admin/districts",
        name: "admin-districts",
        component: () => import("../pages/admin/districts/index.page.vue"),
      },

      {
        path: "/admin/organisations",
        name: "admin-organisations",
        component: () => import("../pages/admin/organisations/index.page.vue"),
      },

      {
        path: "/admin/stock-management",
        name: "admin-stock-management",
        component: () => import("../pages/admin/stock/index.page.vue"),
      },

      {
        path: "/admin/stock-management/manage/:id",
        name: "admin-manage-stock",
        component: () => import("../pages/admin/stock/manage.page.vue"),
      },

      {
        path: "/admin/warehouse-management",
        name: "admin-warehouse-management",
        component: () => import("../pages/admin/warehouses/index.page.vue"),
      },

      {
        path: "/admin/warehouse-management/manage/:id",
        name: "admin-manage-warehouse",
        component: () => import("../pages/admin/warehouses/manage.page.vue"),
      },

      {
        path: "/admin/transporter-management",
        name: "admin-transporter-management",
        component: () => import("../pages/admin/transporters/index.page.vue"),
      },

      {
        path: "/admin/transporter-management/manage/:id",
        name: "admin-manage-transporter",
        component: () => import("../pages/admin/transporters/manage.page.vue"),
      },

      {
        path: "/admin/commodity-types",
        name: "admin-commodity-types",
        component: () => import("../pages/admin/commoditytypes/index.page.vue"),
      },

      {
        path: "/admin/commodity-types/manage/:id",
        name: "admin-manage-commodity-types",
        component: () =>
          import("../pages/admin/commoditytypes/manage.page.vue"),
      },

      {
        path: "/admin/commodity-management",
        name: "admin-commodity-management",
        component: () =>
          import("../pages/admin/commoditymanagement/index.page.vue"),
      },

      {
        path: "/admin/commodity-management/manage/:id",
        name: "admin-manage-commodity-management",
        component: () =>
          import("../pages/admin/commoditymanagement/manage.page.vue"),
      },

      {
        path: "/admin/activity-management",
        name: "admin-activity-management",
        component: () => import("../pages/admin/activities/index.page.vue"),
      },

      {
        path: "/admin/activity-management/manage/:id",
        name: "admin-manage-activity-management",
        component: () => import("../pages/admin/activities/manage.page.vue"),
      },

      

      {
        path: "/admin/organisations/manage/:id",
        name: "admin-manage-organisations",
        component: () => import("../pages/admin/organisations/manage.page.vue"),
      },

      {
        path: "/admin/cases",
        name: "admin-cases",
        component: () => import("../pages/admin/cases/index.page.vue"),
      },

      {
        path: "/admin/cases/manage/:id",
        name: "admin-manage-cases",
        component: () => import("../pages/admin/cases/manage.page.vue"),
      },

      {
        path: "/admin/process/manage/:id",
        name: "admin-manage-process",
        component: () => import("../pages/admin/process/manage.page.vue"),
      },

      {
        path: "/admin/process",
        name: "admin-process",
        component: () => import("../pages/admin/process/index.page.vue"),
      },

      {
        path: "/admin/project-management",
        name: "admin-project-management",
        component: () => import("../pages/admin/projects/index.page.vue"),
      },
      {
        path: "/admin/about-system",
        name: "admin-about-system",
        component: () => import("../pages/about/index.page.vue"),
      },
      {
        path: "/admin/reminders",
        name: "admin-reminders",
        component: () => import("../pages/admin/reminders/reminders.page.vue"),
      },
      {
        path: "/admin/performance-stats",
        name: "admin-performance-stats",
        component: () => import("../pages/admin/reports/performance-stats.vue"),
      },

      {
        path: "/admin/usage-stats",
        name: "admin-usage-stats",
        component: () => import("../pages/admin/reports/usage-stats.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {
      let role = JSON.parse(sessionStorage.getItem("RLE"));
      if (role != null && typeof role.name != "undefined") {
        if (role.name == "Admin") {
          next();
        } else {
          next({ name: "portal-signin" });
        }
      } else {
        next({ name: "portal-signin" });
      }
    },
  },

  //Manager
  {
    path: "/activitymanager",
    name: "activitymanager",
    component: () => import("../components/layouts/activitymanager.layout.vue"),
    children: [
      //Dashboard
      {
        path: "",
        name: "activitymanager-home",
        redirect: { name: "activitymanager-dashboard" },
      },
      {
        path: "/activitymanager/dashboard",
        name: "activitymanager-dashboard",
        component: () =>
          import("../pages/activitymanager/dashboard/index.page.vue"),
      },

      {
        path: "/activitymanager/process",
        name: "activitymanager-process",
        component: () =>
          import("../pages/activitymanager/process/index.page.vue"),
      },
      {
        path: "/activitymanager/process/create",
        name: "activitymanager-process-create",
        component: () =>
          import("../pages/activitymanager/process/create-cases.page"),
      },

      {
        path: "/activitymanager/process/manage/:id",
        name: "activitymanager-process-manage",
        component: () => import("../pages/activitymanager/process/manage.page.vue"),
      },

      {
        path: "/activitymanager/resources",
        name: "activitymanager-resources",
        component: () =>
          import("../pages/activitymanager/system/index.page.vue"),
      },

      {
        path: "/activitymanager/faqs",
        name: "activitymanager-faqs",
        component: () => import("../pages/activitymanager/cases/faqs.page.vue"),
      },

      {
        path: "/activitymanager/sops",
        name: "activitymanager-sops",
        component: () => import("../pages/activitymanager/cases/sops.page.vue"),
      },

      {
        path: "/activitymanager/cases/manage/escalated/:id",
        name: "activitymanager-cases-manage-escalated",
        component: () =>
          import("../pages/activitymanager/cases/manage-escalated.page.vue"),
      },

      {
        path: "/activitymanager/cases/escalated",
        name: "activitymanager-cases-escalated",
        component: () =>
          import("../pages/activitymanager/cases/index-escalated.page.vue"),
      },
      {
        path: "/activitymanager/cases/manage/:id",
        name: "activitymanager-cases-manage",
        component: () =>
          import("../pages/activitymanager/cases/manage.page.vue"),
      },

      {
        path: "/activitymanager/cases/manage/rejected/:id",
        name: "activitymanager-cases-manage-rejected",
        component: () =>
          import("../pages/activitymanager/cases/manage-rejected.page.vue"),
      },

      {
        path: "/activitymanager/cases",
        name: "activitymanager-cases",
        component: () =>
          import("../pages/activitymanager/cases/index.page.vue"),
      },

      {
        path: "/activitymanager/cases/rejected",
        name: "activitymanager-cases-rejected",
        component: () =>
          import("../pages/activitymanager/cases/index-rejected.page.vue"),
      },

      {
        path: "/activitymanager/system",
        name: "activitymanager-system",
        component: () =>
          import("../pages/activitymanager/system/index.page.vue"),
      },

      {
        path: "/activitymanager/change-password",
        name: "activitymanager-change-password",
        component: () =>
          import("../components/pages/users/change.password.vue"),
      },

      {
        path: "/activitymanager/about-system",
        name: "activitymanager-about-system",
        component: () => import("../pages/about/index.page.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {
      let role = JSON.parse(sessionStorage.getItem("RLE"));
      if (role != null && typeof role.name != "undefined") {
        if (role.name == "Activity manager") {
          next();
        } else {
          next({ name: "portal-signin" });
        }
      } else {
        next({ name: "portal-signin" });
      }
    },
  },

  //Dispatcher
  {
    path: "/callcenter",
    name: "callcenter",
    component: () => import("../components/layouts/callcenter.layout.vue"),
    children: [
      //Dashboard
      {
        path: "",
        name: "callcenter-home",
        redirect: { name: "callcenter-dashboard" },
      },
      {
        path: "/callcenter/dashboard",
        name: "callcenter-dashboard",
        component: () => import("../pages/callcenter/dashboard/index.page.vue"),
      },
      {
        path: "/callcenter/change-password",
        name: "callcenter-change-password",
        component: () =>
          import("../components/pages/users/change.password.vue"),
      },

      {
        path: "/callcenter/resources",
        name: "callcenter-resources",
        component: () => import("../pages/callcenter/system/index.page.vue"),
      },

      {
        path: "/callcenter/faqs",
        name: "callcenter-faqs",
        component: () => import("../pages/callcenter/cases/faqs.page.vue"),
      },

      {
        path: "/callcenter/sops",
        name: "callcenter-sops",
        component: () => import("../pages/callcenter/cases/sops.page.vue"),
      },

      {
        path: "/callcenter/cases/manage/:id",
        name: "callcenter-cases-manage",
        component: () => import("../pages/callcenter/cases/manage.page.vue"),
      },

      {
        path: "/callcenter/cases/manage/rejected/:id",
        name: "callcenter-cases-manage-rejected",
        component: () =>
          import("../pages/callcenter/cases/manage-rejected.page.vue"),
      },

      {
        path: "/callcenter/cases/rejected",
        name: "callcenter-cases-rejected",
        component: () =>
          import("../pages/callcenter/cases/index-rejected.page.vue"),
      },

      {
        path: "/callcenter/cases/create",
        name: "callcenter-cases-create",
        component: () => import("../pages/callcenter/cases/create-cases.page"),
      },

      {
        path: "/callcenter/cases",
        name: "callcenter-cases",
        component: () => import("../pages/callcenter/cases/index.page.vue"),
      },

      {
        path: "/callcenter/cases/rejected",
        name: "callcenter-cases-rejected",
        component: () =>
          import("../pages/callcenter/cases/index-rejected.page.vue"),
      },

      {
        path: "/callcenter/about-system",
        name: "callcenter-about-system",
        component: () => import("../pages/about/index.page.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {
      let role = JSON.parse(sessionStorage.getItem("RLE"));
      if (role != null && typeof role.name != "undefined") {
        if (role.name == "Call center") {
          next();
        } else {
          next({ name: "portal-signin" });
        }
      } else {
        next({ name: "portal-signin" });
      }
    },
  },

  //warehouse
  {
    path: "/cfmmanager",
    name: "cfmmanager",
    component: () => import("../components/layouts/cfmmanager.layout.vue"),
    children: [
      //Dashboard
      {
        path: "",
        name: "cfmmanager-home",
        redirect: { name: "cfmmanager-dashboard" },
      },
      {
        path: "/cfmmanager/dashboard",
        name: "cfmmanager-dashboard",
        component: () => import("../pages/cfmmanager/dashboard/index.page.vue"),
      },

      {
        path: "/cfmmanager/about-system",
        name: "cfmmanager-about-system",
        component: () => import("../pages/about/index.page.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {
      let role = JSON.parse(sessionStorage.getItem("RLE"));
      if (role != null && typeof role.name != "undefined") {
        if (role.name == "CFM manager") {
          next();
        } else {
          next({ name: "portal-signin" });
        }
      } else {
        next({ name: "portal-signin" });
      }
    },
  },

  //psea
  {
    path: "/hop",
    name: "hop",
    component: () => import("../components/layouts/hop.layout.vue"),
    children: [
      //Dashboard
      {
        path: "",
        name: "hop-home",
        redirect: { name: "hop-dashboard" },
      },
      {
        path: "/hop/dashboard",
        name: "hop-dashboard",
        component: () => import("../pages/hop/dashboard/index.page.vue"),
      },

      {
        path: "/hop/resources",
        name: "hop-resources",
        component: () => import("../pages/hop/system/index.page.vue"),
      },

      {
        path: "/hop/faqs",
        name: "hop-faqs",
        component: () => import("../pages/hop/cases/faqs.page.vue"),
      },

      {
        path: "/hop/sops",
        name: "hop-sops",
        component: () => import("../pages/hop/cases/sops.page.vue"),
      },

      {
        path: "/hop/cases/manage/:id",
        name: "hop-cases-manage",
        component: () => import("../pages/hop/cases/manage.page.vue"),
      },

      {
        path: "/hop/cases/manage/escalated/:id",
        name: "hop-cases-manage-escalated",
        component: () => import("../pages/hop/cases/manage-escalated.page.vue"),
      },

      {
        path: "/hop/cases/escalated",
        name: "hop-cases-escalated",
        component: () => import("../pages/hop/cases/index-escalated.page.vue"),
      },
      {
        path: "/hop/cases/manage/rejected/:id",
        name: "hop-cases-manage-rejected",
        component: () => import("../pages/hop/cases/manage-rejected.page.vue"),
      },

      {
        path: "/hop/process/manage/:id",
        name: "hop-process-manage",
        component: () => import("../pages/hop/process/manage.page.vue"),
      },

      {
        path: "/hop/cases",
        name: "hop-cases",
        component: () => import("../pages/hop/cases/index.page.vue"),
      },

      {
        path: "/hop/process",
        name: "hop-process",
        component: () => import("../pages/hop/process/index.page.vue"),
      },

      {
        path: "/hop/change-password",
        name: "hop-change-password",
        component: () =>
          import("../components/pages/users/change.password.vue"),
      },

      {
        path: "/hop/about-system",
        name: "hop-about-system",
        component: () => import("../pages/about/index.page.vue"),
      },
    ],

    beforeEnter: (to, from, next) => {
      let role = JSON.parse(sessionStorage.getItem("RLE"));
      if (role != null && typeof role.name != "undefined") {
        if (role.name == "Head of Programme") {
          next();
        } else {
          next({ name: "portal-signin" });
        }
      } else {
        next({ name: "portal-signin" });
      }
    },
  },

  //psea
  {
    path: "/psea",
    name: "psea",
    component: () => import("../components/layouts/psea.layout.vue"),
    children: [
      //Dashboard
      {
        path: "",
        name: "psea-home",
        redirect: { name: "psea-dashboard" },
      },
      {
        path: "/psea/dashboard",
        name: "psea-dashboard",
        component: () => import("../pages/psea/dashboard/index.page.vue"),
      },

      {
        path: "/psea/resources",
        name: "psea-resources",
        component: () => import("../pages/psea/system/index.page.vue"),
      },

      {
        path: "/psea/faqs",
        name: "psea-faqs",
        component: () => import("../pages/psea/cases/faqs.page.vue"),
      },

      {
        path: "/psea/sops",
        name: "psea-sops",
        component: () => import("../pages/psea/cases/sops.page.vue"),
      },

      {
        path: "/psea/cases/manage/:id",
        name: "psea-cases-manage",
        component: () => import("../pages/psea/cases/manage.page.vue"),
      },

      {
        path: "/psea/cases/manage/rejected/:id",
        name: "psea-cases-manage-rejected",
        component: () => import("../pages/psea/cases/manage-rejected.page.vue"),
      },

      {
        path: "/psea/cases",
        name: "psea-cases",
        component: () => import("../pages/psea/cases/index.page.vue"),
      },

      {
        path: "/psea/change-password",
        name: "psea-change-password",
        component: () =>
          import("../components/pages/users/change.password.vue"),
      },

      {
        path: "/psea/about-system",
        name: "psea-about-system",
        component: () => import("../pages/about/index.page.vue"),
      },
    ],

    beforeEnter: (to, from, next) => {
      let role = JSON.parse(sessionStorage.getItem("RLE"));
      if (role != null && typeof role.name != "undefined") {
        if (role.name == "PSEA/Gender Focal Point") {
          next();
        } else {
          next({ name: "portal-signin" });
        }
      } else {
        next({ name: "portal-signin" });
      }
    },
  },

  //Manager
  {
    path: "/field",
    name: "field",
    component: () => import("../components/layouts/field.layout.vue"),
    children: [
      //Dashboard
      {
        path: "",
        name: "field-home",
        redirect: { name: "field-dashboard" },
      },
      {
        path: "/field/dashboard",
        name: "field-dashboard",
        component: () => import("../pages/field/dashboard/index.page.vue"),
      },

      {
        path: "/field/resources",
        name: "field-resources",
        component: () => import("../pages/field/system/index.page.vue"),
      },

      {
        path: "/field/faqs",
        name: "field-faqs",
        component: () => import("../pages/field/cases/faqs.page.vue"),
      },

      {
        path: "/field/sops",
        name: "field-sops",
        component: () => import("../pages/field/cases/sops.page.vue"),
      },

      {
        path: "/field/change-password",
        name: "field-change-password",
        component: () =>
          import("../components/pages/users/change.password.vue"),
      },

      {
        path: "/field/system",
        name: "field-system",
        component: () => import("../pages/field/system/index.page.vue"),
      },

      {
        path: "/field/cases/create",
        name: "field-cases-create",
        component: () => import("../pages/field/cases/create-cases.page"),
      },

      {
        path: "/field/cases/manage/:id",
        name: "field-cases-manage",
        component: () => import("../pages/field/cases/manage.page.vue"),
      },

      {
        path: "/field/cases/manage/rejected/:id",
        name: "field-cases-manage-rejected",
        component: () =>
          import("../pages/field/cases/manage-rejected.page.vue"),
      },

      {
        path: "/field/cases",
        name: "field-cases",
        component: () => import("../pages/field/cases/index.page.vue"),
      },

      {
        path: "/field/cases/rejected",
        name: "field-cases-rejected",
        component: () => import("../pages/field/cases/index-rejected.page.vue"),
      },

      {
        path: "/field/process",
        name: "field-process",
        component: () => import("../pages/field/process/index.page.vue"),
      },

      {
        path: "/field/process/manage/:id",
        name: "field-process-manage",
        component: () => import("../pages/field/process/manage.page.vue"),
      },

      {
        path: "/field/process/create",
        name: "field-process-create",
        component: () => import("../pages/field/process/create-cases.page"),
      },

      {
        path: "/field/about-system",
        name: "field-about-system",
        component: () => import("../pages/about/index.page.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {
      let role = JSON.parse(sessionStorage.getItem("RLE"));
      if (role != null && typeof role.name != "undefined") {
        if (role.name == "Field staff") {
          next();
        } else {
          next({ name: "portal-signin" });
        }
      } else {
        next({ name: "portal-signin" });
      }
    },
  },

  //Co-Operating partner
  {
    path: "/cp",
    name: "cp",
    component: () => import("../components/layouts/cp.layout.vue"),
    children: [
      //Dashboard
      {
        path: "",
        name: "cp-home",
        redirect: { name: "cp-dashboard" },
      },
      {
        path: "/cp/dashboard",
        name: "cp-dashboard",
        component: () => import("../pages/cp/dashboard/index.page.vue"),
      },

      {
        path: "/cp/resources",
        name: "cp-resources",
        component: () => import("../pages/cp/system/index.page.vue"),
      },

      {
        path: "/cp/faqs",
        name: "cp-faqs",
        component: () => import("../pages/cp/cases/faqs.page.vue"),
      },

      {
        path: "/cp/sops",
        name: "cp-sops",
        component: () => import("../pages/cp/cases/sops.page.vue"),
      },

      {
        path: "/cp/change-password",
        name: "cp-change-password",
        component: () =>
          import("../components/pages/users/change.password.vue"),
      },

      {
        path: "/cp/system",
        name: "cp-system",
        component: () => import("../pages/cp/system/index.page.vue"),
      },

      {
        path: "/cp/cases/manage/:id",
        name: "cp-cases-manage",
        component: () => import("../pages/cp/cases/manage.page.vue"),
      },

      {
        path: "/cp/cases/create",
        name: "cp-cases-create",
        component: () => import("../pages/cp/cases/create-cases.page"),
      },

      {
        path: "/cp/cases/manage/rejected/:id",
        name: "cp-cases-manage-rejected",
        component: () => import("../pages/cp/cases/manage-rejected.page.vue"),
      },

      {
        path: "/cp/cases",
        name: "cp-cases",
        component: () => import("../pages/cp/cases/index.page.vue"),
      },

      {
        path: "/cp/cases",
        name: "cp-cases",
        component: () => import("../pages/cp/cases/index.page.vue"),
      },

      {
        path: "/cp/cases/rejected",
        name: "cp-cases-rejected",
        component: () => import("../pages/cp/cases/index-rejected.page.vue"),
      },

      {
        path: "/cp/about-system",
        name: "cp-about-system",
        component: () => import("../pages/about/index.page.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {
      let role = JSON.parse(sessionStorage.getItem("RLE"));
      if (role != null && typeof role.name != "undefined") {
        if (role.name == "Co-operating Partner") {
          next();
        } else {
          next({ name: "portal-signin" });
        }
      } else {
        next({ name: "portal-signin" });
      }
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("../pages/Errors/404.error.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
