import React, { FC, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { isCheckupValidState, todaysHealthState, userDataState } from 'scripts/store'

const SetTemperature: FC = () => {
  const userData = useRecoilValue(userDataState)
  const setIsValid = useSetRecoilState(isCheckupValidState)
  const prevTemperature = userData.health.slice(-1)[0].temperature
  const [todaysHealth, setTodaysHealth] = useRecoilState(todaysHealthState)
  const [tips, setTips] = useState('前回と変わりないですか？')

  useEffect(() => {
    setTodaysHealth({
      ...todaysHealth,
      temperature: prevTemperature,
    })
  }, [])

  const addTodaysTemperature = (todaysTemperature: number) => {
    if (validate(todaysTemperature)) {
      setTodaysHealth({
        ...todaysHealth,
        temperature: todaysTemperature,
      })
      setIsValid(true)
    }
  }

  const validate = (value: number) => {
    if (value >= 35.0 && value <= 40.0) {
      changeTips(value)
      return true
    } else {
      setIsValid(false)
      setTips(`35.0～40.0までの数字を入力してください。`)
      return false
    }
  }

  const changeTips = (value: number) => {
    const diff = Math.round((value - prevTemperature) * 10) / 10
    const absDiff = Math.abs(diff)

    if (Math.sign(diff) === 1) {
      setTips(`前回よりも ${absDiff}℃ 高いですね…`)
    } else if (Math.sign(diff) === -1) {
      setTips(`前回よりも ${absDiff}℃ 低いですね…`)
    } else {
      setTips('前回と変わりないですね！')
    }
  }

  return (
    <>
      <div>
        <input
          type="number"
          max="40"
          min="35"
          step="0.1"
          defaultValue={prevTemperature}
          onChange={(e) => addTodaysTemperature(Number(e.target.value))}
        />
      </div>
      <div>{tips}</div>
    </>
  )
}

export default SetTemperature
