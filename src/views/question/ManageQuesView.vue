<template>
  <a-table
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
      {{ formatDate(record.createTime) }}
    </template>
    <template #updateTime="{ record }">
      {{ formatDate(record.updateTime) }}
    </template>
    <template #judgeCase="{ record }">
      <a-table
        :scroll="scrollPercent"
        :scrollbar="true"
        :bordered="{ cell: true }"
        :columns="judgeCaseColumns"
        :data="parseJudgeCase(record.judgeCase)"
        :pagination="false"
      ></a-table>
    </template>
    <template #tags="{ record }">
      <div>
        <a-scrollbar style="overflow: auto; height: 40px">
          <a-space>
            <a-tag
              v-for="tag in JSON.parse(record.tags)"
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
    <template #optional="{ record }">
      <a-space>
        <router-link :to="`/admin/question/edit/${record.id}`">
          <a-button size="mini" type="primary" @click="doUpdate(record)"
            >修改
          </a-button>
        </router-link>

        <a-button size="mini" status="danger" @click="doDelete(record)"
          >删除
        </a-button>
      </a-space>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import message from "@arco-design/web-vue/es/message";
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";

/**
 * 子表格滚动条
 */
const scrollPercent = {
  x: "100%",
  y: 100,
};

/**
 * 初始化搜索参数
 */
const initSearchParams = {
  pageSize: 5,
  current: 1,
};

/**
 * 搜索参数
 */
let searchParams = ref({
  ...initSearchParams,
} as QuestionQueryRequest);

const dataList = ref<Question[]>([]);
const total = ref(0);

/**
 * 数据加载
 */
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 200) {
    const records = res.data.records || [];
    total.value = res.data?.total || 0;
    // 解析 JudgeConfig 字段
    records.forEach((record) => {
      const judgeConfig = JSON.parse(record.judgeConfig || "{}");
      record.timeLimit = judgeConfig.timeLimit;
      record.memoryLimit = judgeConfig.memoryLimit;
    });
    dataList.value = records;
  } else {
    message.error("获取题目数据失败," + res.message);
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
 * 删除问题
 * @param record
 */
const doDelete = async (record: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: record.id,
  });
  // 删除成功
  if (res.code === 200) {
    message.success("删除题目数据成功");
    // 重新加载数据
    await loadData();
  } else {
    message.error("删除题目数据失败," + res.message);
  }
};

/**
 * TODO 修改问题
 * @param record
 */
const doUpdate = (record: Question) => {
  console.log(record);
};

/**
 * 格式化日期
 * @param data
 */
const formatDate = (data: string) => {
  // 处理 data 为空的情况
  if (!data) {
    return "";
  }
  const date = new Date(data);
  // 手动提取年月日 时分
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

/**
 * 处理测试用例Json字符串
 */
const parseJudgeCase = (data: string) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};
/**
 * judgeCase 子表格
 */
const judgeCaseColumns = [
  {
    title: "输入",
    dataIndex: "input",
    width: 200,
    ellipsis: true,
    tooltip: true,
  },
  {
    title: "输出",
    dataIndex: "output",
    width: 200,
    ellipsis: true,
  },
];

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    width: 200,
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
    title: "描述",
    dataIndex: "content",
    width: 200,
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
    title: "测试用例",
    dataIndex: "judgeCase",
    slotName: "judgeCase",
    width: 500,
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
    slotName: "judgeConfig",
    children: [
      {
        title: "时间限制/ms",
        dataIndex: "timeLimit",
        width: 120,
      },
      {
        title: "内存限制/kb",
        dataIndex: "memoryLimit",
        width: 120,
      },
    ],
    width: 330,
    ellipsis: true,
    tooltip: true,
  },
  {
    title: "参考答案",
    dataIndex: "answer",
    width: 120,
    ellipsis: true,
    tooltip: true,
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
    width: 76,
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
    width: 76,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    slotName: "createTime",
    width: 160,
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    slotName: "updateTime",
    width: 160,
  },
  {
    title: "操作",
    slotName: "optional",
    width: 160,
    fixed: "right",
  },
];
</script>
