import Spinner from 'components/Spinner'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'
import { auth } from 'utils/firebase'

const Login: NextPage = () => {
  const router = useRouter()
  const currentUser = useRecoilValue(currentUserState)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    if (currentUser) router.push('/dashboard')
  }, [currentUser])

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await auth.signInWithEmailAndPassword(email, password).catch((err) => {
      alert(err.message)
    })
    router.push('/dashboard')
  }

  if (currentUser === null) {
    return (
      <>
        <Head>
          <title>Login</title>
        </Head>
        <form onSubmit={(e) => login(e)}>
          <div>
            <label htmlFor="email">メールアドレス</label>
            <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">パスワード</label>
            <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} autoComplete="on" />
          </div>
          <button type="submit">ログイン</button>
        </form>
        <Link href="/signup">
          <a>新規作成</a>
        </Link>
      </>
    )
  }

  return <Spinner />
}

export default Login
