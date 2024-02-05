<template>
  <div class="max-w-[450px] mx-auto py-5 px-5 border border-gray-300 rounded-lg shadow-sm">

    <h1 class="text-xl font-bold text-center mb-6">随机密码</h1>

    <div class="flex items-center gap-2 mb-4">
      <label for="passwordLength" class="text-sm w-[60px]">密码长度:</label>
      <input v-model="passwordLength" type="number" class="flex-1 px-2 py-1 border rounded" id="passwordLength" min="4"
        max="12" @input="convertBase" />
      <button @click="generatePassword"
        class="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">生成密码</button>
    </div>



    <div v-if="generatedPassword" class="mt-4 flex flex-row gap-2 items-center">
      <label class="text-sm w-[60px]">生成密码:</label>
      <span class="flex px-2 py-1 border rounded"> {{ generatedPassword }} </span>
      <button @click="copyPasswordToClipboard"
        class="px-3 py-1 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600">复制到剪贴板</button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      passwordLength: 8, // 默认密码长度
      generatedPassword: "", // 生成的密码
    };
  },
  methods: {
    generatePassword() {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};:'\",.<>/?\\|~`";
      let password = "";
      for (let i = 0; i < this.passwordLength; i++) {
        password += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      this.generatedPassword = password;
    },
    copyPasswordToClipboard() {
      /* 使用浏览器API将文本复制到剪贴板 */
      navigator.clipboard
        .writeText(this.generatedPassword)
        .then(() => {
          this.$notify({
            title: "成功",
            message: "密码已复制到剪贴板",
            type: "success",
          });
        })
        .catch((err) => {
          this.$notify({
            title: "错误",
            message: "无法复制密码到剪贴板",
            type: "error",
          });
        });
    },
  },
};
</script>
