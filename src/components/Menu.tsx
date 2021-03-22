import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AssignmentIcon from '@material-ui/icons/Assignment'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useResetRecoilState } from 'recoil'
import { isCheckupValidState } from 'states/isCheckupValid'
import { todaysHealthDataState } from 'states/todaysHealthData'
import { userDatasetState } from 'states/userDataset'
import styles from 'styles/components/menu.module.scss'
import { SITE_TITLE } from 'utils/env'
import { auth } from 'utils/firebase'

const Menu: FC = () => {
  const router = useRouter()
  const theme = useTheme()
  const classes = useStyles()
  const matches = useMediaQuery(theme.breakpoints.up('lg'))
  const path = router.pathname
  const resetUserDataset = useResetRecoilState(userDatasetState)
  const resetTodaysHealthData = useResetRecoilState(todaysHealthDataState)
  const resetIsCheckupValid = useResetRecoilState(isCheckupValidState)

  const handleChange = (_event: React.ChangeEvent<Record<string, unknown>>, newValue: string) => {
    router.push(`${newValue}`)
  }

  const logout = async () => {
    resetUserDataset()
    resetTodaysHealthData()
    resetIsCheckupValid()
    await auth.signOut().catch((err) => alert(err.message))
  }

  if (matches) {
    return (
      <>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: `${classes.drawerPaper} ${styles.drawerPaper}`,
          }}
        >
          <NextLink href="/">
            <a className={styles.drawerHeader}>
              <NextImage src="/img/icon/icon-48x48.png" width={48} height={48} />
              <div className={styles.title}>{SITE_TITLE}</div>
            </a>
          </NextLink>
          <div className={classes.drawerContainer}>
            <List className={classes.drawerList}>
              <NextLink href="/dashboard" passHref>
                <ListItem
                  button
                  component="a"
                  className={`${classes.drawerListItem} ${path === '/dashboard' ? styles.selected : ''}`}
                >
                  <ListItemIcon className={classes.iconWrapper}>
                    <HomeIcon className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText primary="ダッシュボード" />
                </ListItem>
              </NextLink>
              <NextLink href="/log" passHref>
                <ListItem
                  button
                  component="a"
                  className={`${classes.drawerListItem} ${path === '/log' ? styles.selected : ''}`}
                >
                  <ListItemIcon className={classes.iconWrapper}>
                    <AssignmentIcon className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText primary="体調記録" />
                </ListItem>
              </NextLink>
              <NextLink href="/temperature" passHref>
                <ListItem
                  button
                  component="a"
                  className={`${classes.drawerListItem} ${path === '/temperature' ? styles.selected : ''}`}
                >
                  <ListItemIcon className={classes.iconWrapper}>
                    <EqualizerIcon className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText primary="体温グラフ" />
                </ListItem>
              </NextLink>
              <NextLink href="/user" passHref>
                <ListItem
                  button
                  component="a"
                  className={`${classes.drawerListItem} ${path === '/user' ? styles.selected : ''}`}
                >
                  <ListItemIcon className={classes.iconWrapper}>
                    <PersonIcon className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText primary="ユーザー設定" />
                </ListItem>
              </NextLink>
            </List>
            <List className={classes.drawerList}>
              <ListItem button onClick={logout} className={classes.drawerListItem}>
                <ListItemIcon className={classes.iconWrapper}>
                  <ExitToAppIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="ログアウト" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </>
    )
  }

  if (!matches) {
    return (
      <BottomNavigation value={path} showLabels onChange={handleChange} className={classes.bottomNavRoot}>
        <BottomNavigationAction label="ホーム" value="/dashboard" icon={<HomeIcon fontSize="large" />} />
        <BottomNavigationAction label="体調記録" value="/log" icon={<AssignmentIcon fontSize="large" />} />
        <BottomNavigationAction label="体温グラフ" value="/temperature" icon={<EqualizerIcon fontSize="large" />} />
        <BottomNavigationAction label="ユーザー" value="/user" icon={<PersonIcon fontSize="large" />} />
      </BottomNavigation>
    )
  }

  return null
}

export default Menu

const useStyles = makeStyles(() =>
  createStyles({
    bottomNavRoot: {
      width: '100%',
      boxShadow: '0 0 4px rgba(0, 0, 0, .15)',
      position: 'fixed',
      bottom: 0,
    },
    drawer: {
      width: 250,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 250,
      background: "url('/img/dashboard.jpg')",
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: '32%',
      border: 'none',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.15)',
    },
    drawerContainer: {
      height: '100%',
      overflow: 'auto',
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'space-between',
    },
    drawerList: {
      width: '100%',
    },
    drawerListItem: {
      width: 'auto',
      paddingTop: 10,
      paddingBottom: 10,
      margin: 15,
      borderRadius: 8,
    },
    iconWrapper: {
      justifyContent: 'center',
    },
    icon: {
      fontSize: '2.8rem',
    },
  })
)
