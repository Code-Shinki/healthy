import Spinner from 'components/atoms/spinner'
import HealthdataLayout from 'layouts/healthdata-layout'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'
import { userDatasetState } from 'states/userDataset'

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
        <title>Healthdata</title>
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
