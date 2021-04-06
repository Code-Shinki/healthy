import Spinner from 'components/atoms/spinner'
import React from 'react'
import styles from './spinner-modal.module.scss'

const SpinnerModal: React.FC = () => {
  return (
    <div className={styles.modal}>
      <Spinner />
    </div>
  )
}

export default SpinnerModal
