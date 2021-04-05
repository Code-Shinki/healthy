import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styles from 'styles/pages/404.module.scss'
import { SITE_DOMAIN, SITE_TITLE } from 'utils/env'

const Error: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${SITE_DOMAIN}/404`} />
        <title>{`404 - ${SITE_TITLE}`}</title>
        <meta name="description" content="アプリケーションにエラーが発生したためにリダイレクトされたページです。" />
        <meta property="og:url" content={`${SITE_DOMAIN}/404`} />
        <meta property="og:title" content={`404 - ${SITE_TITLE}`} />
        <meta
          property="og:description"
          content="アプリケーションにエラーが発生したためにリダイレクトされたページです。"
        />
        <meta property="og:image" content={`${SITE_DOMAIN}/img/og-image.jpg`} />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div className={styles.root}>
        <div className={styles.container}>
          <h1 className={styles.title}>404</h1>
          <p className={styles.description}>大変申し訳ございません。</p>
          <p className={styles.description}>サーバー側にてエラーが発生いたしました。</p>
          <p className={styles.description}>
            <Link href="/dashboard">
              <a className={styles.link}>ダッシュボード</a>
            </Link>
            または
            <Link href="/">
              <a className={styles.link}>トップページ</a>
            </Link>
            からアプリケーションにお戻りください。
          </p>
          <p className={styles.description}>
            お困りの際は
            <a href="https://twitter.com/code_shinki" target="_blank" rel="noopener noreferrer" className={styles.link}>
              開発者 (Twitter)
            </a>
            へご連絡ください。
          </p>
        </div>
      </div>
    </>
  )
}

export default Error
