<template>
  <div class="menu-demo">
    <a-row class="grid-demo" align="center" :wrap="false">
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
        <a-space>
          <a-modal
            v-model:visible="upLoadVisible"
            @ok="handleOk"
            @cancel="handleCancel"
          >
            <template #title> 头像上传 </template>
            <div>
              <a-space style="margin-left: 200px; margin-right: 200px">
                <a-upload
                  action="/"
                  :fileList="file ? [file] : []"
                  :show-file-list="false"
                  :on-before-upload="beforeUpload"
                  @change="onChange"
                  @progress="onProgress"
                >
                  <template #upload-button>
                    <div
                      :class="`arco-upload-list-item${
                        file && file.status === 'error'
                          ? ' arco-upload-list-item-error'
                          : ''
                      }`"
                    >
                      <div
                        class="arco-upload-list-picture custom-upload-avatar"
                        v-if="file && file.url"
                      >
                        <img :src="file.url" />
                        <div class="arco-upload-list-picture-mask">
                          <IconEdit />
                        </div>
                        <a-progress
                          v-if="
                            file.status === 'uploading' && file.percent < 100
                          "
                          :percent="file.percent"
                          type="circle"
                          size="mini"
                          :style="{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translateX(-50%) translateY(-50%)',
                          }"
                        />
                      </div>
                      <div class="arco-upload-picture-card" v-else>
                        <div class="arco-upload-picture-card-text">
                          <IconPlus />
                          <div style="margin-top: 10px; font-weight: 600">
                            Upload
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </a-upload>
              </a-space>
            </div>
          </a-modal>
          <a-avatar trigger-type="mask">
            <img alt="avatar" :src="store.state.user.loginUser.userAvatar" />
          </a-avatar>
          <a-dropdown>
            <a-button type="text">{{
              store.state.user.loginUser.userName ?? "未登录"
            }}</a-button>
            <template #content>
              <div v-if="store.state.user.loginUser.userName === '未登录'">
                <a-doption @click="router.push('/user/login')"
                  >立即登陆</a-doption
                >
              </div>
              <div v-else>
                <a-doption @click="handleModalClick">上传头像</a-doption>
                <a-doption>退出登录</a-doption>
              </div>
            </template>
          </a-dropdown>
        </a-space>
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
import Message from "@arco-design/web-vue/es/message";
import { UserControllerService } from "../../generated";

const router = useRouter();
const selectedKey = ref(["/"]); // 菜单高亮选中
const store = useStore(); // 状态

/**
 * 头像上传对话框
 */
const upLoadVisible = ref(false);

const handleModalClick = () => {
  upLoadVisible.value = true;
};
const handleOk = async () => {
  const res = await UserControllerService.userAvatarUploadUsingPost(
    file.value.file
  );
  if (res.code == 200) {
    Message.success("上传成功");
    await store.dispatch("user/setUserAvatar", res.data);
  } else {
    Message.error("上传失败", res.message);
  }
  upLoadVisible.value = false;
};
const handleCancel = () => {
  upLoadVisible.value = false;
};

/**
 * 头像上传
 */
const file = ref();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const onChange = (_, currentFile) => {
  file.value = {
    ...currentFile,
  };
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const onProgress = (currentFile) => {
  file.value = currentFile;
};

/**
 * 校验文件类型
 * @param file
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const beforeUpload = (file) => {
  if (
    !["image/jpeg", "image/jpg", "image/png"].some((type) => file.type === type)
  ) {
    Message.error("仅支持 jpeg jpg png 文件!");
    return false;
  }
  return true;
};

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
