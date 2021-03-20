import { createStyles, makeStyles } from '@material-ui/core/styles'
import React, { FC } from 'react'
import styles from 'styles/components/spinner.module.scss'

const Spinner: FC = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.root}>
        <div className={styles['dot-floating']}></div>
      </div>
    </>
  )
}

export default Spinner

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
    },
  })
)
