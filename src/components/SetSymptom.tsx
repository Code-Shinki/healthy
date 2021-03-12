import React, { FC, useState } from 'react'
import { useRecoilState } from 'recoil'
import { todaysHealthDataState } from 'states/todaysHealthData'

const SetSymptom: FC = () => {
  const [todaysHealthData, setTodaysHealthData] = useRecoilState(todaysHealthDataState)
  const [tmpSymptom, setTmpSymptom] = useState('')

  const addTmpSymptom = (tmpSymptom: string) => {
    setTmpSymptom(tmpSymptom)
  }

  const addTodaysSymptom = (event: React.FormEvent<HTMLFormElement>) => {
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
        <input type="text" value={tmpSymptom} maxLength={20} onChange={(e) => addTmpSymptom(e.target.value)} required />
        <button type="submit">追加する</button>
      </form>
    </>
  )
}

export default SetSymptom
