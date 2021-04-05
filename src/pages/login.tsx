import Spinner from 'components/atoms/spinner'
import LoginLayout from 'layouts/login-layout'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'
import { SITE_DESCRIPTION, SITE_DOMAIN, SITE_TITLE } from 'utils/env'

const Login: NextPage = () => {
  const router = useRouter()
  const currentUser = useRecoilValue(currentUserState)

  useEffect(() => {
    currentUser && router.push('/dashboard')
  }, [currentUser])

  return (
    <>
      <Head>
        <link rel="canonical" href={`${SITE_DOMAIN}/login`} />
        <title>{`ログイン - ${SITE_TITLE}`}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={`${SITE_DOMAIN}/login`} />
        <meta property="og:title" content={`ログイン - ${SITE_TITLE}`} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_DOMAIN}/img/og-image.jpg`} />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      {currentUser !== undefined ? <LoginLayout /> : <Spinner />}
    </>
  )
}

export default Login
