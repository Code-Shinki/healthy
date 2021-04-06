import MoodIcon from '@material-ui/icons/Mood'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied'
import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined'
import React from 'react'
import styles from './mood-icons.module.scss'

type Props = {
  mood: string
  size: string
}

const MoodIcons: React.FC<Props> = ({ mood, size }) => {
  switch (mood) {
    case 'good':
      return <MoodIcon className={styles.good} style={{ fontSize: size }} />
    case 'fine':
      return <SentimentDissatisfiedIcon className={styles.fine} style={{ fontSize: size }} />
    case 'bad':
      return <SentimentVeryDissatisfiedOutlinedIcon className={styles.bad} style={{ fontSize: size }} />
    default:
      return null
  }
}

export default MoodIcons
