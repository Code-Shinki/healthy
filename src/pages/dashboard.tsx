import Spinner from 'components/atoms/spinner'
import DashboardLayout from 'layouts/dashboard-layout'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'
import { userDatasetState } from 'states/userDataset'
import { SITE_DESCRIPTION, SITE_DOMAIN, SITE_TITLE } from 'utils/env'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const currentUser = useRecoilValue(currentUserState)
  const userDataset = useRecoilValue(userDatasetState)

  useEffect(() => {
    currentUser === null && router.push('/login')
  }, [currentUser])

  return (
    <>
      <Head>
        <link rel="canonical" href={`${SITE_DOMAIN}/dashboard`} />
        <title>{`ダッシュボード - ${SITE_TITLE}`}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={`${SITE_DOMAIN}/dashboard`} />
        <meta property="og:title" content={`ダッシュボード - ${SITE_TITLE}`} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_DOMAIN}/img/og-image.jpg`} />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      {currentUser && userDataset ? <DashboardLayout /> : <Spinner />}
    </>
  )
}

export default Dashboard

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      DrawerMenu: true,
    },
  }
}
