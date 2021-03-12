import Spinner from 'components/Spinner'
import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { userDatasetState } from 'states/userDataset'

const UserInfo: FC = () => {
  const userDataset = useRecoilValue(userDatasetState)

  if (userDataset) {
    return (
      <>
        <div>名前：{userDataset.name}</div>
        <div>性別：{userDataset.sex}</div>
        <div>身長：{userDataset.height}</div>
        <div>体重：{userDataset.weight}</div>
        <div>かかりつけ医：{userDataset.doctor}</div>
      </>
    )
  }

  return <Spinner />
}

export default UserInfo
