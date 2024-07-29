// initial state
import { StoreOptions } from "vuex";
import { ACCESS_ROLE_ENUM } from "@/enum/CommonEnum";

/**
 * 登录用户信息全局状态管理
 */
export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "管理员",
      userRole: ACCESS_ROLE_ENUM.ADMIN,
    },
  }),
  actions: {
    getLoginUser({ commit, state }, payload) {
      // TODO 需要更改为远程获取登录信息
      commit("updateUser", payload);
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
