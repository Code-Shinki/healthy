import Spinner from 'components/Spinner'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'

const Log: NextPage = () => {
  const router = useRouter()
  const currentUser = useRecoilValue(currentUserState)

  useEffect(() => {
    if (currentUser === null) router.push('/login')
  }, [currentUser])

  if (currentUser) {
    return (
      <>
        <Head>
          <title>Log</title>
        </Head>
      </>
    )
  }

  return <Spinner />
}

export default Log
