import { Backdrop, Button, Grid, Modal } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import WarningIcon from '@material-ui/icons/Warning'
import { createStyles, makeStyles } from '@material-ui/styles'
import React, { FC } from 'react'
import { animated, useSpring } from 'react-spring'
import styles from 'styles/components/signupModal.module.scss'

const SignupModal: FC = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        disableBackdropClick
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        aria-labelledby="signup-modal-title"
        aria-describedby="signup-modal-description"
      >
        <Fade in={open}>
          <div className={styles.paper}>
            <h2 id="signup-modal-title" className={styles.h2}>
              <WarningIcon className={classes.errorIcon} />
              注意事項
            </h2>
            <div className={styles.container}>
              <p id="signup-modal-description" className={styles.p}>
                このアプリはポートフォリオ用に開発したものです。以下の点にご留意ください。
              </p>
              <h3 className={styles.h3}>【 継続利用不可 】</h3>
              <p className={styles.p}>
                現在このアプリは本番運用を行っていません。そのため、セキュリティと個人情報保護の観点からログアウト時にアカウント情報を含む全データを削除しています。
              </p>
              <h3 className={styles.h3}>【 匿名カンタン登録について 】</h3>
              <p className={styles.p}>
                「匿名カンタン登録」では個人情報を入力することなくアプリを利用できます。2か月分のダミーデータを含むアカウントが作成されるため、アプリの動作確認等に便利です。
              </p>
              <h3 className={styles.h3}>【 メールアドレスでの登録について 】</h3>
              <p className={styles.p}>
                本アプリではメールアドレスとパスワードを用いてのユーザー登録も可能ですが、ログアウト時に全データが削除されます。
              </p>
              <Grid className={classes.buttonWrapper} container justify="center">
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => setOpen(false)}
                >
                  確認しました
                </Button>
              </Grid>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

export default SignupModal

type FadeProps = {
  children?: React.ReactElement
  in: boolean
  onEnter?: () => void
  onExited?: () => void
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>((props, ref) => {
  const { in: open, children, onEnter, onExited, ...other } = props
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter()
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited()
      }
    },
  })

  return (
    <animated.div ref={ref} style={style as Record<string, unknown>} {...other} className={styles.fader}>
      {children}
    </animated.div>
  )
})

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorIcon: {
      marginRight: '.2em',
      fontSize: '1.3em',
    },
    buttonWrapper: {
      margin: '2em 0 .5em',
    },
  })
)
