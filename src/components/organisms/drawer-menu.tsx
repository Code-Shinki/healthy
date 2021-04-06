import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import CustomizedSnackbar from 'components/atoms/custom-snackbar'
import LogoutDialog from 'components/molecules/logout-dialog'
import PcMenu from 'components/molecules/pc-menu'
import SpMenu from 'components/molecules/sp-menu'
import { useRouter } from 'next/router'
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
  const router = useRouter()
  const theme = useTheme()
  const classes = useStyles()
  const userDataset = useRecoilValue(userDatasetState)
  const currentUser = useRecoilValue(currentUserState)
  const resetUserDataset = useResetRecoilState(userDatasetState)
  const resetTodaysHealthData = useResetRecoilState(todaysHealthDataState)
  const resetIsCheckupValid = useResetRecoilState(isCheckupValidState)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const matches = useMediaQuery(theme.breakpoints.up('lg'))

  const logout = useCallback(async () => {
    if (!currentUser) return
    // 共通ステートをリセット
    resetUserDataset()
    resetTodaysHealthData()
    resetIsCheckupValid()
    // ユーザーデータを削除
    await deleteUserDataset(currentUser.uid).catch(() => router.push('/404'))
    // アカウントを削除
    await currentUser
      .delete()
      .then(() => setIsAlertOpen(true))
      .catch(() => router.push('/404'))
    // ログアウト
    // await auth.signOut().catch((err) => alert(err.message))
  }, [currentUser])

  const toggleIsModalOpen = useCallback(() => {
    setIsModalOpen(!isModalOpen)
  }, [isModalOpen])

  const alertClose = (open: boolean) => {
    setIsAlertOpen(open)
  }

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
      <CustomizedSnackbar type="success" open={isAlertOpen} setClose={alertClose}>
        ユーザーデータの削除が完了しました！
      </CustomizedSnackbar>
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
