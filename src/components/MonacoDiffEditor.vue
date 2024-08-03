<!-- 代码对比编辑器 -->
<template>
  <div id="diff-editor" ref="codeDiffEditorRef" style="height: 400px"></div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  toRaw,
  withDefaults,
  defineProps,
  onBeforeUnmount,
} from "vue";
import * as monaco from "monaco-editor";

/**
 * 定义组件属性类型
 */
interface Props {
  originalModelValue: string;
  modifiedModelValue: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  originalModelValue: () => "",
  modifiedModelValue: () => "",
  handleChange: (val: string) => {
    console.log(val);
  },
});

const codeDiffEditorRef = ref();

onMounted(() => {
  if (!codeDiffEditorRef.value) {
    return;
  }
  const diffEditor = monaco.editor.createDiffEditor(codeDiffEditorRef.value, {
    theme: "vs-dark", // 主题
    roundedSelection: false, // 右侧不显示编辑器预览框
    automaticLayout: true, // 自动布局
    fontSize: 14, // 字体大小
    lineNumbers: "on", // 开启行号
    originalEditable: true, // 左侧可编辑
    readOnly: true, // 右侧只读
    diffWordWrap: "on",
    wordWrap: "on",
    colorDecorators: true, // 开启着色
    minimap: {
      enabled: false, // 关闭小地图
    },
  });

  // 设置左边代码
  const originalModel = monaco.editor.createModel(
    props.originalModelValue,
    "java"
  );
  // 设置右边代码
  const modifiedModel = monaco.editor.createModel(
    props.modifiedModelValue,
    "java"
  );

  diffEditor.setModel({
    original: originalModel,
    modified: modifiedModel,
  });

  // // 监听左侧（原始代码）内容变化
  originalModel.onDidChangeContent(() => {
    props.handleChange(toRaw(originalModel.getValue()));
  });

  // 在组件销毁之前释放编辑器资源
  onBeforeUnmount(() => {
    if (diffEditor) {
      diffEditor.dispose();
    }
  });
});
</script>

<style scoped></style>
