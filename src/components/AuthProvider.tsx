import React, { FC, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { loginUserState } from 'scripts/store'
import { auth } from 'utils/firebase'

const AuthProvider: FC = ({ children }) => {
  const setLoginUser = useSetRecoilState(loginUserState)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoginUser(user)
    })
  }, [])

  return <>{children}</>
}

export { AuthProvider }
