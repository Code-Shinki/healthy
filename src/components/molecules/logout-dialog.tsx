import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

type Props = {
  isModalOpen: boolean
  toggleIsModalOpen: () => void
  logout: () => void
}

const LogoutDialog: React.FC<Props> = React.memo(({ isModalOpen, toggleIsModalOpen, logout }) => {
  const classes = useStyles()

  const onClick = () => {
    toggleIsModalOpen()
    logout()
  }

  return (
    <>
      <Dialog
        open={isModalOpen}
        onClose={toggleIsModalOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle disableTypography={true} id="alert-dialog-title" className={classes.title}>
          ログアウトしますか？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ログアウトするとアカウントとヘルスデータが削除されます。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleIsModalOpen} color="primary">
            いいえ
          </Button>
          <Button onClick={onClick} color="primary">
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
})

LogoutDialog.displayName = 'LogoutDialog'
export default LogoutDialog

const useStyles = makeStyles(() => ({
  title: {
    color: 'var(--c-primary)',
    fontSize: '1.3em',
    fontWeight: 'bold',
  },
}))
