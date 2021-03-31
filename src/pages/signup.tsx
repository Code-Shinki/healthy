import Spinner from 'components/atoms/spinner'
import SignupLayout from 'layouts/signup-layout'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'

const SignUp: NextPage = () => {
  const router = useRouter()
  const currentUser = useRecoilValue(currentUserState)

  useEffect(() => {
    currentUser && router.push('/dashboard')
  }, [currentUser])

  return (
    <>
      <Head>
        <title>SignUp</title>
      </Head>
      {currentUser !== undefined ? <SignupLayout /> : <Spinner />}
    </>
  )
}

export default SignUp
