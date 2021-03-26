import MoodIcon from '@material-ui/icons/Mood'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied'
import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined'
import React from 'react'
import styles from 'styles/components/moodIcon.module.scss'

export const getMoodIcon = (mood: string, size: string) => {
  const commonStyle = {
    fontSize: size,
  }

  if (mood === 'good') return <MoodIcon className={styles.ball} style={{ ...commonStyle, color: 'var(--c-green)' }} />
  if (mood === 'fine')
    return (
      <SentimentDissatisfiedIcon className={styles.pendulum} style={{ ...commonStyle, color: 'var(--c-orange)' }} />
    )
  if (mood === 'bad')
    return (
      <SentimentVeryDissatisfiedOutlinedIcon
        className={styles.engine}
        style={{ ...commonStyle, color: 'var(--c-purple)' }}
      />
    )

  throw new Error('Invalid arg.')
}
