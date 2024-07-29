<template>
  <div class="menu-demo">
    <a-row class="grid-demo" style="margin-bottom: 16px" align="center">
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKey"
          @menu-item-click="clickMenu"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="logo">
              <img class="img" style="height: 48px" src="../assets/logo.png" />
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visibleRoutes" :key="item.path">{{
            item.name
          }}</a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="100px">
        <div>{{ store.state.user.loginUser.userName ?? "未登录" }}</div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";

const router = useRouter();
const selectedKey = ref(["/"]); // 菜单高亮选中
const store = useStore(); // 状态

/**
 * 监听路由变化
 */
router.afterEach((to) => {
  selectedKey.value = [to.path];
});

/**
 * 路由跳转
 * @param key 路由
 */
const clickMenu = (key: string) => {
  router.push(key);
};

/**
 * 过滤掉 meta 中 hideInMenu 属性为 true
 */
const visibleRoutes = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    return checkAccess(
      store.state.user.loginUser,
      item.meta?.access as string[]
    );
  });
});
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
}
</style>
