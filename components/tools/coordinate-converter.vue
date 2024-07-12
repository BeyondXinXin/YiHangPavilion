<template>
  <div class="flex flex-col lg:flex-row max-w-screen-xl mx-auto">

    <div class="flex-1">
      <In @numberChange="handleNumberChange" />
    </div>

    <div class="flex-1 lg:ml-10">
      <Out ref="outRef" />
    </div>

  </div>
</template>


<script>
import In from "./coordinate-converter/in.vue";
import Out from "./coordinate-converter/out.vue";

export default {
  components: {
    In,
    Out,
  },
  data() {
    return {
    };
  },
  methods: {
    handleNumberChange(newNumber) {
      this.$refs.outRef.handleInput(newNumber)
    },
  },
};
</script>
