import Spinner from 'components/Spinner'
import React, { FC, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { isCheckupValidState } from 'states/isCheckupValid'
import { todaysHealthDataState } from 'states/todaysHealthData'
import { userDatasetState } from 'states/userDataset'

const SetTemperature: FC = () => {
  const userDataset = useRecoilValue(userDatasetState)
  const [todaysHealthData, setTodaysHealthData] = useRecoilState(todaysHealthDataState)
  const setIsValid = useSetRecoilState(isCheckupValidState)
  const [tips, setTips] = useState('体温を入力してください')
  let prevTemperature = 36.5

  useEffect(() => {
    if (!userDataset) return
    if (userDataset.health.length !== 0) {
      prevTemperature = userDataset.health.slice(-1)[0].temperature
      setTips(`前回と変わりないですか？`)
    }
    setTodaysHealthData({
      ...todaysHealthData,
      temperature: prevTemperature,
    })
  }, [userDataset])

  const addTodaysTemperature = (todaysTemperature: number) => {
    if (validate(todaysTemperature)) {
      setTodaysHealthData({
        ...todaysHealthData,
        temperature: todaysTemperature,
      })
      setIsValid(true)
    }
  }

  const validate = (value: number) => {
    if (value >= 35.0 && value <= 40.0) {
      changeTips(value)
      return true
    }
    setIsValid(false)
    setTips(`35.0～40.0までの数字を入力してください。`)
    return false
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

  if (userDataset) {
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

  return <Spinner />
}

export default SetTemperature
