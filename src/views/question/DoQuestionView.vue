<!--做题目页面-->
<template>
  <div id="doQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :span="12">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" title="题目">
            <a-scrollbar style="height: 550px; overflow: auto">
              <a-card>
                <template #title>
                  <div style="color: black; font-size: 32px">
                    {{ question?.title }}
                  </div>
                </template>
                <template #extra>
                  <a-space>
                    <a-tag
                      v-for="tag in question?.tags"
                      :key="tag"
                      :content="tag"
                      color="arcoblue"
                    >
                      {{ tag }}
                    </a-tag>
                  </a-space>
                </template>
                <MdViewer :value="question?.content" />
              </a-card>
            </a-scrollbar>
          </a-tab-pane>
          <a-tab-pane key="2" title="评论" disabled>
            Content of Tab Panel 2
          </a-tab-pane>
          <a-tab-pane key="3" title="答案">
            <a-card>
              <div v-if="hasLogin()">
                <a
                  href="/user/login"
                  style="text-decoration: none; color: #165dff"
                  >登录</a
                >后可查看答案
              </div>
              <div v-else>
                <MdViewer :value="question?.answer" />
              </div>
            </a-card>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :span="12">
        <a-space>
          <div>
            <a-form :model="submitForm" layout="inline">
              <a-form-item label="语言">
                <a-select
                  :style="{ width: '160px' }"
                  placeholder="选择语言"
                  :trigger-props="{ autoFitPopupMinWidth: true }"
                  v-model="submitForm.language"
                >
                  <a-option
                    v-for="(val, key) in PROGRAMMING_LANGUAGE_MAP"
                    :key="key"
                    :value="val"
                    >{{ key }}</a-option
                  >
                </a-select>
              </a-form-item>
              <a-form-item>
                <div v-if="hasLogin()">
                  <span>
                    <icon-info-circle style="margin-right: 6px" />
                    <a
                      href="/user/login"
                      style="text-decoration: none; color: #165dff"
                      >登录</a
                    >后可提交代码
                  </span>
                </div>
                <div v-else>
                  <a-button type="primary" @click="submitCode">
                    <icon-upload style="padding-right: 6px" />提交</a-button
                  >
                </div>
              </a-form-item>
            </a-form>
          </div>
        </a-space>
        <MonacoEditor
          :language="submitForm.language"
          :value="submitForm.code"
          :handle-change="
            (val) => {
              submitForm.code = val;
            }
          "
        />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, watchEffect, ref } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVO,
} from "../../../generated";
import { Message } from "@arco-design/web-vue";
import MonacoEditor from "@/components/MonacoEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import { useStore } from "vuex";
import { ACCESS_ROLE_ENUM, PROGRAMMING_LANGUAGE_MAP } from "@/enum/CommonEnum";

const question = ref<QuestionVO>();
const store = useStore();
const submitForm = ref({
  code: "",
  language: PROGRAMMING_LANGUAGE_MAP.Java,
} as QuestionSubmitAddRequest);
/**
 * 题目Id参数
 */
interface Props {
  questionId: number;
}
const props = withDefaults(defineProps<Props>(), {
  questionId: () => -1,
});

/**
 * 题目数据加载
 */
const loadData = async () => {
  if (!props.questionId || props.questionId < 0) {
    return;
  }
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.questionId
  );
  if (res.code === 200) {
    question.value = res.data;
  } else {
    Message.error("获取题目数据失败," + res.message);
  }
};

const submitCode = async () => {
  if (!submitForm.value.code) {
    Message.error("请输入代码");
    return;
  }
  const res = await QuestionSubmitControllerService.addQuestionSubmitUsingPost({
    ...submitForm.value,
    questionId: props.questionId,
  });
  if (res.code === 200) {
    Message.success("提交成功");
  } else {
    Message.error("提交失败," + res.message);
  }
};

const hasLogin = () => {
  const userRole = store.state.user.loginUser.userRole;
  return !userRole || userRole === ACCESS_ROLE_ENUM.NOT_LOGIN;
};

watchEffect(() => {
  loadData();
});
</script>

<style scoped></style>
