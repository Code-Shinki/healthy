import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import 'normalize.css'
import React, { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import 'styles/assets/variables.scss'
import 'styles/global.scss'
import DrawerMenu from '../../src/components/organisms/drawer-menu'

type Props = {
  children: React.ReactNode
  initializeState?: ({ set }: any) => void
  drawerMenu: boolean
}

const AppMock = ({ children, initializeState, drawerMenu }: Props) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  return (
    <RecoilRoot initializeState={initializeState}>
      <MuiThemeProvider theme={theme}>
        {drawerMenu ? (
          <>
            <DrawerMenu>{children}</DrawerMenu>
          </>
        ) : (
          <>{children}</>
        )}
      </MuiThemeProvider>
    </RecoilRoot>
  )
}

export default AppMock

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
