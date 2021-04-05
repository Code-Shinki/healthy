import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Error: NextPage = () => {
  return (
    <>
      <Head>
        <title>Error</title>
      </Head>
      <p>何らかのエラーが発生しました。</p>
      <Link href="/">
        <a>TOP</a>
      </Link>
    </>
  )
}

export default Error
