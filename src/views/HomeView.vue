<template>
  <div class="home">
    <MdEditor :value="mdValue" :handle-change="handleMdChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";

const mdValue = ref("***欢迎使用 Vue3 前端万用模版***");
const handleMdChange = (val: string) => {
  mdValue.value = val;
};
</script>
