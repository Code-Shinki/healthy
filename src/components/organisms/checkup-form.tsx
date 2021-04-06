import { Button, ButtonGroup, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import CheckupMood from 'components/molecules/checkup-mood'
import CheckupSymptom from 'components/molecules/checkup-symptom'
import CheckupTemperature from 'components/molecules/checkup-temperature'
import checkupDataset from 'datasets/checkupDataset.json'
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

const CheckupForm: React.FC = () => {
  const router = useRouter()
  const classes = useStyles()
  const currentUser = useRecoilValue(currentUserState)
  const [userDataset, setUserDataset] = useRecoilState(userDatasetState)
  const [todaysHealthData, setTodaysHealthData] = useRecoilState(todaysHealthDataState)
  const isValid = useRecoilValue(isCheckupValidState)
  const [currentStep, setCurrentStep] = useState('init')
  const [question, setQuestion] = useState('')
  const [button, setButton] = useState({ prev: '', next: '', nextMessage: '' })
  const dataset: CheckupDataset = checkupDataset

  useEffect(() => {
    setTodaysHealthData({
      ...todaysHealthData,
      createdAt: new Date().toString(),
    })
    changeDisplayContents(currentStep, dataset[currentStep])
  }, [])

  useEffect(() => {
    if (!userDataset || currentStep !== 'complete') return
    ;(async () => {
      const newData = {
        ...userDataset,
        health: [...userDataset.health, todaysHealthData as UserHealthData],
      }

      await postUserDataset(currentUser?.uid as string, newData).catch(() => router.push('/404'))
      setUserDataset(newData)

      router.push('/dashboard')
    })()
  }, [currentStep])

  const changeDisplayContents = (step: string, dataset: CheckupDataset[string]) => {
    setCurrentStep(step)
    setQuestion(dataset.question)
    setButton(dataset.button)
  }

  return (
    <>
      <div className={classes.question}>{question}</div>

      {currentStep === 'init' && <CheckupMood />}

      {currentStep === 'good' && <CheckupTemperature />}
      {currentStep === 'fine' && <CheckupTemperature />}
      {currentStep === 'bad' && <CheckupTemperature />}

      {currentStep === 'symptom' && <CheckupSymptom />}

      {currentStep === 'complete' ? (
        <CircularProgress className={classes.progress} />
      ) : (
        <ButtonGroup variant="text" color="primary" fullWidth className={classes.wrapper}>
          <Button
            type="button"
            size="large"
            onClick={() => changeDisplayContents(button.prev, dataset[button.prev])}
            disabled={currentStep === 'init'}
          >
            戻る
          </Button>
          <Button
            type="button"
            size="large"
            onClick={() => changeDisplayContents(button.next, dataset[button.next])}
            disabled={!isValid}
          >
            {button.nextMessage}
          </Button>
        </ButtonGroup>
      )}
    </>
  )
}

export default CheckupForm

const useStyles = makeStyles(() => ({
  question: {
    margin: '2em 0',
    color: 'var(--c-primary)',
    fontSize: '1.4em',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrapper: {
    margin: '3em 0 0',
  },
  progress: {
    margin: '2em auto 1em',
    display: 'block',
  },
}))
