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
            .options({ /* ... */ });
    }
};