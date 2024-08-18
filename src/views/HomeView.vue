<template>
  <div id="home">
    <div class="search" style="width: 1300px; margin: 0 auto">
      <a-form :model="searchParams" layout="inline">
        <a-form-item field="title" tooltip="搜索题目标题" label="标题">
          <a-input
            style="min-width: 250px"
            v-model="searchParams.title"
            placeholder="输入标题进行搜索..."
          />
        </a-form-item>
        <a-form-item field="tags" label="标签">
          <a-input-tag
            style="min-width: 250px"
            v-model="searchParams.tags"
            placeholder="输入标签（回车确认）进行搜索..."
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="doSubmit">搜索</a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-divider />
    <a-table
      style="width: 1300px; margin: 0 auto"
      :bordered="{ cell: true }"
      :columns="columns"
      :data="dataList"
      @page-change="onPageChange"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total: total,
      }"
    >
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD HH:mm") }}
      </template>
      <template #tags="{ record }">
        <div>
          <a-scrollbar style="overflow: auto; height: 40px">
            <a-space>
              <a-tag
                v-for="tag in record.tags"
                :key="tag"
                :content="tag"
                color="arcoblue"
              >
                {{ tag }}
              </a-tag>
            </a-space>
          </a-scrollbar>
        </div>
      </template>
      <template #ACRate="{ record }">
        <div v-if="record.submitNum === 0">0 %</div>
        <div v-else>
          {{ ((record.acceptedNum / record.submitNum) * 100).toFixed(1) }}
          %
        </div>
      </template>
      <template #optional="{ record }">
        <router-link :to="`/question/do/${record.id}`">
          <a-button size="mini" type="primary">去答题</a-button>
        </router-link>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import Message from "@arco-design/web-vue/es/message";
import moment from "moment";
import {
  QuestionControllerService,
  QuestionQueryRequest,
  QuestionVO,
} from "../../generated";

/**
 * 初始化搜索参数
 */
const initSearchParams = {
  pageSize: 10,
  current: 1,
};

/**
 * 搜索参数
 */
let searchParams = ref({
  ...initSearchParams,
} as QuestionQueryRequest);

const dataList = ref<QuestionVO[]>([]);
const total = ref(0);

/**
 * 数据加载
 */
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 200) {
    dataList.value = res.data.records || [];
    total.value = res.data?.total || 0;
  } else {
    Message.error("获取题目数据失败," + res.message);
  }
};

/**
 * 监听 searchParams 变化，重新加载数据
 */
watchEffect(() => {
  loadData();
});

/**
 * 分页变化
 * @param page
 */
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * 提交表单进行搜索
 */
const doSubmit = () => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    width: 100,
    fixed: "left",
  },
  {
    title: "标题",
    dataIndex: "title",
    width: 150,
    innerHeight: 200,
    ellipsis: true,
    tooltip: true,
  },
  {
    title: "标签",
    dataIndex: "tags",
    slotName: "tags",
    width: 150,
    ellipsis: false,
  },
  {
    title: "通过率",
    slotName: "ACRate",
    align: "center",
    width: 50,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    slotName: "createTime",
    align: "center",
    width: 100,
  },
  {
    title: "操作",
    slotName: "optional",
    width: 60,
    align: "center",
    fixed: "right",
  },
];
</script>
