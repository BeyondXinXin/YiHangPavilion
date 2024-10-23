<template>
  <div class="mx-aut">
    <span class="flex text-xl font-bold pr-5">Input</span>
    <NRadioGroup v-model:value="isDeg" class="py-3">
      <NRadio :value="true">角度</NRadio>
      <NRadio :value="false">弧度</NRadio>
    </NRadioGroup>

    <InputSection title="旋转矩阵" :rows="matrix" @numberChange="handleInput" :mode="0" />
    <InputSection title="四元数" @numberChange="handleInput" :mode="1" />
    <InputSection title="轴角" @numberChange="handleInput" :mode="2" />
    <InputSection title="旋转向量" @numberChange="handleInput" :mode="3" />
    <InputSection title="欧拉角" @numberChange="handleInput" :mode="4" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import * as THREE from 'three';
import InputSection from './input-selection.vue';
import { NRadioGroup, NRadio } from 'naive-ui';

const isDeg = ref(false);
const inputNumber = ref(0);
const localInputNumber = reactive([0, 0, 0, 0]);

const matrix = reactive([
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
]);

const inputMode = ref(-1);


function handleInput(data: { mode: number; value: number[] | number[][] }) {
  if (data.mode !== -1) {
    inputMode.value = data.mode;
  }

  let q = new THREE.Quaternion();

  switch (inputMode.value) {
    case 0:
      if (Array.isArray(data.value) && Array.isArray(data.value[0])) {
        const m = new THREE.Matrix4();
        m.set(
          data.value[0][0], data.value[0][1], data.value[0][2], 0,
          data.value[1][0], data.value[1][1], data.value[1][2], 0,
          data.value[2][0], data.value[2][1], data.value[2][2], 0,
          0, 0, 0, 1
        );
        q.setFromRotationMatrix(m);
      } else {
        console.error("Invalid data structure for rotation matrix");
        return;
      }
      break;
    case 1:
      if (Array.isArray(data.value) && data.value.length >= 4) {
        q = new THREE.Quaternion(data.value[0], data.value[1], data.value[2], data.value[3]);
      } else {
        console.error("Invalid data structure for quaternion");
        return;
      }
      break;
    case 2:
      if (Array.isArray(data.value) && data.value.length >= 4) {
        q = new THREE.Quaternion();
        const axis = new THREE.Vector3(data.value[0], data.value[1], data.value[2]);
        axis.normalize();
        q.setFromAxisAngle(axis, formatAngle(data.value[3]));
      } else {
        console.error("Invalid data structure for axis-angle");
        return;
      }
      break;
    case 3:
      const r0 = document.getElementById("r0") as HTMLInputElement;
      const r1 = document.getElementById("r1") as HTMLInputElement;
      const r2 = document.getElementById("r2") as HTMLInputElement;
      if (r0 && r1 && r2) {
        const axisVec = new THREE.Vector3(
          parseFloat(r0.value),
          parseFloat(r1.value),
          parseFloat(r2.value)
        );
        const angle = formatAngle(axisVec.length());
        axisVec.normalize();
        q.setFromAxisAngle(axisVec, angle);
      } else {
        console.error("Invalid HTML elements for rotation vector");
        return;
      }
      break;
    case 4:
      if (Array.isArray(data.value) && data.value.length >= 3) {
        const e = new THREE.Euler(
          formatAngle(data.value[0] as number),
          formatAngle(data.value[1] as number),
          formatAngle(data.value[2] as number)
        );
        q.setFromEuler(e);
      } else {
        console.error("Invalid data structure for Euler angles");
        return;
      }
      break;
    default:
      return;
  }

  q.normalize();
  localInputNumber[0] = q.x;
  localInputNumber[1] = q.y;
  localInputNumber[2] = q.z;
  localInputNumber[3] = q.w;

  emit('numberChange', [...localInputNumber]);
}

// Emit events
const emit = defineEmits<{
  (e: 'numberChange', value: number[]): void;
}>();

function toReal(x: number | string) {
  const num = parseFloat(x as string);
  if (!isNaN(num) && isFinite(num)) {
    return parseFloat(num.toFixed(7));
  } else {
    return x;
  }
}

function formatAngle(x: number) {
  return isDeg.value ? x * Math.PI / 180 : x;
}
</script>