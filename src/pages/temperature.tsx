import { makeStyles, Theme } from '@material-ui/core/styles'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import Spinner from 'components/Spinner'
import TemperatureGraph from 'components/TemperatureGraph'
import ContentsWrapper from 'layouts/ContentsWrapper'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from 'states/currentUser'

const Temperature: NextPage = () => {
  const router = useRouter()
  const classes = useStyles()
  const currentUser = useRecoilValue(currentUserState)

  useEffect(() => {
    if (currentUser === null) router.push('/login')
  }, [currentUser])

  if (currentUser) {
    return (
      <>
        <Head>
          <title>Temperature</title>
        </Head>
        <ContentsWrapper class={classes.container}>
          <h1>
            <EqualizerIcon style={{ fontSize: '1.4em' }} />
            体温グラフ
          </h1>
          <TemperatureGraph type="full" />
        </ContentsWrapper>
      </>
    )
  }

  return <Spinner />
}

export default Temperature

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '95%',
    [theme.breakpoints.up('lg')]: {
      width: '90%',
    },
  },
}))

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      menuLayout: true,
    },
  }
}
