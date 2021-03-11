import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { userDataState } from 'scripts/store'

const Summary: FC = () => {
  const userData = useRecoilValue(userDataState)
  const summaryData = userData.health.slice(-1)[0]

  return (
    <>
      <div>{summaryData.mood}</div>
      <div>{summaryData.temperature}</div>
      {summaryData.symptom.length === 0 ? (
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
