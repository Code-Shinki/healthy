import { makeStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import UserLabel from 'components/atoms/user-label'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { userDatasetState } from 'states/userDataset'
import styles from 'styles/common/dashboard-container.module.scss'

const DashboardUser: React.FC = () => {
  const classes = useStyles()
  const userDataset = useRecoilValue(userDatasetState)

  if (!userDataset) return null

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <PersonIcon />
      </div>
      <h2 className={styles.h2}>ユーザー情報</h2>
      <div className={classes.container}>
        <UserLabel>ユーザー名</UserLabel>
        <p className={classes.data}>{userDataset.name ? userDataset.name : '未設定'}</p>
        <UserLabel>性別</UserLabel>
        <p className={classes.data}>{userDataset.gender ? userDataset.gender : '未設定'}</p>
        <UserLabel>身長</UserLabel>
        <p className={classes.data}>{userDataset.height ? `${userDataset.height} cm` : '未設定'}</p>
        <UserLabel>体重</UserLabel>
        <p className={classes.data}>{userDataset.weight ? `${userDataset.weight} kg` : '未設定'}</p>
        <UserLabel>かかりつけ医</UserLabel>
        <p className={classes.data}>{userDataset.doctor ? userDataset.doctor : '未設定'}</p>
      </div>
    </div>
  )
}

export default DashboardUser

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 380,
    margin: '2em auto 0',
  },
  data: {
    margin: '.7em 0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
}))
