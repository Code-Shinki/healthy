import Spinner from 'components/Spinner'
import TemperatureGraph from 'components/TemperatureGraph'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'

const Temperature: NextPage = () => {
  const router = useRouter()
  const currentUser = useRecoilValue(currentUserState)

  useEffect(() => {
    if (currentUser === null) router.push('/login')
  }, [currentUser])

  if (currentUser) {
    return (
      <>
        <Head>
          <title>Temperature</title>
        </Head>
        <TemperatureGraph type="full" range={0} />
      </>
    )
  }

  return <Spinner />
}

export default Temperature

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      menuLayout: true,
    },
  }
}
