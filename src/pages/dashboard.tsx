import ConditionList from 'components/ConditionList'
import Summary from 'components/Summary'
import TemperatureGraph from 'components/TemperatureGraph'
import UserInfo from 'components/UserInfo'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { loginUserState } from 'scripts/store'
import { auth } from 'utils/firebase'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const setLoginUser = useSetRecoilState(loginUserState)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setLoginUser(user) : router.push('/login')
    })
  }, [])

  const logout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <Head>
        <title>ダッシュボード | Healthy</title>
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

export default Dashboard
