import { Grid } from '@material-ui/core'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import React, { FC } from 'react'

type Props = {
  word: string
  style?: React.CSSProperties
}

const InsufficientData: FC<Props> = (props) => {
  return (
    <>
      <Grid container wrap="wrap" justify="center" alignItems="center" style={props.style}>
        <NotInterestedIcon style={{ fontSize: '5em', color: '#eee' }} />
        <div style={{ width: '100%', color: '#ddd', textAlign: 'center' }}>{props.word}</div>
      </Grid>
    </>
  )
}

export default InsufficientData
