import React from 'react'
import styles from './symptom-tag.module.scss'

type Props = {
  children: React.ReactNode
}

const SymptomTag: React.FC<Props> = ({ children }) => {
  return <div className={styles.tag}>{children}</div>
}

export default SymptomTag
