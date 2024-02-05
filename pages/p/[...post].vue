<template>
  <div class="max-w-70ch m-auto">
    <section class="prose relative slide-enter-content">
      <ContentDoc :path="path">

        <template #default="{ doc }">
          <DocBack />
          <DocRender :article="doc" />
          <DocToc v-if="doc.body" :toc="doc.body.toc" />
        </template>

        <template #empty>
          <h1 class="text-center">Document is empty😅</h1>
        </template>

        <template #not-found>
          <h1 class="text-center">Not Found Any Document😗</h1>
        </template>

      </ContentDoc>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const post = route.params.post as Array<string>;
const path = post.join('/');

import DocBack from '~/components/doc/doc-back.vue';
import DocRender from '~/components/doc/doc-render.vue';
import DocToc from '~/components/doc/doc-toc.vue';

</script>