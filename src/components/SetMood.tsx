import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { getMoodIcon } from 'components/MoodIcons'
import checkupDataset from 'datasets/checkupDataset.json'
import React, { FC } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isCheckupValidState } from 'states/isCheckupValid'
import { todaysHealthDataState } from 'states/todaysHealthData'

const SetMood: FC = () => {
  const classes = useStyles()
  const [todaysHealthData, setTodaysHealthData] = useRecoilState(todaysHealthDataState)
  const setIsValid = useSetRecoilState(isCheckupValidState)
  const moodTypes = ['good', 'fine', 'bad']

  const addTodaysMood = (todaysMood: string) => {
    if (validate(todaysMood)) {
      checkupDataset.init.button.next = todaysMood
      checkupDataset.symptom.button.prev = todaysMood
      if (todaysMood === 'good') {
        setTodaysHealthData({
          ...todaysHealthData,
          mood: todaysMood,
          symptom: [], // setSymptomから戻ってきてGoodを選択した場合はsymptomを空にする
        })
      } else {
        setTodaysHealthData({
          ...todaysHealthData,
          mood: todaysMood,
        })
      }
    }
  }

  const validate = (value: string) => {
    if (value === 'good' || value === 'fine' || value === 'bad') {
      setIsValid(true)
      return true
    }
    setIsValid(false)
    return false
  }

  return (
    <>
      <Grid container justify="space-between" className={classes.root}>
        {moodTypes.map((mood, index) => (
          <div key={index.toString()} className={classes.radio}>
            <label htmlFor={mood} className={todaysHealthData.mood !== mood ? classes.notSelected : undefined}>
              {getMoodIcon(mood, '5.5em')}
            </label>
            <input
              id={mood}
              type="radio"
              name="mood"
              checked={todaysHealthData.mood === mood}
              onChange={() => addTodaysMood(mood)}
            />
          </div>
        ))}
      </Grid>
    </>
  )
}

export default SetMood

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 500,
    padding: '1em 0',
    margin: '0 auto',
  },
  radio: {
    '& label': {
      display: 'block',
      cursor: 'pointer',
    },
    '& input': {
      display: 'none',
    },
  },
  notSelected: {
    '& svg': {
      color: '#bbb !important',
      animation: 'none',
      '&:hover': {
        filter: 'none !important',
      },
    },
  },
}))
