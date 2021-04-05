import { Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import SvgLogo from 'components/atoms/svg-logo'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styles from 'styles/pages/index.module.scss'

const Top: NextPage = () => {
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>Top</title>
      </Head>
      <div className={styles.root}>
        <Grid container justify="center" className={styles.container}>
          <SvgLogo styles={styles.logo} />
          <h1 className={styles.title}>Healthy</h1>
          <Link href="/login">
            <Button size="large" variant="outlined" component="a" className={classes.button}>
              <VpnKeyIcon className={classes.icon} />
              ログイン
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="large" variant="outlined" component="a" className={`${classes.button} ${styles.banner}`}>
              <PersonAddIcon className={classes.icon} />
              新規登録
            </Button>
          </Link>
        </Grid>
      </div>
    </>
  )
}

export default Top

const useStyles = makeStyles(() => ({
  button: {
    padding: '.5em 2em',
    margin: '1em 2em',
    color: 'var(--c-white)',
    fontSize: '1.1em',
    fontWeight: 'bold',
    border: '2px solid var(--c-white)',
  },
  icon: {
    margin: '0 .5em 0 0',
    fontSize: '1.8em',
  },
}))
