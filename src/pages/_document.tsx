import { ServerStyleSheets } from '@material-ui/core/styles'
import { randomBytes } from 'crypto'
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

type Props = {
  nonce: string
}

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const nonce = randomBytes(128).toString('base64')
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      nonce,
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    }
  }

  render(): JSX.Element {
    const nonce = this.props.nonce
    const csp = `object-src 'none'; base-uri 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: 'nonce-${nonce}' 'strict-dynamic'`

    return (
      <Html lang="ja" prefix="og: https://ogp.me/ns#">
        <Head nonce={nonce}>
          <meta httpEquiv="Content-Security-Policy" content={csp} />
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    )
  }
}

export default MyDocument
