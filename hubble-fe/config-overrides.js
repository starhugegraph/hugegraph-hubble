const { override, addLessLoader,overrideDevServer } = require('customize-cra');

const devServerConfig = () => config => {
  return {
    ...config,
    proxy: {
      '/api': {
        target: 'http://172.24.194.64:8088',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      }
    }
  }
}

module.exports = {
  webpack: override(
    addLessLoader({
      javascriptEnabled: true
    })
  ),
  devServer: overrideDevServer(
    devServerConfig()
  )
}
