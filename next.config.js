const { createSecureHeaders } = require('next-secure-headers')

module.exports = {
  // react-spring issue | https://github.com/pmndrs/react-spring/issues/1078
  webpack: (config) => {
    config.module.rules.push({
      test: /react-spring/,
      sideEffects: true,
    })
    return config
  },
  // X-Powered-Byヘッダを削除
  poweredByHeader: false,
  // next-secure-headers | https://github.com/jagaapple/next-secure-headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: createSecureHeaders(),
      },
    ]
  },
}
