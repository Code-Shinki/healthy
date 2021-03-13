import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'
import { fetchGetUserDataset } from 'requests/userDataset'
import { currentUserState } from 'states/currentUser'
import { userDatasetState } from 'states/userDataset'
import 'styles/global.scss'
import { UserDataset } from 'types/userDataset'
import { auth } from 'utils/firebase'

const AppInit = () => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
  const [userDataset, setUserDataset] = useRecoilState(userDatasetState)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    })
  }, [])

  useEffect(() => {
    ;(async () => {
      if (currentUser && !userDataset) {
        const snapshot = await fetchGetUserDataset(currentUser.uid)
        if (!snapshot || !Object.keys(snapshot).length) {
          await auth.signOut().catch((err) => alert(err.message))
          router.push('404')
          return
        }
        setUserDataset({ ...snapshot } as UserDataset)
      }
    })()
  }, [currentUser])

  return null
}

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff" />
        <meta name="apple-mobile-web-app-title" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/img/favicons/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/favicons/apple-touch-icon-180x180.png" />
        <link rel="mask-icon" href="/img/favicons/safari-pinned-tab.svg" color="#eceff4" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileImage" content="/img/favicons/site-tile-150x150.png" />
      </Head>
      <RecoilRoot>
        <Component {...pageProps} />
        <AppInit />
      </RecoilRoot>
    </>
  )
}

export default App
