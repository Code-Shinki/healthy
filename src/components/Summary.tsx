import Spinner from 'components/Spinner'
import React, { FC, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userDatasetState } from 'states/userDataset'
import { UserHealthData } from 'types/userDataset'

const Summary: FC = () => {
  const userDataset = useRecoilValue(userDatasetState)
  const [summaryData, setSummaryData] = useState<UserHealthData>()

  useEffect(() => {
    if (!userDataset) return
    setSummaryData(userDataset.health.slice(-1)[0])
  }, [userDataset])

  if (!summaryData) return <div>本日のデータがありません</div>

  if (userDataset) {
    return (
      <>
        <div>{summaryData.mood}</div>
        <div>{summaryData.temperature}</div>
        {summaryData.symptom.length === 0 ? (
          <div>気になる症状はありません</div>
        ) : (
          <ul>
            {summaryData.symptom.map((item: string, index: number) => {
              return <li key={index.toString()}>{item}</li>
            })}
          </ul>
        )}
      </>
    )
  }

  return <Spinner />
}

export default Summary
