import SetMood from 'components/SetMood'
import SetSymptom from 'components/SetSymptom'
import SetTemperature from 'components/SetTemperature'
import Spinner from 'components/Spinner'
import checkupDataset from 'datasets/checkupDataset.json'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { postUserDataset } from 'requests/userDataset'
import { currentUserState } from 'states/currentUser'
import { isCheckupValidState } from 'states/isCheckupValid'
import { todaysHealthDataState } from 'states/todaysHealthData'
import { userDatasetState } from 'states/userDataset'
import { CheckupDataset } from 'types/checkupDataset'
import { UserHealthData } from 'types/userDataset'

const Checkup: NextPage = () => {
  const router = useRouter()
  const currentUser = useRecoilValue(currentUserState)
  const [userDataset, setUserDataset] = useRecoilState(userDatasetState)
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

  useEffect(() => {
    if (userDataset && currentStep === 'complete') {
      ;(async () => {
        const newData = {
          ...userDataset,
          health: [...userDataset.health, todaysHealthData as UserHealthData],
        }
        await postUserDataset(currentUser?.uid as string, newData)
        setUserDataset(newData)
        router.push('/dashboard')
      })()
    }
  }, [currentStep])

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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      menuLayout: true,
    },
  }
}
