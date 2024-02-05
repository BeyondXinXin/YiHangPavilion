import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'text-title': 'text-xl sm:text-3xl',
    hover: 'op-70 hover:op-100 cursor-pointer transition-opacity',
    'deep-hover': 'op-20 hover:op-70 cursor-pointer transition-opacity',
    bd: 'border-gray-500 border-1',
    'text-deep': 'c-black dark:c-white',
    // 'nav-link': ' ',
    // 'nav-link-hover': ' color: '#333333' ',
  },

  theme: {
    colors: {
      c_primary: 'var(--c-primary)',
      c_highlight: 'var(--c-highlight)',
      c_lowlight: 'var(--c-lowlight)',

      c_bg: 'var(--c-bg)',
      c_bg_navigation: 'var(--c-bg-main)',
      c_bg_input: 'var(--bg-input)',
    },
    extend: {
      borderRadius: {
        common: 'var(--common-rd)',
      },
    },
  },

  presets: [
    presetUno({
      dark: 'class',
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: ['Inter', 'Noto Sans Simplified Chinese'],
        mono: ['Fira Mono:400,700'],
        hand: ['Dancing Script'],
        msz: ['Ma Shan Zheng'],
      },
    }),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        width: '1.2em',
        height: '1.2em',
      },
    }),
  ],

  transformers: [transformerVariantGroup()],
});
