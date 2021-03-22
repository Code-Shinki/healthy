import { Avatar, Button, ButtonGroup, Grid, Link, Paper, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import SignupModal from 'components/SignupModal'
import Spinner from 'components/Spinner'
import userDemoDataset from 'datasets/userDemoDataset.json'
import userInitDataset from 'datasets/userInitDataset.json'
import { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { postUserDataset } from 'requests/userDataset'
import { getDemoDate } from 'scripts/date'
import { currentUserState } from 'states/currentUser'
import { UserDataset, UserHealthData } from 'types/userDataset'
import { auth } from 'utils/firebase'

const SignUp: NextPage = () => {
  const router = useRouter()
  const classes = useStyles()
  const currentUser = useRecoilValue(currentUserState)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  let userId: undefined | string

  useEffect(() => {
    if (currentUser) router.push('/dashboard')
  }, [currentUser])

  const createEmailUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((credential) => (userId = credential.user?.uid))
      .catch((err) => alert(err.message))
    if (userId) {
      const initDataset = { ...userInitDataset, name: name }
      await createDatabase(initDataset)
      router.push('/dashboard')
    }
  }

  const createAnonymousUser = async () => {
    await auth
      .signInAnonymously()
      .then((credential) => (userId = credential.user?.uid))
      .catch((err) => alert(err.message))
    if (userId) {
      // デモデータの日時をアカウント作成日時と同期する
      const demoDate = getDemoDate()
      const demoDataset = {
        ...userDemoDataset,
        health: userDemoDataset.health.map((item: UserHealthData, index: number) => {
          return { ...item, createdAt: demoDate[index] }
        }),
      }
      await createDatabase(demoDataset)
      router.push('/dashboard')
    }
  }

  const createDatabase = async (dataset: UserDataset) => {
    await postUserDataset(userId as string, { ...dataset, createdAt: new Date().toString() })
  }

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const changeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const changePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  if (currentUser === null) {
    return (
      <>
        <Head>
          <title>SignUp</title>
        </Head>
        <SignupModal />
        <Grid container component="main" className={classes.root}>
          <Grid item xs={false} sm={4} md={6} lg={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={6} lg={5} component={Paper} elevation={6} square className={classes.wrapper}>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <PersonAddIcon style={{ fontSize: '2.5em' }} />
              </Avatar>
              <h1>ようこそHealthyへ</h1>
              <p>新規登録して体調を記録しましょう。</p>
              <form className={classes.form} noValidate onSubmit={createEmailUser}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="name"
                      name="name"
                      label="ユーザー名"
                      autoComplete="name"
                      required
                      variant="outlined"
                      fullWidth
                      onChange={changeName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="email"
                      name="email"
                      label="メールアドレス"
                      autoComplete="email"
                      required
                      variant="outlined"
                      fullWidth
                      onChange={changeEmail}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      id="password"
                      name="password"
                      label="パスワード"
                      autoComplete="current-password"
                      required
                      variant="outlined"
                      fullWidth
                      onChange={changePassword}
                    />
                  </Grid>
                </Grid>
                <ButtonGroup color="primary" aria-label="contained primary button group" fullWidth>
                  <Button type="submit" size="large" className={classes.submit}>
                    登録する
                  </Button>
                  <Button type="button" size="large" className={classes.submit} onClick={createAnonymousUser}>
                    匿名カンタン登録
                  </Button>
                </ButtonGroup>
              </form>
              <Grid container justify="flex-end">
                <Grid item>
                  <NextLink href="/login">
                    <Link href="/login">既にアカウントを持っている場合はこちら</Link>
                  </NextLink>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </>
    )
  }

  return <Spinner />
}

export default SignUp

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    backgroundImage: 'url(/img/signup-bg.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(6, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(5, 0, 0),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(3, 0, 4),
  },
}))
