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
        themeColor: "#677eb6",
        msTileColor: "#677eb6",
        appleMobileWebAppCache: "yes",
        manifestOptions: {
            background_color: "#677eb6"
        },
        iconPaths:{
            favicon32: 'icon/favicon-32x32.png',
            favicon16: 'icon/favicon-16x16.png',
            appleTouchIcon: 'icon/apple-icon-152x152.png',
            maskIcon: 'img/LogoMedusa.svg',
            msTileImage: 'icon/ms-icon-144x144.png'
        }
    }
};