<template>
  <div class="max-w-[450px] mx-auto py-5 px-5 border border-gray-300 rounded-lg shadow-sm">

    <h1 class="text-xl font-bold text-center mb-6">进制转换</h1>

    <div class="flex items-center gap-2 mb-4">
      <label for="originalNumber" class="text-sm w-[60px]">原始数字:</label>
      <input v-model="originalNumber" type="text" class="flex-1 px-2 py-1 border rounded" id="originalNumber"
        @input="convertBase" />
    </div>

    <div class="flex items-center gap-2 mb-4">
      <label for="originalBase" class="text-sm w-[60px]">原始进制:</label>
      <input type="number" v-model="originalBase" id="originalBase" min="2" max="32" @input="convertBase"
        class="flex-1 px-2 py-1 border rounded" />
    </div>

    <div class="flex items-center gap-2 mb-4">
      <label for="targetBase" class="text-sm w-[60px]">目标进制:</label>
      <input type="number" v-model="targetBase" id="targetBase" min="2" max="32" @input="convertBase"
        class="flex-1 px-2 py-1 border rounded" />
    </div>

    <div v-if="convertedNumber" class="mt-4 flex flex-row gap-2 items-center">
      <label class="text-sm w-[60px]">转换结果:</label>
      <span class="flex px-2 py-1 border rounded"> {{ convertedNumber }} </span>
    </div>

  </div>
</template>  


<script>
export default {
  data() {
    return {
      originalNumber: "",
      originalBase: 10,
      targetBase: 2,
      convertedNumber: "",
    };
  },
  methods: {
    convertBase() {
      try {
        const parsedNumber = parseInt(this.originalNumber, this.originalBase);
        if (isNaN(parsedNumber)) {
          throw new Error("Invalid input");
        }

        this.convertedNumber = parsedNumber.toString(this.targetBase);
      } catch (error) {
        this.$notify({
          title: "错误",
          message: "无法进行进制转换，请检查输入",
          type: "error",
        });
      }
    },
  },
};
</script>
