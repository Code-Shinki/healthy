import React from 'react'
import { animated, useSpring } from 'react-spring'
import styles from './spring-fade.module.scss'

type Props = {
  children?: React.ReactElement
  in: boolean
  onEnter?: () => void
  onExited?: () => void
}

const SpringFade = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { in: open, children, onEnter, onExited, ...other } = props

  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter()
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited()
      }
    },
  })

  return (
    <animated.div ref={ref} style={style as Record<string, unknown>} {...other} className={styles.fader}>
      {children}
    </animated.div>
  )
})

export default SpringFade
