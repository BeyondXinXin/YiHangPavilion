import { siteConfig } from './site.config';

export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'],
  app: {
    rootId: 'nuxt-root',
    head: {
      meta: [
        { name: 'description', content: siteConfig.description },
        { name: 'author', content: siteConfig.author },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'revisit-after', content: '7 days' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { charset: 'UTF-8' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      ],
      noscript: [{ children: 'JavaScript is required' }],
      htmlAttrs: {
        lang: siteConfig.lang,
      },
      bodyAttrs: {
        class: 'font-sans',
      },
    },
  },
  content: {
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'vitesse-dark',
        sepia: 'monokai',
      },
      preload: ['c', 'cpp', 'java'],
    },
  },
  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/styles/global.scss',
    '@/assets/styles/theme.css',
    '@/assets/styles/markdown.scss',
  ],
  devtools: {
    enabled: false,
  },
  vite: {
    server: {
      hmr: {
        overlay: false,
      },
    },
  },
  compatibilityDate: '2024-08-18'
});
