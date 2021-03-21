import ConditionList from 'components/ConditionList'
import Spinner from 'components/Spinner'
import Summary from 'components/Summary'
import TemperatureGraph from 'components/TemperatureGraph'
import UserInfo from 'components/UserInfo'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const currentUser = useRecoilValue(currentUserState)

  useEffect(() => {
    if (currentUser === null) router.push('/login')
  }, [currentUser])

  if (currentUser) {
    return (
      <>
        <Head>
          <title>Dashboard</title>
        </Head>
        <Summary />
        <ConditionList />
        <TemperatureGraph type="mini" range={7} />
        <UserInfo />
      </>
    )
  }

  return <Spinner />
}

export default Dashboard

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      menuLayout: true,
    },
  }
}
