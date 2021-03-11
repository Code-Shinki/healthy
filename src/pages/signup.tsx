import axios from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { userDatasetType, userDemoDataset, userHealthDataType, userInitialDataset } from 'scripts/dataset'
import { auth } from 'utils/firebase'

type Props = {
  initialDataset: userDatasetType
  demoDataset: userDatasetType
}

const SignUp: NextPage<Props> = ({ initialDataset, demoDataset }) => {
  const router = useRouter()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  let userId: string | undefined

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.push('/dashboard')
    })
  }, [])

  const createUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        userId = credential.user?.uid
        initialDataset.name = name
      })
      .catch((err) => {
        alert(err.message)
      })
    await createDatabase(initialDataset)
    router.push('/dashboard')
  }

  const createAnonymousUser = async () => {
    await auth
      .signInAnonymously()
      .then((credential) => {
        userId = credential.user?.uid
      })
      .catch((err) => {
        alert(err.message)
      })
    await createDatabase(demoDataset)
    router.push('/dashboard')
  }

  const createDatabase = async (dataset: userDatasetType) => {
    await axios
      .post('/api/db', { uid: userId, data: dataset, key: process.env.NEXT_PUBLIC_DB_API_KEY })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
  }

  return (
    <>
      <form onSubmit={(e) => createUser(e)}>
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

export default SignUp

export const getServerSideProps: GetServerSideProps = async () => {
  const initialDataset = userInitialDataset
  const today = new Date()
  const start = new Date()
  start.setDate(today.getDate() - 60)
  let demoDate: string[] = []

  for (let i = start; i < today; i.setDate(i.getDate() + 1)) {
    demoDate = [...demoDate, i.toString()]
  }

  // 匿名アカウント用のデモデータのキーをアカウント作成日時に変更する
  const demoDataset = {
    ...userDemoDataset,
    health: userDemoDataset.health.map((item: userHealthDataType, index: number) => {
      return {
        ...item,
        createdAt: demoDate[index],
      }
    }),
  }

  return {
    props: {
      initialDataset,
      demoDataset,
    },
  }
}
