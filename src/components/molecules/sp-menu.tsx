import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import { useRouter } from 'next/router'
import React from 'react'
import styles from './sp-menu.module.scss'

type Props = {
  toggleIsModalOpen: () => void
}

const SpMenu: React.FC<Props> = ({ toggleIsModalOpen }) => {
  const router = useRouter()
  const path = router.pathname

  const handleChange = (_event: React.ChangeEvent<Record<string, unknown>>, newValue: string) => {
    if (newValue === 'logout') {
      toggleIsModalOpen()
    } else {
      router.push(newValue)
    }
  }

  return (
    <BottomNavigation value={path} showLabels onChange={handleChange} className={styles.root}>
      <BottomNavigationAction
        label="ホーム"
        value="/dashboard"
        icon={<HomeIcon fontSize="large" />}
        className={styles.item}
      />
      <BottomNavigationAction
        label="体調記録"
        value="/healthdata"
        icon={<AssignmentIcon fontSize="large" />}
        className={styles.item}
      />
      <BottomNavigationAction
        label="体温グラフ"
        value="/temperature"
        icon={<EqualizerIcon fontSize="large" />}
        className={styles.item}
      />
      <BottomNavigationAction
        label="ユーザー"
        value="/user"
        icon={<PersonIcon fontSize="large" />}
        className={styles.item}
      />
      <BottomNavigationAction
        label="ログアウト"
        value="logout"
        icon={<ExitToAppIcon fontSize="large" />}
        className={styles.item}
      />
    </BottomNavigation>
  )
}

export default SpMenu
