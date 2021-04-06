import { Button, Grid, Link, TextField, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CustomizedSnackbar from 'components/atoms/custom-snackbar'
import { validateEmail } from 'libs/validate'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { auth } from 'utils/firebase'

const LoginForm: React.FC = () => {
  const router = useRouter()
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validate()) {
      setIsAlertOpen(true)
      return
    }

    await auth
      .signInWithEmailAndPassword(email, password)
      .then(() => router.push('/dashboard'))
      .catch(() => {
        setAlertMessage('ログイン失敗 : メールアドレスとパスワードをご確認ください')
        setIsAlertOpen(true)
        return
      })
  }

  const validate = () => {
    if (!validateEmail(email)) {
      setAlertMessage('有効なメールアドレスを入力してください。')
      return false
    }

    return true
  }

  const changeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const changePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const alertClose = (open: boolean) => {
    setIsAlertOpen(open)
  }

  return (
    <>
      <form className={classes.form} noValidate onSubmit={login}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="email"
              id="email"
              name="email"
              aria-label="email"
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
              aria-label="password"
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
      <CustomizedSnackbar type="warning" open={isAlertOpen} setClose={alertClose}>
        {alertMessage}
      </CustomizedSnackbar>
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
