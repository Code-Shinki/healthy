import Menu from 'components/Menu'
import React, { FC, ReactNode } from 'react'
import styles from 'styles/layouts/body.module.scss'

type Props = {
  children: ReactNode
}

const LoginLayout: FC<Props> = (props) => {
  return (
    <>
      <div className={styles.container}>{props.children}</div>
      <Menu />
    </>
  )
}

export default LoginLayout
