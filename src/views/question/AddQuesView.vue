<!--创建题目页面-->
<template>
  <div id="addQuesView">
    <a-form :model="questionForm" @submit="handleSubmit">
      <a-form-item label="标题">
        <a-input
          style="width: 636px"
          v-model="questionForm.title"
          placeholder="请输入题目标题"
        />
      </a-form-item>
      <a-form-item label="标签">
        <a-input-tag
          style="width: 636px"
          placeholder="添加标签（回车确认）"
          allow-clear
          v-model="questionForm.tags"
        />
      </a-form-item>
      <a-form-item label="题目描述">
        <MdEditor
          :value="questionForm.content"
          :handle-change="
            (val) => {
              questionForm.content = val;
            }
          "
        />
      </a-form-item>
      <a-form-item label="答案">
        <MdEditor
          :value="questionForm.answer"
          :handle-change="
            (val) => {
              questionForm.answer = val;
            }
          "
        />
      </a-form-item>

      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical">
          <a-form-item
            field="judgeConfig.memoryLimit"
            validate-trigger="input"
            :rules="[{ required: true, message: 'memoryLimit is required' }]"
            label="内存限制"
          >
            <a-input-number
              v-model="questionForm.judgeConfig.memoryLimit"
              :style="{ width: '320px' }"
              placeholder="内存限制"
              :min="100"
              allow-clear
              hide-button
            >
              <template #suffix> kb </template>
            </a-input-number>
          </a-form-item>
          <a-form-item
            field="judgeConfig.timeLimit"
            validate-trigger="input"
            :rules="[{ required: true, message: 'timeLimit is required' }]"
            label="时间限制"
            :min="100"
          >
            <a-input-number
              v-model="questionForm.judgeConfig.timeLimit"
              :style="{ width: '320px' }"
              placeholder="时间限制"
              allow-clear
              hide-button
            >
              <template #suffix> ms </template>
            </a-input-number>
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-divider orientation="center" :margin="36">测试用例</a-divider>
      <a-form-item
        field="questionForm.judgeCase"
        :label="`测试用例-${index + 1}`"
        :content-flex="false"
        :merge-props="false"
        v-for="(item, index) of questionForm.judgeCase"
        :key="index"
      >
        <a-space direction="horizontal">
          <a-form-item
            :style="{ width: '420px' }"
            :field="`questionForm.judgeCase[${index}].input`"
            label="用例输入"
            :key="index"
          >
            <a-input v-model="item.input" placeholder="用例输入" />
          </a-form-item>
          <a-form-item
            :style="{ width: '420px' }"
            :field="`questionForm.judgeCase[${index}].output`"
            label="用例输出"
            :key="index"
          >
            <a-col>
              <a-input v-model="item.output" placeholder="用例输出" />
            </a-col>
            <a-col style="margin-left: 100px">
              <a-button
                @click="handleDelete(index)"
                type="primary"
                status="danger"
                >删除</a-button
              >
            </a-col>
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-button @click="handleAdd" type="primary">新增测试用例</a-button>
      </a-form-item>
      <a-divider />
      <div style="text-align: center">
        <a-button html-type="submit" type="primary" style="width: 150px"
          >提交</a-button
        >
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import {
  QuestionAddRequest,
  QuestionControllerService,
} from "../../../generated";
import { Message } from "@arco-design/web-vue";

/**
 * 创建题目表单数据
 */
const questionForm = reactive({
  title: "",
  content: "",
  answer: "",
  tags: [],
  judgeCase: [{ input: "", output: "" }],
  judgeConfig: { memoryLimit: 1000, timeLimit: 1000 },
}) as QuestionAddRequest;

/**
 * 提交表单函数
 */
const handleSubmit = async () => {
  const res = await QuestionControllerService.addQuestionUsingPost(
    questionForm
  );
  if (res.code === 200) {
    Message.success("新增题目成功");
  } else {
    Message.error("新增题目失败," + res.message);
  }
};

/**
 * 新增测试用例
 */
const handleAdd = () => {
  if (questionForm.judgeCase) {
    questionForm.judgeCase.push({
      input: "",
      output: "",
    });
  }
};
/**
 * 删除测试用例
 * @param index 用例下标索引
 */
const handleDelete = (index: number) => {
  if (questionForm.judgeCase) {
    questionForm.judgeCase.splice(index, 1);
  }
};
</script>

<style scoped>
#addQuesView {
}
</style>
