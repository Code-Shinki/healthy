import { Grid, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import InsufficientData from 'components/InsufficientData'
import { getMoodIcon } from 'components/MoodIcons'
import Spinner from 'components/Spinner'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { getCorrectDate } from 'scripts/date'
import { userDatasetState } from 'states/userDataset'

const ConditionList: FC = () => {
  const classes = useStyles()
  const userDataset = useRecoilValue(userDatasetState)
  const [moodList, setMoodList] = useState<JSX.Element[]>()

  useEffect(() => {
    if (!userDataset) return
    setMoodList(
      userDataset.health.slice(-7).map((item, index) => {
        return (
          <Fragment key={index.toString()}>
            <Grid item className={classes.wrapper}>
              <div className={classes.date}>{getCorrectDate(item.createdAt, 'dd')}日</div>
              {getMoodIcon(item.mood, '3.5em')}
              <div className={classes.temperature}>{item.temperature}℃</div>
            </Grid>
          </Fragment>
        )
      })
    )
  }, [userDataset])

  if (!moodList || !moodList.length) {
    return (
      <>
        <div className={classes.title}>最近の調子</div>
        <InsufficientData word="データが不足しています" style={{ padding: '1em 0' }} />
      </>
    )
  }

  if (userDataset) {
    return (
      <>
        <div className={classes.title}>最近の調子</div>
        <Grid container justify="space-around" className={classes.container}>
          {moodList}
        </Grid>
      </>
    )
  }

  return <Spinner />
}

export default ConditionList

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    color: 'var(--c-primary)',
    fontSize: '1.4em',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  container: {
    margin: '.5em 0 0',
  },
  wrapper: {
    margin: '1.5em .8em 0',
    fontWeight: 'bold',
    textAlign: 'center',
    [theme.breakpoints.up('lg')]: {
      margin: '1.5em .5em 0',
    },
    '& > svg': {
      margin: '.2em 0 .1em',
    },
  },
  date: {
    fontSize: '1.1em',
  },
  temperature: {
    fontSize: '.9em',
  },
}))
