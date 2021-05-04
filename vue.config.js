module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/assets/sass/_variables.sass"`
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule("vue")
            .use("vue-svg-inline-loader")
            .loader("vue-svg-inline-loader")
            .options({ /* ... */});
    },
    pwa: {
        name:"Medusa",
        themeColor: "#fff",
        msTileColor: "#fff",
        appleMobileWebAppCache: "yes",
        workboxPluginMode: "InjectManifest",
        workboxOptions:{
            swSrc: "src/service-worker.js"
        },
        manifestOptions: {
            background_color: "#677eb6",
            icons: [
                {
                    'src': 'icon/android-icon-192x192.png',
                    'sizes': '192x192',
                    'type': 'image/png'
                },
                {
                    'src': 'icon/android-icon-512x512.png',
                    'sizes': '512x512',
                    'type': 'image/png'
                },
                {
                    'src': 'icon/maskable-192.png',
                    'sizes': '192x192',
                    'type': 'image/png',
                    'purpose': 'maskable'
                },
                {
                    'src': 'icon/maskable-512.png',
                    'sizes': '512x512',
                    'type': 'image/png',
                    'purpose': 'maskable'
                }
            ]
        },
        iconPaths:{
            favicon32: 'icon/favicon-32x32.png',
            favicon16: 'icon/favicon-16x16.png',
            appleTouchIcon: 'icon/apple-icon-152x152.png',
            maskIcon: 'icon/LogoMedusa.svg',
            msTileImage: 'icon/ms-icon-144x144.png'
        }
    }
};