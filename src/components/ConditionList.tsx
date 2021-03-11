import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { userDataState } from 'scripts/store'

const ConditionList: FC = () => {
  const userData = useRecoilValue(userDataState)

  return (
    <>
      <div>
        {userData.health.slice(-7).map((item, index) => {
          return <div key={index}>{item.mood}</div>
        })}
      </div>
    </>
  )
}

export default ConditionList
