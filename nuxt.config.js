import pkg from './package'

export default {
  mode: 'spa',

  // generate: {
  //   routes: [
  //     '/course',
  //     '/task',
  //     '/project',
  //     '/student'
  //   ]
  // },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'msapplication-TileColor', content: '#e54800'},
      { name: 'theme-color', content: '#ffffff'},
      { hid: 'ogTitle', property: 'og:title', content: pkg.name},
      { hid: 'ogUrl', property: 'og:url', content: 'https://aho.design/'},
      { hid: 'ogDescription', property: 'og:description', content: pkg.description},
      { hid: 'ogType', property: 'og:type', content:'website'},
      { hid: 'ogImage', property: 'og:image', content:'https://aho.design/aho-design_og.jpg'},
      { hid: 'twitterCard', name: 'twitter:card', content:'summary'},
      { name: 'twitter:site', content:'@AHO_Oslo'},
      { hid: 'twitterTitle', name: 'twitter:title', content: pkg.name},
      { hid: 'twitterDescription', name: 'twitter:description', content: pkg.description},
      { hid: 'twitterImage', name: 'twitter:image', content: 'https://aho.design/aho-design_twitter_summary.jpg'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
      { rel: 'manifest', href: '/site.webmanifest'},
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:400,700|IBM+Plex+Sans:400,400i,600,600i|IBM+Plex+Serif:400,400i,500,500i,600,600i' }
    ],
    script: [
      { src: '/js/lazysizes.min.js', async: true, defer: true }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    // CSS file in the project
    // 'bulma',
    '@/assets/css/site.sass',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    // '@nuxtjs/bulma',
  ],

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
