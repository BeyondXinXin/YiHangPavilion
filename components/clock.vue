
<template>
    <div text-center mt-5 h-10>
        <div text-5xl h-8 v-if="true">{{ time }}</div>
        <p text="20px" mt-8>
            <span>{{ date }} </span>
            <span ml-2>{{ week }}</span>
            <span ml-2>{{ lunarDate }}</span>
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import solarLunar from 'solarlunar-es';

const date = ref('');
const time = ref('');
const lunarDate = ref('');
const week = ref('');
const lang = "zh-CN";

let timeInterval: ReturnType<typeof setInterval> | null = null;

refreshTime();

function refreshTime() {
    const now = new Date();
    date.value = now.toLocaleString(lang, { month: 'long', day: 'numeric' });
    week.value = now.toLocaleString(lang, { weekday: 'long' });
    time.value = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    if (!lunarDate.value || time.value === '00:00') {
        const now = new Date();
        const [year, month, day] = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
        const lunar = solarLunar.solar2lunar(year, month, day);
        if (typeof lunar !== 'number') {
            lunarDate.value = `${lunar.gzYear}${lunar.animal}年${lunar.monthCn}${lunar.dayCn}`;
        }
    }
}

onMounted(() => {
    refreshTime();
    timeInterval = setInterval(refreshTime, 1000);
})

onBeforeUnmount(() => {
    if (timeInterval) {
        clearInterval(timeInterval);
    }
});

</script>
