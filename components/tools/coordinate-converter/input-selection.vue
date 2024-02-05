<template>
    <div :class="[isSelected ? ' ' : '', 'p-2 mb-5']">

        <div class="pb-2">{{ title }}</div>

        <template v-if="rows">
            <div class="flex -mx-2 ml-10 pb-2" v-for="(  row, rowIndex  ) in   rows  " :key="'row' + rowIndex">
                <input class="w-[110px] h-8 p-1 mx-2 border-b bg-transparent" type="number"
                    pattern="\d+(\.\d*)?" v-for="(  value, colIndex  ) in   row  " :key="'col' + colIndex"
                    v-model.number="rows[rowIndex][colIndex]" @input="handleInput" />
            </div>
        </template>

        <template v-else>
            <template v-for="(  id, index  ) in   inputs  " :key="index">
                <span class="" v-if="index % 2 === 0">{{ labels[index / 2] }}</span>
                
                <input class="w-[110px] h-8 p-1 mx-2 border-b bg-transparent" type="number"
                    pattern="\d+(\.\d*)?" :id="id" v-model.number="inputArray[index]" @input="handleInput" />
            </template>
        </template>

    </div>
</template>
  
<script>

export default {
    data() {
        return { isSelected: false, }
    },
    props: {
        title: String,
        mode: Number,
        rows: Array,
        inputArray: {
            type: Array,
            default: () => [0, 0, 0, 0],
        },
        inputs: Array,
    },
    computed: {
        labels() {
            return ['x', 'y', 'z', 'w'];
        },
    },
    methods: {
        handleInput() {
            if (this.rows) {
                this.$emit('numberChange', { mode: this.mode, value: this.rows });
            } else {
                var data = { mode: this.mode, value: this.inputArray };
                console.log(data);
                this.$emit('numberChange', data);
            }
            this.isSelected = true;
        },
        setSelected(select) {
            this.isSelected = select;
        },

    },
};
</script>
