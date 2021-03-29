import { Button, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { todaysHealthDataState } from 'states/todaysHealthData'
import { userDatasetState } from 'states/userDataset'

const SetSymptom: FC = () => {
  const classes = useStyles()
  const userDataset = useRecoilValue(userDatasetState)
  const [todaysHealthData, setTodaysHealthData] = useRecoilState(todaysHealthDataState)
  const [tmpSymptom, setTmpSymptom] = useState('')

  useEffect(() => {
    if (!userDataset) return
    if (userDataset.health.length !== 0 && !todaysHealthData.symptom.length) {
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
      <Grid container justify="center" alignItems="center" className={classes.list}>
        {todaysHealthData.symptom.map((item: string, index: number) => {
          return (
            <div key={index.toString()}>
              {item}
              <button onClick={() => removeTodaysSymptom(index)}>×</button>
            </div>
          )
        })}
      </Grid>
      <form onSubmit={addTodaysSymptom} className={classes.form}>
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
  list: {
    width: '95%',
    maxWidth: '500px',
    margin: '0 auto',
    '& > div': {
      padding: '.5em .8em',
      margin: '0 .5em 1em .5em',
      color: 'var(--c-red)',
      fontWeight: 'bold',
      border: '1px solid var(--c-red)',
      borderLeft: '5px solid var(--c-red)',
      boxShadow: '2px 2px 3px rgba(0, 0, 0, .15)',
    },
    '& button': {
      width: '1.5em',
      height: '1.5em',
      marginLeft: '.7em',
      color: 'var(--c-red)',
      background: 'transparent',
      border: '1px solid var(--c-red)',
      borderRadius: '999px',
      cursor: 'pointer',
    },
  },
  form: {
    width: '95%',
    maxWidth: '400px',
    margin: '2em auto 0',
  },
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
