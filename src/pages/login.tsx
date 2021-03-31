import Spinner from 'components/atoms/spinner'
import LoginLayout from 'layouts/login-layout'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'

const Login: NextPage = () => {
  const router = useRouter()
  const currentUser = useRecoilValue(currentUserState)

  useEffect(() => {
    currentUser && router.push('/dashboard')
  }, [currentUser])

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      {currentUser !== undefined ? <LoginLayout /> : <Spinner />}
    </>
  )
}

export default Login
