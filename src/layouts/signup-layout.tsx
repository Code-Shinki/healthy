import { Avatar, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import SignupModal from 'components/molecules/signup-modal'
import SignupForm from 'components/organisms/signup-form'
import React from 'react'

const SignupLayout: React.FC = () => {
  const classes = useStyles()

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={6} lg={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={6} lg={5} component={Paper} elevation={6} square className={classes.paper}>
          <div className={classes.container}>
            <Avatar className={classes.avatar}>
              <PersonAddIcon style={{ fontSize: '2.5em' }} />
            </Avatar>
            <h1>ようこそHealthyへ</h1>
            <p>新規登録して体調を記録しましょう。</p>
            <SignupForm />
          </div>
        </Grid>
      </Grid>
      <SignupModal />
    </>
  )
}

export default SignupLayout

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundImage: 'url(/img/signup-bg.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}))
