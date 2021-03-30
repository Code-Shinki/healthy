import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { FC } from 'react'

type Props = {
  isModalOpen: boolean
  toggleIsModalOpen: () => void
  logout: () => void
}

const LogoutDialog: FC<Props> = (props) => {
  const classes = useStyles()

  return (
    <>
      <Dialog
        open={props.isModalOpen}
        onClose={props.toggleIsModalOpen}
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
          <Button onClick={props.toggleIsModalOpen} color="primary">
            いいえ
          </Button>
          <Button
            onClick={() => {
              props.toggleIsModalOpen()
              props.logout()
            }}
            color="primary"
          >
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LogoutDialog

const useStyles = makeStyles(() => ({
  title: {
    color: 'var(--c-primary)',
    fontSize: '1.3em',
  },
}))
