import { Grid } from '@material-ui/core'
import MoodIcons from 'components/atoms/mood-icons'
import checkupDataset from 'datasets/checkupDataset.json'
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isCheckupValidState } from 'states/isCheckupValid'
import { todaysHealthDataState } from 'states/todaysHealthData'
import styles from './checkup-mood.module.scss'

const CheckupMood: React.FC = () => {
  const [todaysHealthData, setTodaysHealthData] = useRecoilState(todaysHealthDataState)
  const setIsValid = useSetRecoilState(isCheckupValidState)
  const moodTypes = ['good', 'fine', 'bad']

  const addTodaysMood = (todaysMood: string) => {
    if (validate(todaysMood)) {
      // データセットの可変箇所にパスをセット
      checkupDataset.init.button.next = todaysMood
      checkupDataset.symptom.button.prev = todaysMood

      // Symptomから戻ってGoodを選択した場合はsymptomを空にする
      if (todaysMood === 'good') {
        setTodaysHealthData({
          ...todaysHealthData,
          mood: todaysMood,
          symptom: [],
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
      <Grid container justify="space-between" className={styles.root}>
        {moodTypes.map((mood, index) => (
          <div key={index.toString()}>
            <label htmlFor={mood} className={`${styles.label} ${todaysHealthData.mood !== mood && styles.isDisabled}`}>
              <MoodIcons mood={mood} size="5.5em" />
            </label>
            <input
              id={mood}
              type="radio"
              name="mood"
              checked={todaysHealthData.mood === mood}
              onChange={() => addTodaysMood(mood)}
              className={styles.input}
            />
          </div>
        ))}
      </Grid>
    </>
  )
}

export default CheckupMood
