import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { auth } from 'utils/firebase'

const Login: NextPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.push('/dashboard')
    })
  }, [])

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await auth.signInWithEmailAndPassword(email, password)
      router.push('/dashboard')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div>
      <form onSubmit={(e) => login(e)}>
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} autoComplete="on" />
        </div>
        <button type="submit">ログイン</button>
      </form>
      <Link href="/signup">
        <a>新規作成</a>
      </Link>
    </div>
  )
}

export default Login
