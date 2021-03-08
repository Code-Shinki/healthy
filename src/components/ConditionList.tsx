import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { userDataState } from 'scripts/store'

const ConditionList: FC = () => {
  const userData = useRecoilValue(userDataState)

  return (
    <>
      <div>
        {userData.health.mood
          .slice(-7)
          .reverse()
          .map((item, index) => {
            return <div key={index}>{item}</div>
          })}
      </div>
    </>
  )
}

export default ConditionList
