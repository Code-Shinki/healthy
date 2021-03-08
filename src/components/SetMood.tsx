import React, { FC } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { checkupDataset } from 'scripts/dataset'
import { isValidState, todaysHealthState } from 'scripts/store'

const SetMood: FC = () => {
  const [todaysHealth, setTodaysHealth] = useRecoilState(todaysHealthState)
  const setIsValid = useSetRecoilState(isValidState)

  const addTodaysMood = (todaysMood: string) => {
    validate(todaysMood)
    checkupDataset.init.submit.next = todaysMood
    setTodaysHealth({
      ...todaysHealth,
      mood: todaysMood,
    })
  }

  const validate = (value: string) => {
    if (value === 'good' || value === 'fine' || value === 'bad') setIsValid(true)
    else setIsValid(false)
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
