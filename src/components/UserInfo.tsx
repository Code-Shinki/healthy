import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { userDataState } from 'scripts/store'

const UserInfo: FC = () => {
  const userData = useRecoilValue(userDataState)

  return (
    <>
      <div>名前：{userData.name}</div>
      <div>性別：{userData.sex}</div>
      <div>身長：{userData.height}</div>
      <div>体重：{userData.weight}</div>
      <div>かかりつけ医：{userData.doctor}</div>
    </>
  )
}

export default UserInfo
