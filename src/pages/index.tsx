import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Top: NextPage = () => {
  return (
    <>
      <Head>
        <title>Healthy | 体調管理アプリ</title>
      </Head>
      <Link href="/login">
        <a>ログイン</a>
      </Link>
      <Link href="/signup">
        <a>新規作成</a>
      </Link>
    </>
  )
}

export default Top
