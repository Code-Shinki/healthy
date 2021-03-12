import SetMood from 'components/SetMood'
import SetSymptom from 'components/SetSymptom'
import SetTemperature from 'components/SetTemperature'
import Spinner from 'components/Spinner'
import checkupDataset from 'datasets/checkupDataset.json'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'
import { isCheckupValidState } from 'states/isCheckupValid'
import { todaysHealthDataState } from 'states/todaysHealthData'
import { CheckupDataset } from 'types/checkupDataset'

const Checkup: NextPage = () => {
  const router = useRouter()
  const currentUser = useRecoilValue(currentUserState)
  const [todaysHealthData, setTodaysHealthData] = useRecoilState(todaysHealthDataState)
  const isValid = useRecoilValue(isCheckupValidState)
  const [currentStep, setCurrentStep] = useState('init')
  const [question, setQuestion] = useState('')
  const [submit, setSubmit] = useState({ message: '', next: '' })
  const dataset: CheckupDataset = checkupDataset

  useEffect(() => {
    if (currentUser === null) router.push('/login')
  }, [currentUser])

  useEffect(() => {
    setTodaysHealthData({
      ...todaysHealthData,
      createdAt: new Date().toString(),
    })
    displayNextContents(currentStep, dataset[currentStep])
  }, [])

  const displayNextContents = (nextStep: string, nextDataset: CheckupDataset[string]) => {
    setCurrentStep(nextStep)
    setQuestion(nextDataset.question)
    setSubmit(nextDataset.submit)
  }

  if (currentUser) {
    return (
      <>
        <Head>
          <title>Checkup</title>
        </Head>

        <div>{question}</div>

        {currentStep === 'init' && <SetMood />}
        {currentStep === 'good' && <SetTemperature />}
        {currentStep === 'fine' && <SetTemperature />}
        {currentStep === 'bad' && <SetTemperature />}
        {currentStep === 'symptom' && <SetSymptom />}

        {currentStep === 'complete' ? (
          <Spinner />
        ) : (
          <button
            type="button"
            onClick={() => displayNextContents(submit.next, dataset[submit.next])}
            disabled={!isValid}
          >
            {submit.message}
          </button>
        )}
      </>
    )
  }

  return <Spinner />
}

export default Checkup
