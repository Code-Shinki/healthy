import { ApexOptions } from 'apexcharts'
import Spinner from 'components/Spinner'
import dynamic from 'next/dynamic'
import React, { FC, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { getCorrectDate } from 'scripts/date'
import { userDatasetState } from 'states/userDataset'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const TemperatureGraph: FC = () => {
  const userDataset = useRecoilValue(userDatasetState)
  const [graphOption, setGraphOption] = useState<{ options: ApexOptions; series: ApexAxisChartSeries }>()

  useEffect(() => {
    if (!userDataset) return

    const periodData = userDataset.health.slice(-7)

    setGraphOption({
      options: {
        chart: { id: 'temperature-graph' },
        xaxis: {
          categories: periodData.map(({ createdAt }) => {
            return getCorrectDate(createdAt, 'MM/dd')
          }),
        },
      },
      series: [
        {
          name: 'temperature',
          data: periodData.map(({ temperature }) => {
            return temperature
          }),
        },
      ],
    })
  }, [userDataset])

  if (userDataset?.health.length === 0) return <div>体温データが存在しません</div>

  if (graphOption) {
    return (
      <>
        <div>
          <Chart type="line" options={graphOption?.options} series={graphOption?.series} />
        </div>
      </>
    )
  }

  return <Spinner />
}

export default TemperatureGraph
