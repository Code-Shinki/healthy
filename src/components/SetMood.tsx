import { Grid } from '@material-ui/core'
import { getMoodIcon } from 'components/moodIcon'
import checkupDataset from 'datasets/checkupDataset.json'
import React, { FC } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isCheckupValidState } from 'states/isCheckupValid'
import { todaysHealthDataState } from 'states/todaysHealthData'

const SetMood: FC = () => {
  const [todaysHealthData, setTodaysHealthData] = useRecoilState(todaysHealthDataState)
  const setIsValid = useSetRecoilState(isCheckupValidState)

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
      <Grid container justify="space-around">
        <div>
          <label htmlFor="good">{getMoodIcon('good', '4.5em')}</label>
          <input
            id="good"
            type="radio"
            name="mood"
            checked={todaysHealthData.mood === 'good'}
            onChange={() => addTodaysMood('good')}
          />
        </div>
        <div>
          <label htmlFor="fine">{getMoodIcon('fine', '4.5em')}</label>
          <input
            id="fine"
            type="radio"
            name="mood"
            checked={todaysHealthData.mood === 'fine'}
            onChange={() => addTodaysMood('fine')}
          />
        </div>
        <div>
          <label htmlFor="bad">{getMoodIcon('bad', '4.5em')}</label>
          <input
            id="bad"
            type="radio"
            name="mood"
            checked={todaysHealthData.mood === 'bad'}
            onChange={() => addTodaysMood('bad')}
          />
        </div>
      </Grid>
    </>
  )
}

export default SetMood
