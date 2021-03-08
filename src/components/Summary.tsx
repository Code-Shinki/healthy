import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { userDataState } from 'scripts/store'

const Summary: FC = () => {
  const userData = useRecoilValue(userDataState)
  const summaryData = {
    mood: userData.health.mood.slice(-1)[0],
    temperature: userData.health.temperature.slice(-1)[0],
    symptom: userData.health.symptom.slice(-1)[0],
  }

  const symptomList = summaryData.symptom.map((item, index) => {
    return <li key={index}>{item}</li>
  })

  return (
    <>
      <div>{summaryData.mood}</div>
      <div>{summaryData.temperature}</div>
      {symptomList.length === 0 ? (
        <div>気になる症状はありません</div>
      ) : (
        <ul>
          {summaryData.symptom.map((item, index) => {
            return <li key={index.toString()}>{item}</li>
          })}
        </ul>
      )}
    </>
  )
}

export default Summary
