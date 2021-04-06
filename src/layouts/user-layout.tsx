import { Theme } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import { makeStyles } from '@material-ui/styles'
import UserForm from 'components/molecules/user-form'
import React from 'react'
import styles from 'styles/common/content-wrapper.module.scss'

const UserLayout: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h1 className={styles.title}>
        <PersonIcon className={styles.icon} />
        ユーザー設定
      </h1>
      <div className={styles.container}>
        <UserForm />
      </div>
    </div>
  )
}

export default UserLayout

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '95%',
    maxWidth: 800,
    margin: '2em auto 0',
    position: 'relative',
    [theme.breakpoints.up('lg')]: {
      width: '90%',
    },
  },
}))
