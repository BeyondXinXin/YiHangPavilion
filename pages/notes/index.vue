<template>
  <div class="w-[1080px] flex flex-col gap-2 relative">
    <div class="flex flex-col gap-4 p4" v-for="note in notes" :key="note.id">

      <div class="text-2xl font-bold">{{ note.name }}</div>

      <div class="border-b-1 border-transparent hover:border-b-1 hover:border-orange" v-for="subclass in note.subclass"
        :key="subclass.id">
        <div class="flex flex-row gap-4">
          <div class="flex w-[120px] justify-center">【 {{ subclass.name }} 】</div>
          <div class="flex w-[100px] text-right color-gray">Document</div>
          <a v-for="link1 in subclass.document" :href="link1.link" :key="link1.link" target="_blank"
            rel="nofollow external" class="flex hover:color-blue"> {{ link1.name }} </a>
          <div class="flex-1"></div>
        </div>

        <div v-if="subclass.article && subclass.article.length" class="flex flex-row">
          <div class="w-[220px] text-right color-gray mr-8">Article</div>
          <div class="flex flex-col">
            <a v-for="link1 in subclass.article" :href="link1.link" :key="link1.link" target="_blank"
              rel="nofollow external" class=" hover:color-blue">
              {{ link1.name }} </a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<script setup>
import notes from './notes.ts';

</script>
