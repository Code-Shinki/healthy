import { Grid } from '@material-ui/core'
import EventNoteIcon from '@material-ui/icons/EventNote'
import { makeStyles } from '@material-ui/styles'
import MoodIcons from 'components/atoms/mood-icons'
import NonceLabel from 'components/atoms/nonce-label.tsx'
import { getFormattedDate } from 'libs/date'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { userDatasetState } from 'states/userDataset'
import styles from 'styles/common/dashboard-container.module.scss'

const DashboardCondition: React.FC = () => {
  const classes = useStyles()
  const userDataset = useRecoilValue(userDatasetState)
  const length = 7 // 表示するデータの数

  if (!userDataset) return null

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <EventNoteIcon />
      </div>
      <h2 className={styles.h2}>最近の調子</h2>

      {userDataset.health.length >= length ? (
        <Grid container justify="space-around" className={classes.container}>
          {userDataset.health.slice(-length).map((data, index) => (
            <Grid key={index.toString()} item className={classes.item}>
              <div className={classes.date}>{`${getFormattedDate(data.createdAt, 'dd')}日`}</div>
              <MoodIcons mood={data.mood} size="3.5em" />
              <div className={classes.temperature}>{`${data.temperature} ℃`}</div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <NonceLabel>データが不足しています</NonceLabel>
      )}
    </div>
  )
}

export default DashboardCondition

const useStyles = makeStyles(() => ({
  container: {
    margin: '.5em 0 1em',
  },
  item: {
    margin: '1.5em .8em 0',
  },
  date: {
    marginBottom: '.8em',
    fontSize: '1.1em',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  temperature: {
    marginTop: '.3em',
    fontSize: '.9em',
    fontWeight: 'bold',
    textAlign: 'center',
  },
}))
