<template>
  <div class="mx-aut">
    <div class="pb-2 flex flex-row">
      <span class="flex text-xl font-bold pr-5">Output</span>
      <label class="flex"> <input type="radio" id="iformatrad" name="out-iformat" :value="false" v-model="isDeg" />弧度</label>
      <label class="flex"> <input type="radio" id="iformatdeg" name="out-iformat" :value="true" v-model="isDeg" />角度 </label>
    </div>

    <div v-for="(item, index) in  outputs " :key="index" class="p-0">
      {{ item.title }}<br>
      <textarea class="p-0 pl-5 border-1 w-full font-bold bg-transparent" :rows="item.rowNum" readonly :value="item.text"></textarea>
    </div>

  </div>
</template>

<script>
import * as THREE from "three";
const EULER_ORDER_LIST = ["XYZ", "XZY", "YXZ", "YZX", "ZXY", "ZYX"];

export default {
  data() {
    return {
      isDeg: false,
      quat: new THREE.Quaternion(),
      m: new THREE.Matrix4(),
      axis: [0, 0, 0],
      angle: 0.0,
      outputs: [
        { name: "rotationMatrix", rowNum: 3, text: "", title: "旋转矩阵" },
        { name: "quaternion", rowNum: 1, text: "", title: "四元数" },
        { name: "axisAngle", rowNum: 1, text: "", title: "轴角" },
        { name: "rotationVector", rowNum: 1, text: "", title: "旋转向量" },
        { name: "EulerAngle", rowNum: 6, text: "", title: "欧拉角" },
      ],
    };
  },

  computed: {
    rotationMatrixString() {
      const r = this.m.elements;
      const rows = [
        [r[0], r[4], r[8]],
        [r[1], r[5], r[9]],
        [r[2], r[6], r[10]],
      ];
      const s = rows.map(row => `[ ${this.formatNumber(row[0])}, ${this.formatNumber(row[1])}, ${this.formatNumber(row[2])} ]`).join(";\n  ");
      return `[ ${s} ]`;
    },

    quaternionString() {
      return `[  ${this.quat.x.toFixed(7)}  ,  ${this.quat.y.toFixed(7)}  ,  ${this.quat.z.toFixed(7)}  ,  ${this.quat.w.toFixed(7)}  ]`;
    },

    axisAngleString() {
      return `{ [ ${this.formatNumber(this.axis[0])}  ,  ${this.formatNumber(this.axis[1])}  ,  ${this.formatNumber(this.axis[2])}  ]   ${this.formatAngle(this.angle)}  }`;
    },

    rotationVectorString() {
      return `[ ${this.formatAngle(this.axis[0] * this.angle)}  ,  ${this.formatAngle(this.axis[1] * this.angle)}  ,  ${this.formatAngle(this.axis[2] * this.angle)}  ]`;
    },

    EulerAngleString() {
      var eu = new THREE.Euler();
      var s = "";
      for (var i = 0; i < EULER_ORDER_LIST.length; i++) {
        var eulerType = EULER_ORDER_LIST[i];
        eu.setFromRotationMatrix(this.m, eulerType);
        s += eulerType +
          "  [ x: " + this.formatAngle(eu.toArray()[0]) +
          ", y: " + this.formatAngle(eu.toArray()[1]) +
          ", z: " + this.formatAngle(eu.toArray()[2]) + " ]\n";
      }
      s = s.slice(0, -1);
      return s;
    },
  },

  watch: {
    isDeg: {
      handler() {
        this.updateOutputs();
      },
      deep: true,
    },
  },

  methods: {
    handleInput(newNumber) {
      this.quat.set(...newNumber);
      this.m.makeRotationFromQuaternion(this.quat);
      this.updateAxisAngle();
      this.updateOutputs();
    },

    updateAxisAngle() {
      this.angle = 2 * Math.acos(this.quat.w);
      if (Math.abs(1 - this.quat.w * this.quat.w) < 0.000001) {
        this.axis = [this.quat.x, this.quat.y, this.quat.z];
      } else {
        const s = Math.sqrt(1 - this.quat.w * this.quat.w);
        this.axis = [this.quat.x / s, this.quat.y / s, this.quat.z / s];
      }
    },

    updateOutputs() {
      this.outputs.forEach(output => {
        switch (output.name) {
          case "rotationMatrix":
            output.text = this.rotationMatrixString;
            break;
          case "quaternion":
            output.text = this.quaternionString;
            break;
          case "axisAngle":
            output.text = this.axisAngleString;
            break;
          case "rotationVector":
            output.text = this.rotationVectorString;
            break;
          case "EulerAngle":
            output.text = this.EulerAngleString;
            break;
          default:
            break;
        }
      });
    },

    formatAngle(x) {
      if (this.isDeg) {
        return this.formatNumber(x * 180 / Math.PI);
      } else {
        return this.formatNumber(x);
      }
    },

    formatNumber(x) {
      var parsed = parseFloat(x);
      if (isNaN(parsed) || !isFinite(parsed)) {
        return x;
      }
      var formatted = parsed.toFixed(7).replace(/\.?0+$/, ''); // 去掉多余的零
      if (parsed >= 0) {
        formatted = " " + formatted;
      }
      return formatted;
    }
  },

  mounted() {
    this.updateOutputs();
  },
}
</script>
