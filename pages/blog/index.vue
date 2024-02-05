<template>
  <div class="max-w-70ch m-auto">
    <PostList :posts="posts" />
  </div>
</template>

<script setup lang="ts">
import { getIncludedYearPosts } from '@/utils';
import PostList from "~/components/blog/post-list.vue";

const posts = await getIncludedYearPosts('blog');
</script>
