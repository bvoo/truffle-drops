export default defineNuxtConfig({
  // @ts-ignore
  modules: [
    'nuxt-windicss',
    'nuxt-icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxt/devtools',
    '@nuxtjs/supabase',
  ],

  googleFonts: {
    prefetch: true,
    preconnect: true,
    preload: true,
    families: {
      'Roboto+Condensed': [500, 600, 700],
      Roboto: true,
      'JetBrains+Mono': true,
    },
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
  },

  css: ['@/assets/styles/global.scss', 'overlayscrollbars/overlayscrollbars.css'],
});
