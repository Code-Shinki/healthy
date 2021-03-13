import Spinner from 'components/Spinner'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { getCorrectDate } from 'scripts/date'
import { userDatasetState } from 'states/userDataset'
import { UserHealthData } from 'types/userDataset'

const Summary: FC = () => {
  const userDataset = useRecoilValue(userDatasetState)
  const [summaryData, setSummaryData] = useState<UserHealthData>()

  useEffect(() => {
    if (!userDataset) return

    const latestData = userDataset.health.slice(-1)[0]
    const latestTime = getCorrectDate(latestData.createdAt, 'yyyy/MM/dd')
    const today = getCorrectDate(new Date(), 'yyyy/MM/dd')

    latestTime === today && setSummaryData(latestData)
  }, [userDataset])

  if (!summaryData)
    return (
      <>
        <div>本日のデータがありません</div>
        <Link href="/checkup">
          <a>記録しませんか？</a>
        </Link>
      </>
    )

  if (userDataset) {
    return (
      <>
        <div>{getCorrectDate(summaryData.createdAt, 'yyyy/MM/dd')}</div>
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
