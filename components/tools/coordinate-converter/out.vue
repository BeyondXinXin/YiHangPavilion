<template>
  <div class="mx-aut">

    <span class="flex text-xl font-bold pr-5">Output</span>
    <NRadioGroup v-model:value="isDeg" class="py-3">
      <NRadio :value="true">角度</NRadio>
      <NRadio :value="false">弧度</NRadio>
    </NRadioGroup>

    <div v-for="(item, index) in outputs " :key="index" class="p-0">
      {{ item.title }}<br>
      <textarea class="p-0 pl-5 border-1 w-full font-bold bg-transparent" :rows="item.rowNum" readonly
        :value="item.text"></textarea>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import * as THREE from 'three';
import { NRadio, NRadioGroup } from 'naive-ui';

const EULER_ORDER_LIST = ["XYZ", "XZY", "YXZ", "YZX", "ZXY", "ZYX"];

const isDeg = ref(false);
const quat = ref(new THREE.Quaternion());
const m = ref(new THREE.Matrix4());
const axis = ref([0, 0, 0]);
const angle = ref(0.0);

const outputs = ref([
  { name: "rotationMatrix", rowNum: 3, text: "", title: "旋转矩阵" },
  { name: "quaternion", rowNum: 1, text: "", title: "四元数" },
  { name: "axisAngle", rowNum: 1, text: "", title: "轴角" },
  { name: "rotationVector", rowNum: 1, text: "", title: "旋转向量" },
  { name: "EulerAngle", rowNum: 6, text: "", title: "欧拉角" },
]);

const rotationMatrixString = computed(() => {
  const r = m.value.elements;
  const rows = [
    [r[0], r[4], r[8]],
    [r[1], r[5], r[9]],
    [r[2], r[6], r[10]],
  ];
  return `[ ${rows.map(row => `[ ${formatNumber(row[0])}, ${formatNumber(row[1])}, ${formatNumber(row[2])} ]`).join(";\n  ")} ]`;
});

const quaternionString = computed(() => {
  return `[  ${quat.value.x.toFixed(7)}  ,  ${quat.value.y.toFixed(7)}  ,  ${quat.value.z.toFixed(7)}  ,  ${quat.value.w.toFixed(7)}  ]`;
});

const axisAngleString = computed(() => {
  return `{ [ ${formatNumber(axis.value[0])}  ,  ${formatNumber(axis.value[1])}  ,  ${formatNumber(axis.value[2])}  ]   ${formatAngle(angle.value)}  }`;
});

const rotationVectorString = computed(() => {
  return `[ ${formatAngle(axis.value[0] * angle.value)}  ,  ${formatAngle(axis.value[1] * angle.value)}  ,  ${formatAngle(axis.value[2] * angle.value)}  ]`;
});

const EulerAngleString = computed(() => {
  const eu = new THREE.Euler();
  let result = "";
  for (let i = 0; i < EULER_ORDER_LIST.length; i++) {
    const eulerType = EULER_ORDER_LIST[i];
    eu.setFromRotationMatrix(m.value, eulerType);
    result += `${eulerType}  [ x: ${formatAngle(eu.toArray()[0])}, y: ${formatAngle(eu.toArray()[1])}, z: ${formatAngle(eu.toArray()[2])} ]\n`;
  }
  return result.trim();
});

function handleInput(newNumber) {
  quat.value.set(...newNumber);
  m.value.makeRotationFromQuaternion(quat.value);
  updateAxisAngle();
  updateOutputs();
}

function updateAxisAngle() {
  angle.value = 2 * Math.acos(quat.value.w);
  if (Math.abs(1 - quat.value.w * quat.value.w) < 0.000001) {
    axis.value = [quat.value.x, quat.value.y, quat.value.z];
  } else {
    const s = Math.sqrt(1 - quat.value.w * quat.value.w);
    axis.value = [quat.value.x / s, quat.value.y / s, quat.value.z / s];
  }
}

function updateOutputs() {
  outputs.value.forEach(output => {
    switch (output.name) {
      case "rotationMatrix":
        output.text = rotationMatrixString.value;
        break;
      case "quaternion":
        output.text = quaternionString.value;
        break;
      case "axisAngle":
        output.text = axisAngleString.value;
        break;
      case "rotationVector":
        output.text = rotationVectorString.value;
        break;
      case "EulerAngle":
        output.text = EulerAngleString.value;
        break;
      default:
        break;
    }
  });
}

function formatAngle(x) {
  return isDeg.value ? formatNumber(x * 180 / Math.PI) : formatNumber(x);
}

function formatNumber(x) {
  const parsed = parseFloat(x);
  if (isNaN(parsed) || !isFinite(parsed)) {
    return x;
  }
  let formatted = parsed.toFixed(7).replace(/\.?0+$/, ''); // Remove trailing zeros
  if (parsed >= 0) {
    formatted = " " + formatted;
  }
  return formatted;
}

// Watch for changes in isDeg to update outputs
watch(isDeg, () => {
  updateOutputs();
}, { deep: true });

// Run updateOutputs on mounted
onMounted(() => {
  updateOutputs();
});
</script>
