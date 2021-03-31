import React from 'react'
import styles from './user-label.module.scss'

type Props = {
  children: React.ReactNode
}

const UserLabel: React.FC<Props> = ({ children }) => {
  return <h3 className={styles.label}>{children}</h3>
}

export default UserLabel
