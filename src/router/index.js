import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Style from "@/views/other/StyleView.vue";
import Home from "@/views/HomeView.vue";

const routes = [

  {
    meta: {
      title: "Select style",
    },
    path: "/",
    name: "style",
    component: Style,
  },
  {

    meta: {
      title: "Dashboard",
    },
    path: "/dashboard",
    name: "dashboard",
    component: Home,
  },
  {
    meta: {
      title: "testManage",
    },
    path: "/testManage",
    name: "testManage",
    component: () => import("@/views/TestManageView.vue"),
  },
  {
    meta: {
      title: "Organization",
    },
    path: "/organization",
    name: "Organization",
    component: () => import("@/views/OrganizationView.vue"),

  },

  {
    meta: {
      title: "Ui",
    },
    path: "/ui",
    name: "ui",
    component: () => import("@/views/other/UiView.vue"),
  },
  {
    meta: {
      title: "Client",
    },
    path: "/client",
    name: "client",
    component: () => import("@/views/ClientView.vue"),
  },
  {
    meta: {
      title: "Blacklist",
    },
    path: "/blacklist",
    name: "Blacklist",
    component: () => import("@/views/BlacklistView.vue"),
  },
  {
    meta: {
      title: "Log",
    },
    path: "/log",
    name: "log",
    component: () => import("@/views/LogView.vue"),
  },
  {
    meta: {
      title: "Login",
    },
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    meta: {
      title: "Project",
    },
    path: "/project",
    name: "Project",
    component: () => import("@/views/ProjectView.vue"),
  },
  {
    meta: {
      title: "UserManagement",
    },
    path: "/user",
    name: "user",
    component: () => import("@/views/UserView.vue"),
  },
  {
    meta: {
      title: "PhishingSuccess",
    },
    path: "/phishing",
    name: "phishing",
    component: () => import("@/views/PhishingSuccess.vue"),
  },
  {
    meta: {
      title: "Responsive",
    },
    path: "/responsive",
    name: "Responsive",
    component: () => import("@/views/other/ResponsiveView.vue"),
  },
  {
    meta: {
      title: "Profile",
    },
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/other/ProfileView.vue"),
  },
  {
    meta: {
      title: "Setting",
    },
    path: "/setting",
    name: "Setting",
    component: () => import("@/views/other/SettingView.vue"),
  },
  {
    meta: {
      title: "Catch",
    },
    path: "/catch",
    name: "catch",
    component: () => import("@/views/CatchView.vue"),
  },
  {
    meta: {
      title: "server",
    },
    path: "/server",
    name: "server",
    component: () => import("@/views/SenderView.vue"),
  },
  {
    meta: {
      title: "templates",
    },
    path: "/template",
    name: "Other",
    component: () => import("@/views/TemplateView.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
