const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/_shared.scss";`,
      },
    },
  },
  chainWebpack: (config) => {
    config.module.rules.delete("eslint");
  },
});
