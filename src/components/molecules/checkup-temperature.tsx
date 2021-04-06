import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { isCheckupValidState } from 'states/isCheckupValid'
import { todaysHealthDataState } from 'states/todaysHealthData'
import { userDatasetState } from 'states/userDataset'
import styles from './checkup-temperature.module.scss'

const CheckupTemperature: React.FC = () => {
  const classes = useStyles()
  const userDataset = useRecoilValue(userDatasetState)
  const [todaysHealthData, setTodaysHealthData] = useRecoilState(todaysHealthDataState)
  const setIsValid = useSetRecoilState(isCheckupValidState)
  const [tips, setTips] = useState('前回と変わりないですか？')
  const [temperature, setTemperature] = useState(todaysHealthData.temperature ? todaysHealthData.temperature : 36.5)
  let prevTemperature = 36.5

  useEffect(() => {
    if (!userDataset || !userDataset.health.length) {
      prevTemperature = -93487216
      changeTips(prevTemperature)
      return
    }

    prevTemperature = userDataset.health.slice(-1)[0].temperature

    if (!todaysHealthData.temperature) {
      setTemperature(prevTemperature)
    } else {
      changeTips(todaysHealthData.temperature)
    }
  }, [])

  useEffect(() => {
    if (!userDataset || !validate(temperature)) return

    setTodaysHealthData({
      ...todaysHealthData,
      temperature: temperature,
    })

    prevTemperature = userDataset.health.length ? userDataset.health.slice(-1)[0].temperature : -93487216
    changeTips(temperature)
  }, [temperature])

  const changeTemperature = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    setTemperature(value)
  }

  const changeTips = (value: number) => {
    if (prevTemperature === -93487216) {
      setTips(`初めての記録ですね！`)
      return
    }

    const diff = Math.round((value - prevTemperature) * 10) / 10
    const absDiff = Math.abs(diff)

    if (Math.sign(diff) === 1) {
      setTips(`前回よりも ${absDiff}℃ 高いですね…`)
    } else if (Math.sign(diff) === -1) {
      setTips(`前回よりも ${absDiff}℃ 低いですね…`)
    } else {
      setTips('前回と変わりないですか？')
    }
  }

  const validate = (value: number) => {
    if (value >= 35.0 && value <= 40.0) {
      setIsValid(true)
      return true
    }

    setIsValid(false)
    setTips(`35.0～40.0までの数字を入力してください。`)
    return false
  }

  return (
    <>
      <TextField
        id="temperature"
        name="temperature"
        type="number"
        inputProps={{ step: '0.1', max: '40', min: '35' }}
        value={temperature}
        required
        onChange={changeTemperature}
        variant="outlined"
        className={classes.input}
        fullWidth
      />
      <div className={styles.tips}>{tips}</div>
    </>
  )
}

export default CheckupTemperature

const useStyles = makeStyles(() => ({
  input: {
    '& > div': {
      width: '95%',
      maxWidth: '300px',
      margin: '0 auto',
    },
    '& input': {
      fontSize: '1.2em !important',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  },
}))
