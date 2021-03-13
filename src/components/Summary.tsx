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
  const [sinceLastSummary, setSinceLastSummary] = useState('')

  useEffect(() => {
    if (!userDataset) return

    if (userDataset.health.length !== 0) {
      const latestData = userDataset.health.slice(-1)[0]
      const lasttime = Number(getCorrectDate(latestData.createdAt, 'yyyyMMdd'))
      const today = Number(getCorrectDate(new Date(), 'yyyyMMdd'))

      if (today - lasttime === 0) {
        setSinceLastSummary('本日')
      } else if (today - lasttime === 1) {
        setSinceLastSummary('昨日')
      } else {
        setSinceLastSummary(`${String(today - lasttime)}日前`)
      }

      setSummaryData(latestData)
    }
  }, [userDataset])

  if (userDataset) {
    if (!summaryData) {
      return (
        <>
          <div>サマリーデータが存在しません</div>
          <Link href="/checkup">
            <a>記録しませんか？</a>
          </Link>
        </>
      )
    }

    return (
      <>
        <h2>{`${sinceLastSummary}の体調`}</h2>
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
        {sinceLastSummary !== '本日' && (
          <Link href="/checkup">
            <a>記録しませんか？</a>
          </Link>
        )}
      </>
    )
  }

  return <Spinner />
}

export default Summary
