import { makeStyles } from '@material-ui/core/styles'
import Spinner from 'components/Spinner'
import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { userDatasetState } from 'states/userDataset'

const UserInfo: FC = () => {
  const classes = useStyles()
  const userDataset = useRecoilValue(userDatasetState)

  if (userDataset) {
    return (
      <>
        <div className={classes.title}>ユーザー情報</div>
        <div className={classes.label}>ユーザー名</div>
        <div className={classes.data}>{userDataset.name}</div>
        <div className={classes.label}>性別</div>
        <div className={classes.data}>{userDataset.gender}</div>
        <div className={classes.label}>身長</div>
        <div className={classes.data}>{userDataset.height} cm</div>
        <div className={classes.label}>体重</div>
        <div className={classes.data}>{userDataset.weight} kg</div>
        <div className={classes.label}>かかりつけ医</div>
        <div className={classes.data}>{userDataset.doctor}</div>
      </>
    )
  }

  return <Spinner />
}

export default UserInfo

const useStyles = makeStyles(() => ({
  title: {
    color: 'var(--c-primary)',
    fontSize: '1.4em',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  label: {
    padding: '.3em .5em',
    margin: '1.2em 0 .5em',
    color: 'var(--c-primary)',
    fontSize: '1.1em',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#DFEDF4',
    borderBottom: '3px solid var(--c-primary)',
  },
  data: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
}))
