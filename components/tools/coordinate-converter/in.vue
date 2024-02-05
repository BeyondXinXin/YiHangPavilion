<template>
  <div class="mx-aut">
    <div class="pb-2 flex flex-row">
      <span class="flex text-xl font-bold pr-5">Input</span>
      <label><input type="radio" id="iformatrad" name="iformat" :value="false" v-model="isDeg"
          @change="handleInput(-1)" />弧度</label>
      <label><input type="radio" id="iformatdeg" name="iformat" :value="true" v-model="isDeg"
          @change="handleInput(-1)" />角度</label>
    </div>

    <InputSection title="旋转矩阵" :rows="matrix" @numberChange="handleInput" :mode="0" />
    <InputSection title="四元数" :inputs="['q0', 'q1', 'q2', 'q3']" @numberChange="handleInput" :mode="1" />
    <InputSection title="轴角" :inputs="['a0', 'a1', 'a2', 'a3']" @numberChange="handleInput" :mode="2" />
    <InputSection title="旋转向量" :inputs="['r0', 'r1', 'r2']" @numberChange="handleInput" :mode="3" />
    <InputSection title="欧拉角" :inputs="['e0', 'e1', 'e2']" @numberChange="handleInput" :mode="4" />

  </div>
</template>

<script>
import * as THREE from "three";
import InputSection from "./input-selection.vue";

export default {
  components: {
    InputSection,
  },
  data() {
    return {
      isDeg: false,
      inputNumber: 0,
      localInputNumber: [0, 0, 0, 0],

      matrix: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ],
    };
  },
  methods: {
    handleInput(data) {
      if (data.mode !== -1) {
        this.inputMode = data.mode
      }
      var q = new THREE.Quaternion();
      switch (this.inputMode) {
        case 0:
          var m = new THREE.Matrix4();
          m.set(
            data.value[0][0], data.value[0][1], data.value[0][2], 0,
            data.value[1][0], data.value[1][1], data.value[1][2], 0,
            data.value[2][0], data.value[2][1], data.value[2][2], 0,
            0, 0, 0, 1
          );
          q.setFromRotationMatrix(m);
          break;
        case 1:
          q = new THREE.Quaternion(data.value[0], data.value[1], data.value[2], data.value[3]);
          break;
        case 2:
          q = new THREE.Quaternion();
          var axis = new THREE.Vector3(data.value[0], data.value[1], data.value[2]);
          axis.normalize();
          q.setFromAxisAngle(axis, this.formatAngle(data.value[3]));
          break;
        case 3:
          var axis = new THREE.Vector3(document.getElementById("r0").value,
            document.getElementById("r1").value,
            document.getElementById("r2").value);
          var angle;
          angle = this.formatAngle(axis.length());
          axis.normalize();
          q.setFromAxisAngle(axis, angle);
          break;
        case 4:
          var e = new THREE.Euler(
            this.formatAngle(data.value[0]),
            this.formatAngle(data.value[1]),
            this.formatAngle(data.value[2]));
          q.setFromEuler(e);
          break;
        default:
          return;
      }

      q.normalize();
      this.localInputNumber[0] = q.x;
      this.localInputNumber[1] = q.y;
      this.localInputNumber[2] = q.z;
      this.localInputNumber[3] = q.w;
      this.$emit("numberChange", this.localInputNumber);
    },
    toReal(x) {
      if (!isNaN(parseFloat(x)) && isFinite(parseFloat(x))) {
        return parseFloat(parseFloat(x).toFixed(7));
      } else {
        return x;
      }
    },
    formatAngle(x) {
      if (this.isDeg) {
        return x * Math.PI / 180;
      } else {
        return x;
      }
    },
  },
};
</script>




<!-- 

<div class="bg-gray-300 border border-white p-2 mb-5">
  <div class="pb-2">
    欧拉角
    <select class="w-[110px] h-8 p-1 mx-2 bg-white border border-gray-400 rounded" id="euler"
      onchange="handleInput(4)">
      <option value="XYZ">XYZ</option>
      <option value="XZY">XZY</option>
      <option value="YXZ">YXZ</option>
      <option value="YZX">YZX</option>
      <option value="ZXY">ZXY</option>
      <option value="ZYX" selected>ZYX</option>
    </select>
  </div>
  <span class=""> x</span>
  <input class="w-[110px] h-8 p-1 mx-2 bg-white border border-gray-400 rounded" type="number" pattern="\d+(\.\d*)?"
    id="e0" value="0" @input="handleInput(4)" />
  <span class=""> y</span>
  <input class="w-[110px] h-8 p-1 mx-2 bg-white border border-gray-400 rounded" type="number" pattern="\d+(\.\d*)?"
    id="e1" value="0" @input="handleInput(4)" />
  <span class=""> z</span>
  <input class="w-[110px] h-8 p-1 mx-2 bg-white border border-gray-400 rounded" type="number" pattern="\d+(\.\d*)?"
    id="e2" value="0" @input="handleInput(4)" />
</div> -->