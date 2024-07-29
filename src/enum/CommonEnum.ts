/**
 * 权限角色枚举
 */
export const ACCESS_ROLE_ENUM = {
  NOT_LOGIN: "notLogin", // 未登录
  USER: "user", // 用户"
  ADMIN: "admin", // 管理员
  VIP: "vip",
};

/**
 * 审核状态枚举
 */
export const REVIEW_STATUS_MAP: { [key: number]: string } = {
  0: "未审核",
  1: "通过",
  2: "拒绝",
};

export const REVIEW_STATUS_ENUM: { [key: string]: number } = {
  WAIT: 0,
  PASS: 1,
  REFUSE: 2,
};

/**
 * 文件上传业务类型枚举
 */
export const FILE_UPLOAD_BIZ_ENUM: { [key: string]: string } = {
  USER_AVATAR: "user_avatar",
  RESULT_PICTURE: "result_picture",
  APP_ICON: "app_icon",
};

/**
 * 排序规则枚举
 */
export const SORT_RULE_ENUM = {
  // 升序
  ASC: "ascend",
  // 降序
  DESC: "descend",
};
