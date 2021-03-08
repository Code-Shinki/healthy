import SetMood from 'components/SetMood'
import SetSymptom from 'components/SetSymptom'
import SetTemperature from 'components/SetTemperature'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { checkupDataset, checkupDatasetType } from 'scripts/dataset'
import { isValidState, todaysHealthState } from 'scripts/store'

const Checkup: NextPage = () => {
  const isValid = useRecoilValue(isValidState)
  const todaysHealth = useRecoilValue(todaysHealthState)
  const [currentState, setCurrentState] = useState('init')
  const [question, setQuestion] = useState('')
  const [submit, setSubmit] = useState({ message: '', next: '' })

  useEffect(() => {
    displayNextContents(currentState, checkupDataset[currentState])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const displayNextContents = (nextState: string, nextDataset: checkupDatasetType[string]) => {
    setCurrentState(nextState)
    setQuestion(nextDataset.question)
    setSubmit(nextDataset.submit)
  }

  useEffect(() => {
    console.log(todaysHealth)
  }, [todaysHealth])

  return (
    <>
      <Head>
        <title>Checkup</title>
      </Head>
      <Link href="/">
        <a>To TOP</a>
      </Link>

      <div>{question}</div>

      {currentState === 'init' && <SetMood />}

      {currentState === 'good' && <SetTemperature />}
      {currentState === 'fine' && <SetTemperature />}
      {currentState === 'bad' && <SetTemperature />}

      {currentState === 'symptom' && <SetSymptom />}
      {currentState === 'complete' && null}

      <button
        type="button"
        onClick={() => displayNextContents(submit.next, checkupDataset[submit.next])}
        disabled={!isValid}
      >
        {submit.message}
      </button>
    </>
  )
}

export default Checkup
