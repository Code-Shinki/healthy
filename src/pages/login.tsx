import { Avatar, Button, Grid, Link, Paper, TextField, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SecurityIcon from '@material-ui/icons/LockOpen'
import Spinner from 'components/Spinner'
import { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'
import { auth } from 'utils/firebase'

const Login: NextPage = () => {
  const router = useRouter()
  const classes = useStyles()
  const currentUser = useRecoilValue(currentUserState)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    if (currentUser) router.push('/dashboard')
  }, [currentUser])

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await auth.signInWithEmailAndPassword(email, password).catch((err) => {
      alert(err.message)
    })
    router.push('/dashboard')
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
          <title>Login</title>
        </Head>
        <Grid container component="main" className={classes.root}>
          <Grid item xs={12} sm={8} md={6} lg={5} component={Paper} elevation={6} square className={classes.wrapper}>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <SecurityIcon style={{ fontSize: '2.5em' }} />
              </Avatar>
              <h1>ログイン</h1>
              <p>※ 現在ログアウト時にデータを削除しているため利用できません。</p>
              <form className={classes.form} noValidate onSubmit={login}>
                <Grid container spacing={2}>
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
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  size="large"
                  className={classes.submit}
                  fullWidth
                >
                  ログイン
                </Button>
              </form>
              <Grid container justify="flex-end">
                <Grid item>
                  <NextLink href="/signup">
                    <Link href="/signup">新規作成はこちら</Link>
                  </NextLink>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={false} sm={4} md={6} lg={7} className={classes.image} />
        </Grid>
      </>
    )
  }

  return <Spinner />
}

export default Login

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  image: {
    backgroundImage: 'url(/img/login-bg.jpg)',
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
