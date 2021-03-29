import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import InsufficientData from 'components/InsufficientData'
import { getMoodIcon } from 'components/MoodIcons'
import Spinner from 'components/Spinner'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { getCorrectDate } from 'scripts/date'
import { userDatasetState } from 'states/userDataset'
import { UserHealthData } from 'types/userDataset'

const Summary: FC = () => {
  const classes = useStyles()
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
        setSinceLastSummary(getCorrectDate(latestData.createdAt, 'MM月dd日'))
      }

      setSummaryData(latestData)
    }
  }, [userDataset])

  if (userDataset) {
    if (!summaryData) {
      return (
        <>
          <div className={classes.title}>サマリー</div>
          <InsufficientData word="データが不足しています" style={{ height: '100%', marginBottom: '1em' }} />
          <Grid container justify="flex-end">
            <Link href="/checkup">
              <a className={classes.link}>今日の体調を記録しましょう！ &gt;&gt;</a>
            </Link>
          </Grid>
        </>
      )
    }

    return (
      <>
        <div style={{ paddingRight: '.4em' }}>
          <div className={classes.title}>{`${sinceLastSummary}の体調`}</div>
          <Grid container justify="space-between" className={classes.wrapper}>
            <Grid item xs={4}>
              <Grid container justify="center">
                {getMoodIcon(summaryData.mood, '4.5em')}
              </Grid>
              <Grid container justify="center" className={classes.temperature}>
                {`${summaryData.temperature} ℃`}
              </Grid>
            </Grid>
            <Grid item xs={7}>
              {summaryData.symptom.length === 0 ? (
                <InsufficientData word="症状なし" style={{ height: '100%', marginBottom: '1em' }} />
              ) : (
                <Grid container justify="space-around" alignItems="center" className={classes.symptom}>
                  {summaryData.symptom.map((item: string, index: number) => {
                    return <div key={index.toString()}>{item}</div>
                  })}
                </Grid>
              )}
            </Grid>
          </Grid>
          {sinceLastSummary !== '本日' && (
            <Grid container justify="flex-end">
              <Link href="/checkup">
                <a className={classes.link}>今日の体調を記録しましょう！ &gt;&gt;</a>
              </Link>
            </Grid>
          )}
        </div>
      </>
    )
  }

  return <Spinner />
}

export default Summary

const useStyles = makeStyles(() => ({
  wrapper: {
    margin: '10px 0 20px',
  },
  title: {
    color: 'var(--c-primary)',
    fontSize: '1.4em',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  temperature: {
    margin: '.5em 0 0',
    fontWeight: 'bold',
  },
  symptom: {
    height: '100%',
    '& > div': {
      padding: '.3em .7em',
      margin: '.6em 0 0 .5em',
      color: 'var(--c-red)',
      fontSize: '1.4rem !important',
      fontWeight: 'bold',
      border: '1px solid var(--c-red)',
      borderLeft: '4px solid var(--c-red)',
      boxShadow: '2px 2px 3px rgba(0, 0, 0, .15)',
    },
  },
  link: {
    color: 'var(--c-primary)',
    fontSize: '.9em',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:visited': {
      color: 'var(--c-primary)',
    },
  },
}))
