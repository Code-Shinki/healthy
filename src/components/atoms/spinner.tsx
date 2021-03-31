import React from 'react'
import styles from './spinner.module.scss'

const Spinner: React.FC = () => {
  return (
    <>
      <div className={styles.root}>
        <div className={styles['dot-bricks']}></div>
        <div className={styles.notice}>読み込んでいます</div>
      </div>
    </>
  )
}

export default Spinner
