import { Theme } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import { makeStyles } from '@material-ui/styles'
import CheckupForm from 'components/organisms/checkup-form'
import React from 'react'
import styles from 'styles/common/content-wrapper.module.scss'

const CheckupLayout: React.FC = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.root}>
        <h1 className={styles.title}>
          <ChatIcon className={styles.icon} />
          今日の体調
        </h1>
        <section aria-label="form-wrapper" className={styles.container}>
          <CheckupForm />
        </section>
      </div>
    </>
  )
}

export default CheckupLayout

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
