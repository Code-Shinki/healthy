import ConditionList from 'components/ConditionList'
import Summary from 'components/Summary'
import TemperatureGraph from 'components/TemperatureGraph'
import UserInfo from 'components/UserInfo'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { userDataState } from 'scripts/store'

const Dashboard: NextPage = () => {
  const userData = useRecoilValue(userDataState)

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Link href="/">
        <a>To TOP</a>
      </Link>
      <h2>今日の体調</h2>
      <Summary />
      <h2>最近のコンディション</h2>
      <ConditionList />
      <h2>体温グラフ</h2>
      <TemperatureGraph />
      <h2>あなたの情報</h2>
      <UserInfo />
    </>
  )
}

export default Dashboard
