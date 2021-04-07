const { createSecureHeaders } = require('next-secure-headers')
const withPWA = require('next-pwa')
const prod = process.env.NODE_ENV === 'production'

module.exports = withPWA({
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
  // net-pwa | https://github.com/GoogleChrome/workbox/issues/1790#issuecomment-620894023
  pwa: {
    disable: prod ? false : true,
    dest: 'public',
    publicExcludes: ['!img/**/*'],
  },
})
