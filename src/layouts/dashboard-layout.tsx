import { Grid, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import DashboardCondition from 'components/organisms/dashboard-condition'
import DashboardSummary from 'components/organisms/dashboard-summary'
import DashboardTemperature from 'components/organisms/dashboard-temperature'
import DashboardUser from 'components/organisms/dashboard-user'
import React from 'react'

const DashboardLayout: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container justify="space-around" alignItems="center" className={classes.root}>
      <Grid item xl={3} className={`${classes.container} ${classes.summary}`}>
        <DashboardSummary />
      </Grid>
      <Grid item xl={7} className={`${classes.container}`}>
        <DashboardCondition />
      </Grid>
      <Grid item xl={7} className={`${classes.container}`}>
        <DashboardTemperature />
      </Grid>
      <Grid item xl={3} className={`${classes.container} ${classes.user}`}>
        <DashboardUser />
      </Grid>
    </Grid>
  )
}

export default DashboardLayout

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '95%',
    margin: '0 auto',
  },
  container: {
    width: '100%',
    margin: '0 0 2em',
    [theme.breakpoints.up('md')]: {
      margin: '0 1em 3em',
    },
    [theme.breakpoints.up('xl')]: {
      margin: '0 0 3em',
    },
  },
  summary: {
    maxWidth: 400,
    [theme.breakpoints.up('sm')]: {
      minWidth: 320,
    },
  },
  user: {
    maxWidth: 450,
    [theme.breakpoints.up('sm')]: {
      minWidth: 340,
    },
    [theme.breakpoints.up('lg')]: {
      margin: '0 1em',
    },
    [theme.breakpoints.up('xl')]: {
      margin: '0',
    },
  },
}))
