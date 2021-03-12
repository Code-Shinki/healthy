import ConditionList from 'components/ConditionList'
import Spinner from 'components/Spinner'
import Summary from 'components/Summary'
import TemperatureGraph from 'components/TemperatureGraph'
import UserInfo from 'components/UserInfo'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'
import { auth } from 'utils/firebase'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const currentUser = useRecoilValue(currentUserState)

  useEffect(() => {
    if (currentUser === null) router.push('/login')
  }, [currentUser])

  const logout = async () => {
    await auth.signOut().catch((err) => alert(err.message))
  }

  if (currentUser) {
    return (
      <>
        <Head>
          <title>Dashboard</title>
        </Head>
        <button onClick={logout}>ログアウト</button>
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

  return <Spinner />
}

export default Dashboard
