import React, { FC, useState } from 'react'
import Chart from 'react-apexcharts'
import { useRecoilValue } from 'recoil'
import { getCorrectDate } from 'scripts/date'
import { userDataState } from 'scripts/store'

const TemperatureGraph: FC = () => {
  const userData = useRecoilValue(userDataState)
  const periodData = userData.health.slice(-7)

  const graphData = {
    categories: periodData.map(({ createdAt }) => {
      return getCorrectDate(createdAt, 'MM/dd')
    }),
    data: periodData.map(({ temperature }) => {
      return temperature
    }),
  }

  const [graphOption] = useState({
    options: {
      chart: {
        id: 'temperature-graph',
      },
      xaxis: {
        categories: graphData.categories,
      },
    },
    series: [
      {
        data: graphData.data,
      },
    ],
  })

  return (
    <>
      <div>
        <Chart type="line" options={graphOption.options} series={graphOption.series} />
      </div>
    </>
  )
}

export default TemperatureGraph
