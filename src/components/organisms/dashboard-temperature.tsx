import EqualizerIcon from '@material-ui/icons/Equalizer'
import NonceLabel from 'components/atoms/nonce-label.tsx'
import TemperatureGraph from 'components/molecules/temperature-graph'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { userDatasetState } from 'states/userDataset'
import styles from 'styles/common/dashboard-container.module.scss'

const DashboardTemperature: React.FC = () => {
  const userDataset = useRecoilValue(userDatasetState)
  const length = 7 // 表示するデータの数

  if (!userDataset) return null

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <EqualizerIcon />
      </div>
      <h2 className={styles.h2}>最近の体温</h2>

      {userDataset.health.length >= length ? (
        <TemperatureGraph length={length} />
      ) : (
        <NonceLabel>データが不足しています</NonceLabel>
      )}
    </div>
  )
}

export default DashboardTemperature
