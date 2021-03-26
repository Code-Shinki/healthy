import { makeStyles } from '@material-ui/core/styles'
import React, { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  class: string
}

const ContentsWrapper: FC<Props> = (props) => {
  const classes = useStyles()

  return (
    <>
      <div className={`${classes.container} ${props.class}`}>{props.children}</div>
    </>
  )
}

export default ContentsWrapper

const useStyles = makeStyles(() => ({
  container: {
    margin: '2em auto 0',
    background: '#fff',
    borderRadius: 5,
    boxShadow: '0 1px 4px rgba(0, 0, 0, .15)',
    position: 'relative',
    '& h1, & h2': {
      width: '90%',
      padding: '.4em .2em',
      margin: 0,
      color: '#fff',
      fontSize: '1.8em',
      fontWeight: 'normal',
      textAlign: 'center',
      background: 'var(--c-primary)',
      borderRadius: 5,
      boxShadow: '0 4px 20px 0 rgba(0, 0, 0, .15), 0 7px 10px -5px rgba(0, 0, 0, .15)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translate(-50%, -50%)',
      '& svg': {
        marginRight: '.3em',
      },
    },
  },
}))
