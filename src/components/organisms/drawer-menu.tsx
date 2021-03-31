import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import LogoutDialog from 'components/molecules/logout-dialog'
import PcMenu from 'components/molecules/pc-menu'
import SpMenu from 'components/molecules/sp-menu'
import React, { useCallback, useState } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { deleteUserDataset } from 'requests/userDataset'
import { currentUserState } from 'states/currentUser'
import { isCheckupValidState } from 'states/isCheckupValid'
import { todaysHealthDataState } from 'states/todaysHealthData'
import { userDatasetState } from 'states/userDataset'

type Props = {
  children: React.ReactNode
}

const DrawerMenu: React.FC<Props> = ({ children }) => {
  const theme = useTheme()
  const classes = useStyles()
  const userDataset = useRecoilValue(userDatasetState)
  const currentUser = useRecoilValue(currentUserState)
  const resetUserDataset = useResetRecoilState(userDatasetState)
  const resetTodaysHealthData = useResetRecoilState(todaysHealthDataState)
  const resetIsCheckupValid = useResetRecoilState(isCheckupValidState)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const matches = useMediaQuery(theme.breakpoints.up('lg'))

  const logout = useCallback(async () => {
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
  }, [currentUser])

  const toggleIsModalOpen = useCallback(() => {
    setIsModalOpen(!isModalOpen)
  }, [isModalOpen])

  return (
    <>
      <div className={classes.container}>{children}</div>
      {currentUser && userDataset && (
        <>
          {matches ? (
            <PcMenu toggleIsModalOpen={toggleIsModalOpen} />
          ) : (
            <SpMenu toggleIsModalOpen={toggleIsModalOpen} />
          )}
          <LogoutDialog isModalOpen={isModalOpen} toggleIsModalOpen={toggleIsModalOpen} logout={logout} />
        </>
      )}
    </>
  )
}

export default DrawerMenu

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: '30px 0 60px',
    overflow: 'hidden',
    [theme.breakpoints.up('lg')]: {
      padding: '40px 0 40px 280px',
    },
  },
}))
