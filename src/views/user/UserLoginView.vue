<template>
  <div id="userLogin">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto; padding-top: 24px"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于 8 位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item style="padding-left: 120px">
        <a-button type="primary" html-type="submit" style="width: 120px">
          登录
        </a-button>
        <router-link
          to="/user/register"
          style="margin-left: 50px; text-decoration: none; color: #165dff"
        >
          还没有账号？点击注册
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { UserControllerService } from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
});

/**
 * 提交表单
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 200) {
    await store.dispatch("user/setLoginUser", res.data);
    await router.push({ path: "/", replace: true });
  } else {
    Message.warning("登录失败:" + res.message);
  }
};
</script>

<style scoped></style>
