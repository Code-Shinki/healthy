import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { SITE_TITLE } from 'utils/env'
import styles from './pc-menu.module.scss'

type Props = {
  toggleIsModalOpen: () => void
}

const PcMenu: React.FC<Props> = ({ toggleIsModalOpen }) => {
  const router = useRouter()
  const path = router.pathname

  return (
    <Drawer
      className={styles.root}
      variant="permanent"
      classes={{
        paper: styles.paper,
      }}
    >
      <NextLink href="/">
        <a className={styles.header}>
          <NextImage src="/img/icon/icon-48x48.png" width={48} height={48} />
          <div className={styles.title}>{SITE_TITLE}</div>
        </a>
      </NextLink>
      <div className={styles.container}>
        <List className={styles.list}>
          <NextLink href="/dashboard" passHref>
            <ListItem
              button
              component="a"
              className={`${styles.listitem} ${path === '/dashboard' ? styles.isActive : ''}`}
            >
              <ListItemIcon className={styles.iconwrapper}>
                <HomeIcon className={styles.icon} />
              </ListItemIcon>
              <ListItemText primary="ダッシュボード" />
            </ListItem>
          </NextLink>
          <NextLink href="/healthdata" passHref>
            <ListItem button component="a" className={`${styles.listitem} ${path === '/log' ? styles.isActive : ''}`}>
              <ListItemIcon className={styles.iconwrapper}>
                <AssignmentIcon className={styles.icon} />
              </ListItemIcon>
              <ListItemText primary="ヘルスデータ" />
            </ListItem>
          </NextLink>
          <NextLink href="/temperature" passHref>
            <ListItem
              button
              component="a"
              className={`${styles.listitem} ${path === '/temperature' ? styles.isActive : ''}`}
            >
              <ListItemIcon className={styles.iconwrapper}>
                <EqualizerIcon className={styles.icon} />
              </ListItemIcon>
              <ListItemText primary="体温グラフ" />
            </ListItem>
          </NextLink>
          <NextLink href="/user" passHref>
            <ListItem button component="a" className={`${styles.listitem} ${path === '/user' ? styles.isActive : ''}`}>
              <ListItemIcon className={styles.iconwrapper}>
                <PersonIcon className={styles.icon} />
              </ListItemIcon>
              <ListItemText primary="ユーザー設定" />
            </ListItem>
          </NextLink>
        </List>
        <List className={styles.list}>
          <ListItem button onClick={toggleIsModalOpen} className={styles.listitem}>
            <ListItemIcon className={styles.iconwrapper}>
              <ExitToAppIcon className={styles.icon} />
            </ListItemIcon>
            <ListItemText primary="ログアウト" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  )
}

export default PcMenu
