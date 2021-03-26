import { makeStyles, Theme } from '@material-ui/core/styles'
import Menu from 'components/Menu'
import React, { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const DrawerMenu: FC<Props> = (props) => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.container}>{props.children}</div>
      <Menu />
    </>
  )
}

export default DrawerMenu

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: '30px 0 60px',
    overflow: 'hidden',
    [theme.breakpoints.up('lg')]: {
      padding: '40px 0 40px 250px',
    },
  },
}))
