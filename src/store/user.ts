// initial state
import { StoreOptions } from "vuex";
import { ACCESS_ROLE_ENUM } from "@/enum/CommonEnum";
import { UserControllerService } from "../../generated";

/**
 * 登录用户信息全局状态管理
 */
export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  actions: {
    async getLoginUser({ commit, state }) {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 200) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userName: "未登录",
          userRole: ACCESS_ROLE_ENUM.NOT_LOGIN,
        });
      }
    },
    setLoginUser({ commit, state }, payload) {
      commit("updateUser", payload);
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
