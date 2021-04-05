import Spinner from 'components/atoms/spinner'
import HealthdataLayout from 'layouts/healthdata-layout'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'
import { userDatasetState } from 'states/userDataset'
import { SITE_DESCRIPTION, SITE_DOMAIN, SITE_TITLE } from 'utils/env'

const Healthdata: NextPage = () => {
  const router = useRouter()
  const currentUser = useRecoilValue(currentUserState)
  const userDataset = useRecoilValue(userDatasetState)

  useEffect(() => {
    currentUser === null && router.push('/login')
  }, [currentUser])

  return (
    <>
      <Head>
        <link rel="canonical" href={`${SITE_DOMAIN}/healthdata`} />
        <title>{`ヘルスデータ - ${SITE_TITLE}`}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={`${SITE_DOMAIN}/healthdata`} />
        <meta property="og:title" content={`ヘルスデータ - ${SITE_TITLE}`} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_DOMAIN}/img/og-image.jpg`} />
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      {currentUser && userDataset ? <HealthdataLayout /> : <Spinner />}
    </>
  )
}

export default Healthdata

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      DrawerMenu: true,
    },
  }
}
