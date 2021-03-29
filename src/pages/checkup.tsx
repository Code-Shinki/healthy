import { Button, ButtonGroup, CircularProgress, Theme } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import { makeStyles } from '@material-ui/styles'
import SetMood from 'components/SetMood'
import SetSymptom from 'components/SetSymptom'
import SetTemperature from 'components/SetTemperature'
import Spinner from 'components/Spinner'
import checkupDataset from 'datasets/checkupDataset.json'
import ContentsWrapper from 'layouts/ContentsWrapper'
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
    if (currentUser === null) router.push('/login')
  }, [currentUser])

  useEffect(() => {
    setTodaysHealthData({
      ...todaysHealthData,
      createdAt: new Date().toString(),
    })
    changeDisplayContents(currentStep, dataset[currentStep])
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

  const changeDisplayContents = (step: string, dataset: CheckupDataset[string]) => {
    setCurrentStep(step)
    setQuestion(dataset.question)
    setButton(dataset.button)
  }

  if (currentUser) {
    return (
      <>
        <Head>
          <title>Checkup</title>
        </Head>
        <ContentsWrapper class={classes.root}>
          <h1>
            <ChatIcon style={{ fontSize: '1.4em' }} />
            今日の体調
          </h1>
          <div className={classes.container}>
            <div className={classes.question}>{question}</div>

            {currentStep === 'init' && <SetMood />}
            {currentStep === 'good' && <SetTemperature />}
            {currentStep === 'fine' && <SetTemperature />}
            {currentStep === 'bad' && <SetTemperature />}
            {currentStep === 'symptom' && <SetSymptom />}

            {currentStep === 'complete' ? (
              <CircularProgress className={classes.progress} />
            ) : (
              <ButtonGroup
                variant="text"
                color="primary"
                aria-label="contained primary button group"
                fullWidth
                className={classes.button}
              >
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
          </div>
        </ContentsWrapper>
      </>
    )
  }

  return <Spinner />
}

export default Checkup

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '95%',
    maxWidth: 800,
    [theme.breakpoints.up('lg')]: {
      width: '90%',
    },
  },
  container: {
    padding: '4em 1em 2em',
  },
  question: {
    margin: '1em 0 2em',
    color: 'var(--c-primary)',
    fontSize: '1.4em',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    margin: '3em 0 0',
  },
  progress: {
    margin: '2em auto 1em',
    display: 'block',
  },
}))

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      menuLayout: true,
    },
  }
}
