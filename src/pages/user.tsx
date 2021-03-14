import Spinner from 'components/Spinner'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getUserDataset, postUserDataset } from 'requests/userDataset'
import { currentUserState } from 'states/currentUser'
import { userDatasetState } from 'states/userDataset'
import { UserDataset } from 'types/userDataset'

const User: NextPage = () => {
  const router = useRouter()
  const currentUser = useRecoilValue(currentUserState)
  const [userDataset, setUserDataset] = useRecoilState(userDatasetState)
  const [name, setName] = useState<null | string>(null)
  const [sex, setSex] = useState<null | string>(null)
  const [height, setHeight] = useState<null | number>(null)
  const [weight, setWeight] = useState<null | number>(null)
  const [doctor, setDoctor] = useState<null | string>(null)

  useEffect(() => {
    if (currentUser === null) router.push('/login')
  }, [currentUser])

  useEffect(() => {
    if (!userDataset) return

    setName(userDataset.name)
    setSex(userDataset.sex)
    setHeight(userDataset.height)
    setWeight(userDataset.weight)
    setDoctor(userDataset.doctor)
  }, [userDataset])

  const updateUserInfo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentUser) {
      const updateValue = {
        name: name,
        sex: sex,
        height: height,
        weight: weight,
        doctor: doctor,
      }
      await postUserDataset(currentUser.uid, { ...(userDataset as UserDataset), ...updateValue })
      const newDataset = await getUserDataset(currentUser.uid, { cache: false })
      setUserDataset(newDataset)
      alert('Success Update.')
    }
  }

  if (currentUser && userDataset) {
    return (
      <>
        <Head>
          <title>User</title>
        </Head>
        <form onSubmit={(e) => updateUserInfo(e)}>
          <div>
            <label htmlFor="name">ユーザー名</label>
            <input id="name" type="text" defaultValue={name ? name : ''} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="sex">性別</label>
            <input
              type="radio"
              name="sex"
              value="男性"
              checked={sex === '男性'}
              onChange={(e) => setSex(e.target.value)}
            />
            <input
              type="radio"
              name="sex"
              value="女性"
              checked={sex === '女性'}
              onChange={(e) => setSex(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="height">身長</label>
            <input
              id="height"
              type="number"
              step="0.1"
              defaultValue={height ? height : ''}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="weight">体重</label>
            <input
              id="weight"
              type="number"
              step="0.1"
              defaultValue={weight ? weight : ''}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="doctor">かかりつけ医：</label>
            <input
              id="doctor"
              type="text"
              defaultValue={doctor ? doctor : ''}
              onChange={(e) => setDoctor(e.target.value)}
            />
          </div>
          <button type="submit">更新</button>
        </form>
      </>
    )
  }

  return <Spinner />
}

export default User
