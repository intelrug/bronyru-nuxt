export default {
  env: {},
  head: {
    title: 'bronyru',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'МагияДружбы - Творческое объединение' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://bronyru.info/_design/main_background.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900' },
    ],
    script: [
      { type: 'text/javascript', src: '/scripts/subtitles-octopus.js' },
      { type: 'text/javascript', src: 'https://vk.com/js/api/openapi.js?116' },
      { type: 'text/javascript', src: '/scripts/vk.js' },
    ],
    htmlAttrs: {
      class: ['page'],
    },
    bodyAttrs: {
      class: ['page__body', 'grid-12'],
    },
  },
  loading: { color: '#3B8070' },
  css: [],
  styleResources: {
    stylus: [
      '~assets/styl/variables.styl',
      '~assets/styl/mixins.styl',
    ],
  },
  build: {},
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/router',
    '@nuxtjs/style-resources',
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  plugins: [
    '~/plugins/vue2-touch-events',
  ],
  axios: {},
};
