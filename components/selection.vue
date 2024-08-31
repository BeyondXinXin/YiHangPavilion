<template>
    <div w-full>
        <div my2 ml-4> {{ title }} </div>
        <NSelect v-model:value="internalValue" :options="options as any" />
    </div>
</template>

<script lang="ts" setup>
import { NSelect } from 'naive-ui';
import { computed } from 'vue';

// 接收父组件传入的 props
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    options: {
        type: Array,
        required: true,
    },
    modelValue: {
        type: [String, Number],
        required: true,
    },
});

// 定义一个 emits，用于触发父组件的事件
const emits = defineEmits(['update:modelValue']);

// 使用 computed 定义 internalValue，用于双向绑定
const internalValue = computed({
    get: () => props.modelValue,  // 从 props 中获取 modelValue
    set: (val) => emits('update:modelValue', val),  // 触发 update:modelValue 事件，将新的值传递给父组件
});

</script>
