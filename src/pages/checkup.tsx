import SetMood from 'components/SetMood'
import SetSymptom from 'components/SetSymptom'
import SetTemperature from 'components/SetTemperature'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { checkupDataset, checkupDatasetType } from 'scripts/dataset'
import { isCheckupValidState, loginUserState, todaysHealthState } from 'scripts/store'
import { auth } from 'utils/firebase'

const Checkup: NextPage = () => {
  const router = useRouter()
  const setLoginUser = useSetRecoilState(loginUserState)
  const [todaysHealth, setTodaysHealth] = useRecoilState(todaysHealthState)
  const isValid = useRecoilValue(isCheckupValidState)
  const [currentState, setCurrentState] = useState('init')
  const [question, setQuestion] = useState('')
  const [submit, setSubmit] = useState({ message: '', next: '' })

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setLoginUser(user) : router.push('/login')
    })
    setTodaysHealth({
      ...todaysHealth,
      createdAt: new Date().toString(),
    })
    displayNextContents(currentState, checkupDataset[currentState])
  }, [])

  const displayNextContents = (nextState: string, nextDataset: checkupDatasetType[string]) => {
    setCurrentState(nextState)
    setQuestion(nextDataset.question)
    setSubmit(nextDataset.submit)
  }

  return (
    <>
      <Head>
        <title>ヘルスチェック | Healthy</title>
      </Head>

      <div>{question}</div>

      {currentState === 'init' && <SetMood />}

      {currentState === 'good' && <SetTemperature />}
      {currentState === 'fine' && <SetTemperature />}
      {currentState === 'bad' && <SetTemperature />}

      {currentState === 'symptom' && <SetSymptom />}
      {currentState === 'complete' && null}

      {currentState !== 'complete' && (
        <button
          type="button"
          onClick={() => displayNextContents(submit.next, checkupDataset[submit.next])}
          disabled={!isValid}
        >
          {submit.message}
        </button>
      )}
    </>
  )
}

export default Checkup
