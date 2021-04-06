import { Button, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { todaysHealthDataState } from 'states/todaysHealthData'
import { userDatasetState } from 'states/userDataset'
import styles from './checkup-symptom.module.scss'

const SetSymptom: FC = () => {
  const classes = useStyles()
  const userDataset = useRecoilValue(userDatasetState)
  const [todaysHealthData, setTodaysHealthData] = useRecoilState(todaysHealthDataState)
  const [tmpSymptom, setTmpSymptom] = useState('')

  useEffect(() => {
    if (!userDataset) return

    if (userDataset.health.length && !todaysHealthData.symptom.length) {
      setTodaysHealthData({
        ...todaysHealthData,
        symptom: userDataset.health.slice(-1)[0].symptom,
      })
    }
  }, [userDataset])

  const changeTmpSymptom = (event: ChangeEvent<HTMLInputElement>) => {
    setTmpSymptom(event.target.value)
  }

  const addTodaysSymptom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (validate()) {
      setTodaysHealthData({
        ...todaysHealthData,
        symptom: [...todaysHealthData.symptom, tmpSymptom],
      })
      setTmpSymptom('')
    }
  }

  const removeTodaysSymptom = (index: number) => {
    const newSymptoms = todaysHealthData.symptom.filter((_symptom, symptomIndex) => {
      return symptomIndex !== index
    })
    setTodaysHealthData({
      ...todaysHealthData,
      symptom: newSymptoms,
    })
  }

  const validate = () => {
    const reg = new RegExp(/[!"#$%&'()*+\-.,/:;<=>?@[\\\]^_`{|}~]/g)
    if (tmpSymptom.length !== 0 && !reg.test(tmpSymptom)) return true
    return false
  }

  return (
    <>
      <Grid container justify="center" alignItems="center" className={styles.list}>
        {todaysHealthData.symptom.map((item: string, index: number) => {
          return (
            <div key={index.toString()}>
              {item}
              <button onClick={() => removeTodaysSymptom(index)}>×</button>
            </div>
          )
        })}
      </Grid>
      <form onSubmit={addTodaysSymptom} className={styles.form}>
        <TextField
          id="symptom"
          name="symptom"
          type="text"
          inputProps={{ maxLength: 20 }}
          value={tmpSymptom}
          required
          onChange={changeTmpSymptom}
          variant="outlined"
          className={classes.input}
          fullWidth
          placeholder="症状を入力してください"
        />
        <Button type="submit" variant="outlined" color="primary" className={classes.submit}>
          追加する
        </Button>
      </form>
    </>
  )
}

export default SetSymptom

const useStyles = makeStyles(() => ({
  input: {
    '& input': {
      padding: '1em',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  },
  submit: {
    padding: '.5em 3em',
    margin: '1em auto 0',
    display: 'block',
  },
}))
