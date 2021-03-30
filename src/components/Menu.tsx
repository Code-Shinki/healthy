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
import LogoutDialog from 'components/LogoutDialog'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { deleteUserDataset } from 'requests/userDataset'
import { currentUserState } from 'states/currentUser'
import { isCheckupValidState } from 'states/isCheckupValid'
import { todaysHealthDataState } from 'states/todaysHealthData'
import { userDatasetState } from 'states/userDataset'
import styles from 'styles/components/menu.module.scss'
import { SITE_TITLE } from 'utils/env'
// import { auth } from 'utils/firebase'

const Menu: FC = () => {
  const router = useRouter()
  const theme = useTheme()
  const classes = useStyles()
  const matches = useMediaQuery(theme.breakpoints.up('lg'))
  const path = router.pathname
  const currentUser = useRecoilValue(currentUserState)
  const resetUserDataset = useResetRecoilState(userDatasetState)
  const resetTodaysHealthData = useResetRecoilState(todaysHealthDataState)
  const resetIsCheckupValid = useResetRecoilState(isCheckupValidState)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChange = (_event: React.ChangeEvent<Record<string, unknown>>, newValue: string) => {
    if (newValue === 'logout') {
      toggleIsModalOpen()
    } else {
      router.push(`${newValue}`)
    }
  }

  const logout = async () => {
    if (!currentUser) return
    // 共通ステートをリセット
    resetUserDataset()
    resetTodaysHealthData()
    resetIsCheckupValid()
    // ユーザーデータを削除
    await deleteUserDataset(currentUser.uid)
    // アカウントを削除
    await currentUser.delete().catch((err) => alert(err.message))
    // await auth.signOut().catch((err) => alert(err.message))
  }

  const toggleIsModalOpen = () => {
    setIsModalOpen(!isModalOpen)
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
              <ListItem button onClick={toggleIsModalOpen} className={classes.drawerListItem}>
                <ListItemIcon className={classes.iconWrapper}>
                  <ExitToAppIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="ログアウト" />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <LogoutDialog isModalOpen={isModalOpen} toggleIsModalOpen={toggleIsModalOpen} logout={logout} />
      </>
    )
  }

  if (!matches) {
    return (
      <>
        <BottomNavigation value={path} showLabels onChange={handleChange} className={classes.bottomNavRoot}>
          <BottomNavigationAction
            label="ホーム"
            value="/dashboard"
            icon={<HomeIcon fontSize="large" />}
            className={classes.bottomNavItem}
          />
          <BottomNavigationAction
            label="体調記録"
            value="/log"
            icon={<AssignmentIcon fontSize="large" />}
            className={classes.bottomNavItem}
          />
          <BottomNavigationAction
            label="体温グラフ"
            value="/temperature"
            icon={<EqualizerIcon fontSize="large" />}
            className={classes.bottomNavItem}
          />
          <BottomNavigationAction
            label="ユーザー"
            value="/user"
            icon={<PersonIcon fontSize="large" />}
            className={classes.bottomNavItem}
          />
          <BottomNavigationAction
            label="ログアウト"
            value="logout"
            icon={<ExitToAppIcon fontSize="large" />}
            className={classes.bottomNavItem}
          />
        </BottomNavigation>
        <LogoutDialog isModalOpen={isModalOpen} toggleIsModalOpen={toggleIsModalOpen} logout={logout} />
      </>
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
    bottomNavItem: {
      minWidth: 'auto',
    },
    drawer: {
      width: 280,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 280,
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
      minWidth: '70px',
      justifyContent: 'center',
    },
    icon: {
      fontSize: '2.8rem',
    },
  })
)
