import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { ACCESS_ROLE_ENUM } from "@/enum/CommonEnum";
import NoAuthorityView from "@/views/NoAuthorityView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuesView from "@/views/question/AddQuesView.vue";

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
    path: "/admin/question/add",
    name: "创建题目",
    component: AddQuesView,
    meta: {
      access: [ACCESS_ROLE_ENUM.ADMIN],
    },
  },
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
  },
];
