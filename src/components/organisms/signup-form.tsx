import { Button, ButtonGroup, Grid, Link, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CustomizedSnackbar from 'components/atoms/custom-snackbar'
import SpinnerModal from 'components/molecules/spinner-modal'
import userDemoDataset from 'datasets/userDemoDataset.json'
import userInitDataset from 'datasets/userInitDataset.json'
import { getDemoDate } from 'libs/date'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useState } from 'react'
import { postUserDataset } from 'requests/userDataset'
import { UserDataset } from 'types/userDataset'
import { auth } from 'utils/firebase'

const SignupForm: React.FC = () => {
  const router = useRouter()
  const classes = useStyles()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  let userId: undefined | string

  const createEmailUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsCreating(true)

    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((credential) => (userId = credential.user?.uid))
      .catch(() => {
        setIsCreating(false)
        setIsAlertOpen(true)
      })

    if (userId) {
      const initDataset = { ...userInitDataset, name: name }
      await createDatabase(initDataset)
      router.push('/dashboard')
    }
  }

  const createAnonymousUser = async () => {
    setIsCreating(true)

    await auth
      .signInAnonymously()
      .then((credential) => (userId = credential.user?.uid))
      .catch(() => {
        setIsCreating(false)
        setIsAlertOpen(true)
      })

    if (userId) {
      // デモデータの日時をアカウント作成日時と同期する
      const demoDate = getDemoDate()
      const demoDataset = {
        ...userDemoDataset,
        health: userDemoDataset.health.map((item, index) => {
          return { ...item, createdAt: demoDate[index] }
        }),
      }
      await createDatabase(demoDataset)
      router.push('/dashboard')
    }
  }

  const createDatabase = async (dataset: UserDataset) => {
    await postUserDataset(userId as string, { ...dataset, createdAt: new Date().toString() }).catch(() =>
      router.push('/404')
    )
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
  const alertClose = (open: boolean) => {
    setIsAlertOpen(open)
  }

  return (
    <>
      <form className={classes.form} noValidate onSubmit={createEmailUser}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="name"
              name="name"
              label="ユーザー名"
              autoComplete="name"
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
            <Link href="/login">既にアカウントを持っている方はこちら</Link>
          </NextLink>
        </Grid>
      </Grid>
      {isCreating && <SpinnerModal />}
      <CustomizedSnackbar type="error" open={isAlertOpen} setClose={alertClose}>
        登録に失敗しました。 メールアドレスとパスワードをご確認ください。
      </CustomizedSnackbar>
    </>
  )
}

export default SignupForm

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(3, 0, 4),
  },
  submit: {
    margin: theme.spacing(5, 0, 0),
  },
}))
