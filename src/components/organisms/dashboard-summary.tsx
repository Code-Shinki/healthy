import { Grid } from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { makeStyles } from '@material-ui/styles'
import MoodIcons from 'components/atoms/mood-icons'
import NonceLabel from 'components/atoms/nonce-label.tsx'
import SymptomTag from 'components/atoms/symptom-tag'
import { getFormattedDate } from 'libs/date'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userDatasetState } from 'states/userDataset'
import styles from 'styles/common/dashboard-container.module.scss'
import { UserHealthData } from 'types/userDataset'

const DashboardSummary: React.FC = () => {
  const classes = useStyles()
  const userDataset = useRecoilValue(userDatasetState)
  const [summaryData, setSummaryData] = useState<UserHealthData>()
  const [summaryDate, setSummaryDate] = useState('')

  useEffect(() => {
    if (!userDataset || !userDataset.health.length) return

    const latestData = userDataset.health.slice(-1)[0]
    const lasttime = Number(getFormattedDate(latestData.createdAt, 'yyyyMMdd'))
    const today = Number(getFormattedDate(new Date(), 'yyyyMMdd'))
    const termDay = today - lasttime

    if (termDay === 0) {
      setSummaryDate('本日')
    } else if (termDay === 1) {
      setSummaryDate('昨日')
    } else {
      setSummaryDate(getFormattedDate(latestData.createdAt, 'M月d日'))
    }

    setSummaryData(latestData)
  }, [userDataset])

  if (!userDataset) return null

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <AssignmentIcon />
      </div>

      {summaryData ? (
        <>
          <h2 className={styles.h2}>{`${summaryDate}の体調`}</h2>
          <Grid container justify="space-between" alignItems="center" className={classes.container}>
            <Grid container item xs={4} justify="center" alignContent="center">
              <MoodIcons mood={summaryData.mood} size="4.5em" />
              <div className={classes.temperature}>{`${summaryData.temperature} ℃`}</div>
            </Grid>
            <Grid container item xs={8} justify="space-around">
              {summaryData.symptom.length ? (
                <>
                  {summaryData.symptom.map((item: string, index: number) => {
                    return (
                      <div key={index.toString()} className={classes.tag}>
                        <SymptomTag>{item}</SymptomTag>
                      </div>
                    )
                  })}
                </>
              ) : (
                <NonceLabel>症状はありません</NonceLabel>
              )}
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <h2 className={styles.h2}>サマリー</h2>
          <NonceLabel>データが不足しています</NonceLabel>
        </>
      )}

      {summaryDate !== '本日' && (
        <Grid container justify="flex-end">
          <Link href="/checkup">
            <a className={classes.link}>今日の体調を記録しましょう！</a>
          </Link>
        </Grid>
      )}
    </div>
  )
}

export default DashboardSummary

const useStyles = makeStyles(() => ({
  container: {
    margin: '1.5em 0',
  },
  temperature: {
    width: '100%',
    margin: '.5em 0 0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tag: {
    fontSize: '1.4rem',
  },
  link: {
    color: 'var(--c-primary)',
    fontSize: '.9em',
  },
}))
