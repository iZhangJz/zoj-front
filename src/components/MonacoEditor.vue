<!-- 代码编辑器 -->
<template>
  <div id="editor" ref="codeEditorRef" style="min-height: 565px"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRaw, withDefaults, defineProps, watch } from "vue";
import * as monaco from "monaco-editor";
import { PROGRAMMING_LANGUAGE_MAP } from "@/enum/CommonEnum";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  language?: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => PROGRAMMING_LANGUAGE_MAP.Java,
  handleChange: (val: string) => {
    console.log(val);
  },
});

const codeEditorRef = ref();
const editor = ref();

/**
 * 设置语言
 */
watch(
  () => props.language,
  () => {
    monaco.editor.setModelLanguage(
      toRaw(editor.value).getModel(),
      props.language
    );
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  editor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: "java",
    theme: "vs-dark", // 主题
    automaticLayout: true, // 自动布局
    tabSize: 2, // tab 缩进空格数
    fontSize: 14, // 字体大小
    lineNumbers: "on", // 开启行号
    readOnly: false, // 只读
    colorDecorators: true, // 开启着色
    minimap: {
      enabled: false, // 关闭小地图
    },
  });

  // 监听值变化
  editor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(editor.value).getValue());
  });
});
</script>
