<template>

    <div class="p-1 mb-4 bg-gray-800 ">

        <div class="pb-2">{{ title }}</div>

        <template v-if="rows">
            <div class="flex flex-col gap-2">
                <template v-for="(row, rowIndex) in rows" :key="'row' + rowIndex">
                    <div class="flex flex-wrap gap-2 justify-start w-[300px]">
                        <NInputNumber class="w-[80px] h-8 p-0 mx-1" :show-button="false" :placeholder="0"
                            v-for="(value, colIndex) in row" :key="'col' + colIndex"
                            v-model:value="rows[rowIndex][colIndex]" @update:value="handleInput" />
                    </div>
                </template>
            </div>
        </template>
        <template v-else>
            <div class="flex items-center flex-wrap gap-2">
                <span v-for="(id, index) in labels" :key="index" class="flex items-center">
                    <span class="mr-2 flex items-center">{{ labels[index] }}</span>
                    <NInputNumber class="w-[80px]" :show-button="false" :placeholder="0"
                        v-model:value="inputArray[index]" @update:value="handleInput" />
                </span>
            </div>
        </template>

    </div>

</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import { NInputNumber } from 'naive-ui';

// Define props with types
const props = defineProps<{
    title: string;
    mode: number;
    rows?: number[][];
    inputArray?: number[];
}>();

// Provide default values for optional props
const inputArray = ref<number[]>(props.inputArray || [0, 0, 0, 0]);

// Emit events
const emit = defineEmits<{
    (e: 'numberChange', data: { mode: number; value: number[] | number[][] }): void;
}>();

// Computed property for labels
const labels = computed(() => {
    switch (props.mode) {
        case 1: return ['x', 'y', 'z', 'w'];
        case 2: return ['Axis x', 'y', 'z', 'Angle'];
        case 3: return ['Axis x', 'y', 'z'];
        case 4: return ['x', 'y', 'z'];
        default: return []; 1
    }
});

// Methods
function handleInput(v: number | null) {
    if (props.rows) {
        emit('numberChange', { mode: props.mode, value: props.rows });
    } else {
        emit('numberChange', { mode: props.mode, value: inputArray });
    }
}
</script>
