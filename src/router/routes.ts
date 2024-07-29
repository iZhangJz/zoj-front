import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import { ACCESS_ROLE_ENUM } from "@/enum/CommonEnum";
import NoAuthorityView from "@/views/NoAuthorityView.vue";

/**
 * 路由配置文件
 */
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    component: HomeView,
  },
  {
    path: "/about",
    name: "问题",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/noAuth",
    name: "无权限",
    meta: {
      hideInMenu: true,
    },
    component: NoAuthorityView,
  },
  {
    path: "/admin",
    name: "管理",
    component: AdminView,
    meta: {
      access: [ACCESS_ROLE_ENUM.ADMIN],
    },
  },
];
