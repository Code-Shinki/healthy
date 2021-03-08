import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Top: NextPage = () => {
  return (
    <>
      <Head>
        <title>TOP</title>
      </Head>
      <h1>TOP</h1>
      <Link href="/dashboard">
        <a>To Dashboard</a>
      </Link>
      <Link href="/checkup">
        <a>To CheckUp</a>
      </Link>
    </>
  )
}

export default Top
