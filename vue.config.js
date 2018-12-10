module.exports = {
  chainWebpack: config => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end()

    config.module
      .rule('yaml')
      .test(/\.ya?ml$/)
      .use('yaml')
      .loader('yaml-import-loader')
      .options({ importRoot: true })
      .end()
  }
}
