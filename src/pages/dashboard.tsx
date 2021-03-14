import ConditionList from 'components/ConditionList'
import Spinner from 'components/Spinner'
import Summary from 'components/Summary'
import TemperatureGraph from 'components/TemperatureGraph'
import UserInfo from 'components/UserInfo'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { currentUserState } from 'states/currentUser'
import { isCheckupValidState } from 'states/isCheckupValid'
import { todaysHealthDataState } from 'states/todaysHealthData'
import { userDatasetState } from 'states/userDataset'
import { auth } from 'utils/firebase'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const currentUser = useRecoilValue(currentUserState)
  const resetUserDataset = useResetRecoilState(userDatasetState)
  const resetTodaysHealthData = useResetRecoilState(todaysHealthDataState)
  const resetIsCheckupValid = useResetRecoilState(isCheckupValidState)

  useEffect(() => {
    if (currentUser === null) router.push('/login')
  }, [currentUser])

  const logout = async () => {
    resetUserDataset()
    resetTodaysHealthData()
    resetIsCheckupValid()
    await auth.signOut().catch((err) => alert(err.message))
  }

  if (currentUser) {
    return (
      <>
        <Head>
          <title>Dashboard</title>
        </Head>
        <button onClick={logout}>ログアウト</button>
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
