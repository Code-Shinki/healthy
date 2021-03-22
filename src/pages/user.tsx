import { Button, FormControlLabel, Radio, RadioGroup, TextField, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Spinner from 'components/Spinner'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getUserDataset, postUserDataset } from 'requests/userDataset'
import { currentUserState } from 'states/currentUser'
import { userDatasetState } from 'states/userDataset'
import { UserDataset } from 'types/userDataset'

const User: NextPage = () => {
  const router = useRouter()
  const classes = useStyles()
  const currentUser = useRecoilValue(currentUserState)
  const [userDataset, setUserDataset] = useRecoilState(userDatasetState)
  const [name, setName] = useState<null | string>('')
  const [gender, setGender] = useState<null | string>(null)
  const [height, setHeight] = useState<null | number>(null)
  const [weight, setWeight] = useState<null | number>(null)
  const [doctor, setDoctor] = useState<null | string>(null)

  useEffect(() => {
    if (currentUser === null) router.push('/login')
  }, [currentUser])

  useEffect(() => {
    if (!userDataset) return

    setName(userDataset.name)
    setGender(userDataset.gender)
    setHeight(userDataset.height)
    setWeight(userDataset.weight)
    setDoctor(userDataset.doctor)
  }, [userDataset])

  const updateUserInfo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentUser) {
      const updateValue = {
        name: name,
        gender: gender,
        height: height,
        weight: weight,
        doctor: doctor,
      }
      await postUserDataset(currentUser.uid, { ...(userDataset as UserDataset), ...updateValue })
      const newDataset = await getUserDataset(currentUser.uid, { cache: false })
      setUserDataset(newDataset)
      alert('Success Update.')
    }
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

  if (currentUser && userDataset) {
    return (
      <>
        <Head>
          <title>User</title>
        </Head>
        <div className={classes.container}>
          <h1 className={classes.h1}>ユーザー設定</h1>
          <form className={classes.form} noValidate onSubmit={updateUserInfo}>
            <div className={classes.wrapper}>
              <label htmlFor="name" className={classes.label}>
                ユーザー名
              </label>
              <TextField
                id="name"
                name="name"
                value={name ? name : ''}
                autoComplete="name"
                required
                fullWidth
                margin="dense"
                onChange={changeName}
                className={classes.input}
              />
            </div>
            <div className={classes.wrapper}>
              <label htmlFor="gender" className={classes.label}>
                性別
              </label>
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
            <div className={classes.wrapper}>
              <label htmlFor="height" className={classes.label}>
                身長
              </label>
              <TextField
                id="height"
                name="height"
                type="number"
                inputProps={{ step: '0.1' }}
                value={height ? height : ''}
                required
                fullWidth
                margin="dense"
                onChange={changeHeight}
                className={classes.input}
              />
            </div>
            <div className={classes.wrapper}>
              <label htmlFor="weight" className={classes.label}>
                体重
              </label>
              <TextField
                id="weight"
                name="weight"
                type="number"
                inputProps={{ step: '0.1' }}
                value={weight ? weight : ''}
                required
                fullWidth
                margin="dense"
                onChange={changeWeight}
                className={classes.input}
              />
            </div>
            <div className={classes.wrapper}>
              <label htmlFor="doctor" className={classes.label}>
                かかりつけ医
              </label>
              <TextField
                id="doctor"
                name="doctor"
                value={doctor ? doctor : ''}
                required
                fullWidth
                margin="dense"
                onChange={changeDoctor}
                className={classes.input}
              />
            </div>
            <Button type="submit" variant="outlined" color="primary" size="large" className={classes.submit}>
              更新する
            </Button>
          </form>
        </div>
      </>
    )
  }

  return <Spinner />
}

export default User

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: '2em 1em',
    margin: '4em 1em 0',
    background: '#fff',
    borderRadius: 5,
    boxShadow: '0 1px 4px rgba(0, 0, 0, .15)',
    position: 'relative',
    [theme.breakpoints.up('lg')]: {
      maxWidth: 800,
      padding: '45px',
      margin: '4em auto 0',
    },
  },
  h1: {
    width: '90%',
    padding: '.4em .2em',
    margin: 0,
    color: '#fff',
    fontSize: '1.8em',
    fontWeight: 'normal',
    textAlign: 'center',
    background: 'var(--c-primary)',
    borderRadius: 5,
    boxShadow: '0 4px 20px 0 rgba(0, 0, 0, .15), 0 7px 10px -5px rgba(0, 0, 0, .15)',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  label: {
    padding: '0 0 0 .3em',
    color: 'var(--c-primary)',
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  wrapper: {
    margin: '2em 0',
  },
  input: {
    '& input': {
      padding: '.8em .5em',
    },
  },
  radio: {
    margin: '8px 0 4px',
    '& svg': {
      fontSize: '2.3rem',
    },
  },
  submit: {
    margin: '0 auto',
    display: 'block',
  },
}))

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      menuLayout: true,
    },
  }
}
