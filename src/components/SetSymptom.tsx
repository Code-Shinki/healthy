import React, { FC, useState } from 'react'
import { useRecoilState } from 'recoil'
import { todaysHealthState } from 'scripts/store'

const SetSymptom: FC = () => {
  const [todaysHealth, setTodaysHealth] = useRecoilState(todaysHealthState)
  const [tmpSymptom, setTmpSymptom] = useState('')

  const addTmpSymptom = (tmpSymptom: string) => {
    setTmpSymptom(tmpSymptom)
  }

  const addTodaysSymptom = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validate()) {
      setTodaysHealth({
        ...todaysHealth,
        symptom: [...todaysHealth.symptom, tmpSymptom],
      })
      setTmpSymptom('')
    }
  }

  const removeTodaysSymptom = (index: number) => {
    const newSymptoms = todaysHealth.symptom.filter((_symptom, symptomIndex) => {
      return symptomIndex !== index
    })
    setTodaysHealth({
      ...todaysHealth,
      symptom: newSymptoms,
    })
  }

  const validate = () => {
    const reg = new RegExp(/[!"#$%&'()*+\-.,/:;<=>?@[\\\]^_`{|}~]/g)
    if (tmpSymptom.length !== 0 && !reg.test(tmpSymptom)) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <ul>
        {todaysHealth.symptom.map((item, index) => {
          return (
            <li key={index}>
              {item}
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
