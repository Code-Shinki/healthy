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
      checkupDataset.init.submit.next = todaysMood
      setTodaysHealthData({
        ...todaysHealthData,
        mood: todaysMood,
      })
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
        <input type="radio" name="mood" onChange={() => addTodaysMood('good')} />
        <input type="radio" name="mood" onChange={() => addTodaysMood('fine')} />
        <input type="radio" name="mood" onChange={() => addTodaysMood('bad')} />
      </div>
    </>
  )
}

export default SetMood
