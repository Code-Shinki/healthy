import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import DrawerMenu from 'components/organisms/drawer-menu'
import { getFormattedDate } from 'libs/date'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import 'normalize.css'
import React, { useEffect } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'
import { getUserDataset } from 'requests/userDataset'
import { currentUserState } from 'states/currentUser'
import { userDatasetState } from 'states/userDataset'
import 'styles/assets/variables.scss'
import 'styles/global.scss'
import { SITE_TITLE } from 'utils/env'
import { auth } from 'utils/firebase'

const AppInit = () => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
  const [userDataset, setUserDataset] = useRecoilState(userDatasetState)

  useEffect(() => {
    // Firebase Authentication
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    })
    // Material-UI for SSR
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      // Fetch UserData
      if (currentUser && !userDataset) {
        const snapshot = await getUserDataset(currentUser.uid, { cache: true })
        if (!snapshot || !Object.keys(snapshot).length) {
          await auth.signOut().catch((err) => alert(err.message))
          router.push('404')
          return
        }
        setUserDataset(snapshot)
      }
    })()
  }, [currentUser])

  useEffect(() => {
    const hidePage = ['/', '/404']
    let isAvailableCheck = true

    for (let i = 0; i < hidePage.length; i++) {
      if (router.pathname === hidePage[i]) isAvailableCheck = false
    }

    // Go to Checkup
    if (userDataset && isAvailableCheck) {
      if (!userDataset.health.length) {
        router.push('checkup')
        return
      }

      const latestData = userDataset.health.slice(-1)[0]
      const lasttime = Number(getFormattedDate(latestData.createdAt, 'yyyyMMdd'))
      const today = Number(getFormattedDate(new Date(), 'yyyyMMdd'))

      today - lasttime !== 0 && router.push('checkup')
    }
  }, [userDataset])

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
        <meta property="og:site_name" content={SITE_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff" />
        <meta name="apple-mobile-web-app-title" content={SITE_TITLE} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/img/icon/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/icon/apple-touch-icon-180x180.png" />
        <link rel="mask-icon" href="/img/icon/safari-pinned-tab.svg" color="#eceff4" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileImage" content="/img/icon/site-tile-150x150.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <RecoilRoot>
        <MuiThemeProvider theme={theme}>
          {pageProps.DrawerMenu ? (
            <>
              <DrawerMenu>
                <Component {...pageProps} />
              </DrawerMenu>
            </>
          ) : (
            <Component {...pageProps} />
          )}
        </MuiThemeProvider>
        <AppInit />
      </RecoilRoot>
    </>
  )
}

export default App

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  palette: {
    primary: {
      main: '#03A9F4',
    },
    text: {
      primary: '#333',
    },
    background: {
      paper: '#fafafa',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '"Hiragino Sans"',
      '"Hiragino Kaku Gothic ProN"',
      '"BIZ UDPGothic"',
      'Meiryo',
      '"sans-serif"',
    ].join(','),

    body1: {
      fontSize: 'inherit',
    },
    body2: {
      fontSize: 'inherit',
    },
  },
})
