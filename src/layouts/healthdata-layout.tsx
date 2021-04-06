import { Theme } from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { makeStyles } from '@material-ui/styles'
import HealthdataTable from 'components/organisms/healthdata-table'
import React from 'react'
import styles from 'styles/common/content-wrapper.module.scss'

const HealthdataLayout: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h1 className={styles.title}>
        <AssignmentIcon className={styles.icon} />
        ヘルスデータ
      </h1>
      <div className={styles.container}>
        <HealthdataTable />
      </div>
    </div>
  )
}

export default HealthdataLayout

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '95%',
    maxWidth: '1400px',
    margin: '2em auto 0',
    position: 'relative',
    [theme.breakpoints.up('lg')]: {
      width: '90%',
    },
  },
}))
