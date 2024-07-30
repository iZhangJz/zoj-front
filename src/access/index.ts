/**
 * 路由权限控制
 */

import router from "@/router";
import store from "@/store";
import { ACCESS_ROLE_ENUM } from "@/enum/CommonEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  // 获取当前用户
  let user = store.state.user.loginUser;
  // 获取跳转到的目标页面需要的权限 如果没有获取到则默认为不需要任何权限
  const needAccess: Array<string> = (to.meta?.access as string[]) ?? [
    ACCESS_ROLE_ENUM.NOT_LOGIN,
  ];
  // 尝试自动登录
  if (!user || !user.userRole) {
    await store.dispatch("user/getLoginUser");
    user = store.state.user.loginUser;
  }
  if (needAccess.includes(ACCESS_ROLE_ENUM.NOT_LOGIN)) {
    // 无论用户是否登录，都允许访问
    next();
    return;
  }
  // 如果用户未登录，则跳转到登录页面
  if ((!user || user.userName === "未登录") && to.path !== "/user/login") {
    next(`/user/login?redirect=${to.fullPath}`);
  }
  // 用户已经登录，则校验权限
  if (!checkAccess(user, needAccess as string[])) {
    // 没有权限，则跳转到无权限页面
    console.log("NoAuth");
    next("/noAuth");
    return;
  }
  next();
});
