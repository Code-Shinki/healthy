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
      <div>
        <input
          type="radio"
          name="mood"
          checked={todaysHealthData.mood === 'good'}
          onChange={() => addTodaysMood('good')}
        />
        <input
          type="radio"
          name="mood"
          checked={todaysHealthData.mood === 'fine'}
          onChange={() => addTodaysMood('fine')}
        />
        <input
          type="radio"
          name="mood"
          checked={todaysHealthData.mood === 'bad'}
          onChange={() => addTodaysMood('bad')}
        />
      </div>
    </>
  )
}

export default SetMood
