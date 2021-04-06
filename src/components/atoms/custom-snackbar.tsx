import { Snackbar } from '@material-ui/core'
import Alert, { AlertProps } from '@material-ui/lab/Alert'
import React from 'react'

type Props = {
  type: AlertProps['color']
  open: boolean
  setClose: (open: boolean) => void
  children: React.ReactNode
}

const CustomizedSnackbar: React.FC<Props> = ({ type, open, setClose, children }) => {
  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return
    setClose(false)
  }

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert variant="filled" onClose={handleClose} severity={type}>
        {children}
      </Alert>
    </Snackbar>
  )
}

export default CustomizedSnackbar
