import Spinner from 'components/Spinner'
import React, { FC, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userDatasetState } from 'states/userDataset'

const ConditionList: FC = () => {
  const userDataset = useRecoilValue(userDatasetState)
  const [moodList, setMoodList] = useState<JSX.Element[]>()

  useEffect(() => {
    if (!userDataset) return
    setMoodList(
      userDataset.health.slice(-7).map((item, index) => {
        return <div key={index.toString()}>{item.mood}</div>
      })
    )
  }, [userDataset])

  if (!moodList || !moodList.length) return <div>コンディションリストが存在しません</div>

  if (userDataset) {
    return (
      <>
        <h2>最近のコンディション</h2>
        <div>{moodList}</div>
      </>
    )
  }

  return <Spinner />
}

export default ConditionList
