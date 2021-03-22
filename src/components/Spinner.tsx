import { createStyles, makeStyles } from '@material-ui/core/styles'
import React, { FC } from 'react'
import styles from 'styles/components/spinner.module.scss'

const Spinner: FC = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.root}>
        <div className={styles['dot-bricks']}></div>
        <div className={classes.notice}>読み込んでいます</div>
      </div>
    </>
  )
}

export default Spinner

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      height: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignContent: 'center',
    },
    notice: {
      width: '100%',
      margin: '2em 0 0',
      color: 'var(--c-primary)',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  })
)
