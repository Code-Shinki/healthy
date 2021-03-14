import Spinner from 'components/Spinner'
import userDemoDataset from 'datasets/userDemoDataset.json'
import userInitDataset from 'datasets/userInitDataset.json'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { postUserDataset } from 'requests/userDataset'
import { currentUserState } from 'states/currentUser'
import { UserDataset, UserHealthData } from 'types/userDataset'
import { auth } from 'utils/firebase'

type Props = {
  demoDataset: UserDataset
}

const SignUp: NextPage<Props> = ({ demoDataset }) => {
  const router = useRouter()
  const currentUser = useRecoilValue(currentUserState)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  let userId: undefined | string

  useEffect(() => {
    if (currentUser) router.push('/dashboard')
  }, [currentUser])

  const createEmailUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((credential) => (userId = credential.user?.uid))
      .catch((err) => alert(err.message))
    if (userId) {
      const initDataset = { ...userInitDataset, name: name }
      await createDatabase(initDataset)
      router.push('/dashboard')
    }
  }

  const createAnonymousUser = async () => {
    await auth
      .signInAnonymously()
      .then((credential) => (userId = credential.user?.uid))
      .catch((err) => alert(err.message))
    if (userId) {
      await createDatabase(demoDataset)
      router.push('/dashboard')
    }
  }

  const createDatabase = async (dataset: UserDataset) => {
    await postUserDataset(userId as string, { ...dataset, createdAt: new Date().toString() })
  }

  if (currentUser === null) {
    return (
      <>
        <Head>
          <title>SignUp</title>
        </Head>
        <form onSubmit={(e) => createEmailUser(e)}>
          <div>
            <label htmlFor="name">ユーザー名</label>
            <input id="name" type="text" onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="email">メールアドレス</label>
            <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">パスワード</label>
            <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} autoComplete="on" />
          </div>
          <button type="submit">新規作成</button>
        </form>
        <button type="button" onClick={createAnonymousUser}>
          匿名カンタン登録
        </button>
        <Link href="/login">
          <a>ログイン</a>
        </Link>
      </>
    )
  }

  return <Spinner />
}

export default SignUp

export const getServerSideProps: GetServerSideProps = async () => {
  const today = new Date()
  const start = new Date()
  start.setDate(today.getDate() - 60)
  let demoDate: string[] = []

  for (let i = start; i < today; i.setDate(i.getDate() + 1)) {
    demoDate = [...demoDate, i.toString()]
  }

  // デモデータの日時をアカウント作成日時と同期する
  const demoDataset = {
    ...userDemoDataset,
    health: userDemoDataset.health.map((item: UserHealthData, index: number) => {
      return { ...item, createdAt: demoDate[index] }
    }),
  }

  return {
    props: {
      demoDataset,
    },
  }
}
