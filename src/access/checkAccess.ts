import { ACCESS_ROLE_ENUM } from "@/enum/CommonEnum";

/**
 * 检查用户是否有权限访问指定页面
 * @param user 登录用户信息
 * @param needRole  跳转页面的权限列表
 */
const checkAccess = (user: any, needRole = [ACCESS_ROLE_ENUM.NOT_LOGIN]) => {
  // 获取当前登录用户的权限
  const loginUserRole = user.userRole ?? ACCESS_ROLE_ENUM.NOT_LOGIN;
  if (needRole.includes(ACCESS_ROLE_ENUM.NOT_LOGIN)) {
    // 无论用户权限如何，都放行
    return true;
  }
  if (loginUserRole === ACCESS_ROLE_ENUM.NOT_LOGIN) {
    // 当前用户未登录; 如果跳转到的页面不需要登录则放行
    return needRole.includes(ACCESS_ROLE_ENUM.NOT_LOGIN);
  }
  // 当前用户已经登录
  return needRole.includes(loginUserRole);
};

export default checkAccess;
