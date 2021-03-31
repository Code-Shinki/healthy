import { Button, Grid, Link, TextField, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { auth } from 'utils/firebase'

const LoginForm: React.FC = () => {
  const router = useRouter()
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

  return (
    <>
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
        <Button type="submit" variant="outlined" color="primary" size="large" className={classes.submit} fullWidth>
          ログイン
        </Button>
      </form>
      <Grid container justify="flex-end">
        <NextLink href="/signup">
          <Link href="/signup">新規作成はこちら</Link>
        </NextLink>
      </Grid>
    </>
  )
}

export default LoginForm

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(3, 0, 4),
  },
  submit: {
    margin: theme.spacing(5, 0, 0),
  },
}))
