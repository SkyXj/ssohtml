const port = process.env.port || process.env.npm_config_port || 8777; // 端口

module.exports = {
    publicPath: '/',//publicPath取代了baseUrl
    outputDir: 'voyagehtml',
    lintOnSave: false,
    runtimeCompiler: true, //关键点在这  原来的 Compiler 换成了 runtimeCompiler
    // 调整内部的 webpack 配置。
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
    chainWebpack: () => {},
    configureWebpack: () => {},
    // 配置 webpack-dev-server 行为。
    devServer: {
        host: "0.0.0.0",
        port: port,
        proxy: {
          [process.env.VUE_APP_BASE_API]: {
            target: `http://localhost:8980`,
            changeOrigin: true,
            pathRewrite: {
              ["^" + process.env.VUE_APP_BASE_API]: ""
            }
          }
        },
        disableHostCheck: true
      },
  }
