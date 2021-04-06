import { Grid } from '@material-ui/core'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import React from 'react'
import styles from './nonce-label.module.scss'

type Props = {
  children: React.ReactNode
}

const NonceLabel: React.FC<Props> = ({ children }) => {
  return (
    <Grid container wrap="wrap" justify="center" alignItems="center" className={styles.root}>
      <NotInterestedIcon className={styles.icon} />
      <p className={styles.message}>{children}</p>
    </Grid>
  )
}

export default NonceLabel
