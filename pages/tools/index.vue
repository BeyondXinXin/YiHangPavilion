<template>
  <div class="flex mx-[20px] w-[1400px]">


    <ul class="list-none p-0">
      <li v-for="(tool, index) in tools" :key="index" @click="selectTool(index)" :class="[index === selectedToolIndex ? 'border-orange font-bold color-orange' : 'border-transparent',
        'p-[8px] cursor-pointer transition duration-300 border-r hover:color-orange']">
        {{ tool.name }}
      </li>
    </ul>


    <div class="py-2 px-8 flex-1">
      <component :is="selectedTool.component"></component>
    </div>

  </div>
</template>  

<script>
import ExternalTools from '~/components/tools/external-tools.vue';
import CoordinateConverter from '~/components/tools/coordinate-converter.vue';

export default {
  data() {
    return {
      tools: [
        { name: '外部工具', component: ExternalTools },
        { name: '坐标转换', component: CoordinateConverter },
      ],
      selectedToolIndex: 0,
    };
  },
  computed: {
    selectedTool() {
      return this.tools[this.selectedToolIndex];
    },
  },
  methods: {
    selectTool(index) {
      this.selectedToolIndex = index;
    },
  },
};
</script>

