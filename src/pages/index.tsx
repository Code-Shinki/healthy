import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Top: NextPage = () => {
  return (
    <>
      <Head>
        <title>Top</title>
      </Head>
      <ul>
        <li>
          <Link href="/login">
            <a>/login</a>
          </Link>
        </li>
        <li>
          <Link href="/signup">
            <a>/signup</a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard">
            <a>/dashboard</a>
          </Link>
        </li>
        <li>
          <Link href="/checkup">
            <a>/checkup</a>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default Top
