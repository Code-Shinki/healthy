import { Grid, Theme } from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import EventNoteIcon from '@material-ui/icons/EventNote'
import PersonIcon from '@material-ui/icons/Person'
import { makeStyles } from '@material-ui/styles'
import ConditionList from 'components/ConditionList'
import Spinner from 'components/Spinner'
import Summary from 'components/Summary'
import TemperatureGraph from 'components/TemperatureGraph'
import UserInfo from 'components/UserInfo'
import ContentsWrapper from 'layouts/ContentsWrapper'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const classes = useStyles()
  const currentUser = useRecoilValue(currentUserState)

  useEffect(() => {
    if (currentUser === null) router.push('/login')
  }, [currentUser])

  if (currentUser) {
    return (
      <>
        <Head>
          <title>Dashboard</title>
        </Head>
        <Grid container justify="space-around" alignItems="center" spacing={2} className={classes.root}>
          <Grid item xs={12} lg={4} className={classes.container} style={{ minWidth: '300px', maxWidth: '350px' }}>
            <ContentsWrapper class={classes.wrapper}>
              <h2>
                <AssignmentIcon className={classes.container} style={{ fontSize: '1.4em' }} />
              </h2>
              <Summary />
            </ContentsWrapper>
          </Grid>
          <Grid item xs={12} lg={7} className={classes.container}>
            <ContentsWrapper class={classes.wrapper}>
              <h2>
                <EventNoteIcon style={{ fontSize: '1.4em' }} />
              </h2>
              <ConditionList />
            </ContentsWrapper>
          </Grid>
          <Grid item xs={12} lg={8} className={classes.container}>
            <ContentsWrapper class={classes.wrapper}>
              <h2>
                <EqualizerIcon style={{ fontSize: '1.4em' }} />
              </h2>
              <TemperatureGraph type="mini" />
            </ContentsWrapper>
          </Grid>
          <Grid item xs={12} lg={3} style={{ minWidth: '300px', maxWidth: '500px' }}>
            <ContentsWrapper class={classes.wrapper}>
              <h2>
                <PersonIcon style={{ fontSize: '1.4em' }} />
              </h2>
              <UserInfo />
            </ContentsWrapper>
          </Grid>
        </Grid>
      </>
    )
  }

  return <Spinner />
}

export default Dashboard

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '95%',
    margin: '0 auto',
    flexGrow: 1,
    [theme.breakpoints.up('lg')]: {
      width: '90%',
    },
  },
  container: {
    marginBottom: '2em',
    [theme.breakpoints.up('xl')]: {
      marginBottom: '4em',
    },
  },
  wrapper: {
    padding: '1.5em',
    '& h2': {
      width: 'auto',
      left: '60px',
      '& svg': {
        margin: '.1em .3em',
      },
    },
  },
}))

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      menuLayout: true,
    },
  }
}
