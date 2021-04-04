import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CustomizedSnackbar from 'components/atoms/custom-snackbar'
import UserLabel from 'components/atoms/user-label'
import { validateDoctor, validateHeight, validateName, validateWeight } from 'libs/validate'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getUserDataset, postUserDataset } from 'requests/userDataset'
import { currentUserState } from 'states/currentUser'
import { userDatasetState } from 'states/userDataset'
import { UserDataset } from 'types/userDataset'
import styles from './user-form.module.scss'

const UserForm: React.FC = () => {
  const router = useRouter()
  const classes = useStyles()
  const currentUser = useRecoilValue(currentUserState)
  const [userDataset, setUserDataset] = useRecoilState(userDatasetState)
  const [name, setName] = useState<null | string>('')
  const [gender, setGender] = useState<null | string>(null)
  const [height, setHeight] = useState<null | number>(null)
  const [weight, setWeight] = useState<null | number>(null)
  const [doctor, setDoctor] = useState<null | string>(null)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'warning' | 'success'>('warning')

  useEffect(() => {
    if (!userDataset) return

    setName(userDataset.name)
    setGender(userDataset.gender)
    setHeight(userDataset.height)
    setWeight(userDataset.weight)
    setDoctor(userDataset.doctor)
  }, [userDataset])

  const updateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!currentUser) return

    if (!validate()) {
      setAlertType('warning')
      setIsAlertOpen(true)
      return
    }

    const updateValue = {
      name: name,
      gender: gender,
      height: height,
      weight: weight,
      doctor: doctor,
    }

    await postUserDataset(currentUser.uid, { ...(userDataset as UserDataset), ...updateValue })
    const newDataset = await getUserDataset(currentUser.uid, { cache: false })

    !newDataset && router.push('/404')
    setUserDataset(newDataset)

    setAlertMessage('ユーザー情報を更新しました！')
    setAlertType('success')
    setIsAlertOpen(true)
  }

  const validate = () => {
    if (!validateName(name)) {
      setAlertMessage('ユーザー名は30文字以下にしてください。')
      return false
    }
    if (!validateHeight(height)) {
      setAlertMessage('身長は50～300(cm)の数字にしてください。')
      return false
    }
    if (!validateWeight(weight)) {
      setAlertMessage('体重は10～300(kg)の数字にしてください。')
      return false
    }
    if (!validateDoctor(doctor)) {
      setAlertMessage('かかりつけ医は30文字以下にしてください。')
      return false
    }

    return true
  }

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  const changeGender = (event: ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value)
  }
  const changeHeight = (event: ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(event.target.value))
  }
  const changeWeight = (event: ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(event.target.value))
  }
  const changeDoctor = (event: ChangeEvent<HTMLInputElement>) => {
    setDoctor(event.target.value)
  }
  const alertClose = (open: boolean) => {
    setIsAlertOpen(open)
  }

  if (!currentUser || !userDataset) return null

  return (
    <>
      <form className={styles.form} noValidate onSubmit={updateUser}>
        <div className={styles.wrapper}>
          <UserLabel>ユーザー名</UserLabel>
          <TextField
            id="name"
            name="name"
            inputProps={{ 'aria-label': 'name' }}
            value={name ? name : ''}
            autoComplete="name"
            required
            margin="dense"
            onChange={changeName}
            className={classes.input}
          />
        </div>
        <div className={styles.wrapper}>
          <UserLabel>性別</UserLabel>
          <RadioGroup aria-label="gender" name="gender" row onChange={changeGender} className={classes.radio}>
            <FormControlLabel
              value="男性"
              control={<Radio color="primary" checked={gender === '男性'} />}
              label="男性"
            />
            <FormControlLabel
              value="女性"
              control={<Radio color="primary" checked={gender === '女性'} />}
              label="女性"
            />
          </RadioGroup>
        </div>
        <div className={styles.wrapper}>
          <UserLabel>身長</UserLabel>
          <TextField
            id="height"
            name="height"
            type="number"
            inputProps={{ 'aria-label': 'height', step: '0.1' }}
            value={height ? height : ''}
            required
            margin="dense"
            onChange={changeHeight}
            className={classes.input}
          />
        </div>
        <div className={styles.wrapper}>
          <UserLabel>体重</UserLabel>
          <TextField
            id="weight"
            name="weight"
            type="number"
            inputProps={{ 'aria-label': 'weight', step: '0.1' }}
            value={weight ? weight : ''}
            required
            margin="dense"
            onChange={changeWeight}
            className={classes.input}
          />
        </div>
        <div className={styles.wrapper}>
          <UserLabel>かかりつけ医</UserLabel>
          <TextField
            id="doctor"
            name="doctor"
            inputProps={{ 'aria-label': 'doctor' }}
            value={doctor ? doctor : ''}
            required
            margin="dense"
            onChange={changeDoctor}
            className={classes.input}
          />
        </div>
        <Button type="submit" variant="outlined" color="primary" size="large" className={classes.submit}>
          更新する
        </Button>
      </form>
      <CustomizedSnackbar type={alertType} open={isAlertOpen} setClose={alertClose}>
        {alertMessage}
      </CustomizedSnackbar>
    </>
  )
}

export default UserForm

const useStyles = makeStyles(() => ({
  input: {
    width: '100%',
    '& > div': {
      width: '90%',
      margin: '0 auto',
    },
    '& input': {
      padding: '.8em .5em',
      textAlign: 'center',
    },
  },
  radio: {
    margin: '8px 0 4px',
    display: 'flex',
    justifyContent: 'space-around',
    '& svg': {
      fontSize: '2.3rem',
    },
  },
  submit: {
    margin: '0 auto',
    display: 'block',
  },
}))
