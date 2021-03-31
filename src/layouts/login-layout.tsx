import { Avatar, Grid, Paper, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SecurityIcon from '@material-ui/icons/LockOpen'
import LoginForm from 'components/organisms/login-form'
import React from 'react'

const LoginLayout: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={8} md={6} lg={5} component={Paper} elevation={6} square className={classes.paper}>
        <div className={classes.container}>
          <Avatar className={classes.avatar}>
            <SecurityIcon style={{ fontSize: '2.5em' }} />
          </Avatar>
          <h1>ログイン</h1>
          <p>※ 現在ログアウト時にデータを削除しているため利用できません。</p>
          <LoginForm />
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={6} lg={7} className={classes.image} />
    </Grid>
  )
}

export default LoginLayout

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  container: {
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
  image: {
    backgroundImage: 'url(/img/login-bg.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}))
