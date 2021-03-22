import Spinner from 'components/Spinner'
import Link from 'next/link'
import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { userDatasetState } from 'states/userDataset'

const UserInfo: FC = () => {
  const userDataset = useRecoilValue(userDatasetState)

  if (userDataset) {
    return (
      <>
        <h2>あなたの情報</h2>
        <div>名前：{userDataset.name}</div>
        <div>性別：{userDataset.gender}</div>
        <div>身長：{userDataset.height}</div>
        <div>体重：{userDataset.weight}</div>
        <div>かかりつけ医：{userDataset.doctor}</div>
        <Link href="/user">
          <a>編集</a>
        </Link>
      </>
    )
  }

  return <Spinner />
}

export default UserInfo
