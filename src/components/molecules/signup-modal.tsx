import { Backdrop, Button, Grid, Modal } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import WarningIcon from '@material-ui/icons/Warning'
import SpringFade from 'components/atoms/spring-fade'
import React, { useState } from 'react'
import styles from './signup-modal.module.scss'

const SignupModal: React.FC = () => {
  const [open, setOpen] = useState(true)

  const modalClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Modal
        className={styles.modal}
        open={open}
        onClose={modalClose}
        disableBackdropClick
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        aria-labelledby="signup-modal-title"
        aria-describedby="signup-modal-description"
      >
        <SpringFade in={open}>
          <div className={styles.paper}>
            <h2 id="signup-modal-title" className={styles.title}>
              <WarningIcon />
              このアプリについて
            </h2>
            <div className={styles.container}>
              <p id="signup-modal-description" className={styles.p}>
                このアプリはポートフォリオ用に開発したものです。以下の点にご留意ください。
              </p>
              <h3 className={styles.heading}>&#x2756; 継続利用不可 &#x2756;</h3>
              <p className={styles.p}>
                現在このアプリは本番運用を行っていません。そのため、セキュリティと個人情報保護の観点からログアウト時にアカウント情報を含む全データを削除しています。
              </p>
              <h3 className={styles.heading}>&#x2756; 匿名カンタン登録について &#x2756;</h3>
              <p className={styles.p}>
                「匿名カンタン登録」では個人情報を入力することなくアプリを利用できます。2か月分のダミーデータを含むアカウントが作成されるため、アプリの動作確認等に便利です。
              </p>
              <h3 className={styles.heading}>&#x2756; メールアドレスでの登録について &#x2756;</h3>
              <p className={styles.p}>
                本アプリではメールアドレスとパスワードを用いてのユーザー登録も可能ですが、ログアウト時に全データが削除されます。
              </p>
              <Grid container justify="center" className={styles.button}>
                <Button
                  variant="outlined"
                  size="large"
                  color="primary"
                  startIcon={<CheckCircleIcon />}
                  onClick={modalClose}
                >
                  確認しました
                </Button>
              </Grid>
            </div>
          </div>
        </SpringFade>
      </Modal>
    </>
  )
}

export default SignupModal
