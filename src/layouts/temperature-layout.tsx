import { Theme } from '@material-ui/core'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import { makeStyles } from '@material-ui/styles'
import NonceLabel from 'components/atoms/nonce-label.tsx'
import TemperatureGraph from 'components/molecules/temperature-graph'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { userDatasetState } from 'states/userDataset'
import styles from 'styles/common/content-wrapper.module.scss'

const TemperatureLayout: React.FC = () => {
  const classes = useStyles()
  const userDataset = useRecoilValue(userDatasetState)

  return (
    <div className={classes.root}>
      <h1 className={styles.title}>
        <EqualizerIcon className={styles.icon} />
        体温グラフ
      </h1>
      <div className={styles.container}>
        {userDataset && userDataset.health.length ? (
          <TemperatureGraph />
        ) : (
          <NonceLabel>データが不足しています</NonceLabel>
        )}
      </div>
    </div>
  )
}

export default TemperatureLayout

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
