import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { todaysHealthDataState } from 'states/todaysHealthData'
import { userDatasetState } from 'states/userDataset'

const SetSymptom: FC = () => {
  const userDataset = useRecoilValue(userDatasetState)
  const [todaysHealthData, setTodaysHealthData] = useRecoilState(todaysHealthDataState)
  const [tmpSymptom, setTmpSymptom] = useState('')

  useEffect(() => {
    if (!userDataset) return
    if (userDataset.health.length !== 0 && !todaysHealthData.symptom.length) {
      setTodaysHealthData({
        ...todaysHealthData,
        symptom: userDataset.health.slice(-1)[0].symptom,
      })
    }
  }, [userDataset])

  const changeTmpSymptom = (event: ChangeEvent<HTMLInputElement>) => {
    setTmpSymptom(event.target.value)
  }

  const addTodaysSymptom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validate()) {
      setTodaysHealthData({
        ...todaysHealthData,
        symptom: [...todaysHealthData.symptom, tmpSymptom],
      })
      setTmpSymptom('')
    }
  }

  const removeTodaysSymptom = (index: number) => {
    const newSymptoms = todaysHealthData.symptom.filter((_symptom, symptomIndex) => {
      return symptomIndex !== index
    })
    setTodaysHealthData({
      ...todaysHealthData,
      symptom: newSymptoms,
    })
  }

  const validate = () => {
    const reg = new RegExp(/[!"#$%&'()*+\-.,/:;<=>?@[\\\]^_`{|}~]/g)
    if (tmpSymptom.length !== 0 && !reg.test(tmpSymptom)) return true
    return false
  }

  return (
    <>
      <ul>
        {todaysHealthData.symptom.map((item: string, index: number) => {
          return (
            <li key={index.toString()}>
              <span>{item}</span>
              <button onClick={() => removeTodaysSymptom(index)}>x</button>
            </li>
          )
        })}
      </ul>

      <form onSubmit={(e) => addTodaysSymptom(e)}>
        <input type="text" value={tmpSymptom} maxLength={20} onChange={changeTmpSymptom} required />
        <button type="submit">追加する</button>
      </form>
    </>
  )
}

export default SetSymptom
