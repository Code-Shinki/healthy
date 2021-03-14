import { ApexOptions } from 'apexcharts'
import Spinner from 'components/Spinner'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userDatasetState } from 'states/userDataset'
import { UserHealthData } from 'types/userDataset'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Props = {
  type: 'mini' | 'full'
  range?: number
}

const TemperatureGraph: FC<Props> = (props) => {
  const userDataset = useRecoilValue(userDatasetState)
  const [graphOption, setGraphOption] = useState<{ options: ApexOptions[]; series: ApexAxisChartSeries }>()

  useEffect(() => {
    if (!userDataset) return

    if (userDataset.health.length !== 0) {
      const periodData = userDataset.health.slice(props.range)
      let maxFineTmp = 35.0
      let minFineTmp = 38.0

      userDataset.health.map((item: UserHealthData) => {
        if (item.mood === 'good') {
          item.temperature > maxFineTmp && (maxFineTmp = item.temperature)
          item.temperature < minFineTmp && (minFineTmp = item.temperature)
        }
      })

      setGraphOption({
        options: [
          // 流線グラフオプション
          {
            // annotations: {
            //   yaxis: [
            //     {
            //       y: minFineTmp,
            //       y2: maxFineTmp,
            //       borderColor: '#000',
            //       fillColor: '#FEB019',
            //       label: {
            //         text: 'あなたの通常体温',
            //       },
            //     },
            //   ],
            // },
            chart: {
              id: 'aria',
              // height: 380,
              // foreColor: '#999',
              // toolbar: {
              //   autoSelected: 'pan',
              //   show: false,
              // },
              // dropShadow: {
              //   enabled: true,
              //   enabledOnSeries: [0],
              //   top: -2,
              //   left: 2,
              //   blur: 5,
              //   opacity: 0.06,
              // },
            },
            // colors: ['#0090FF'],
            // dataLabels: {
            //   enabled: false,
            // },
            // fill: {
            //   type: 'solid',
            //   opacity: 0.7,
            // },
            // grid: {
            //   padding: {
            //     left: -5,
            //     right: 5,
            //   },
            // },
            // markers: {
            //   size: 0,
            //   strokeColors: '#fff',
            //   strokeWidth: 3,
            //   strokeOpacity: 1,
            //   fillOpacity: 1,
            //   hover: {
            //     size: 6,
            //   },
            // },
            // stroke: {
            //   curve: 'smooth',
            //   width: 3,
            // },
            // tooltip: {
            //   x: {
            //     format: 'yyyy年MM月dd日',
            //   },
            // },
            // xaxis: {
            //   type: 'datetime',
            //   axisBorder: {
            //     show: true,
            //   },
            // },
            // yaxis: {
            //   tickAmount: 4,
            //   labels: {
            //     offsetX: 24,
            //     offsetY: -5,
            //   },
            // },
          },
          // 棒グラフオプション
          {
            chart: {
              id: 'bar',
              // height: 130,
              // foreColor: '#ccc',
              // brush: {
              //   target: 'aria',
              //   enabled: true,
              // },
              // selection: {
              //   enabled: true,
              //   fill: {
              //     color: '#fff',
              //     opacity: 0.4,
              //   },
              //   xaxis: {
              //     min: new Date('27 Jul 2017 10:00:00').getTime(),
              //     max: new Date('14 Aug 2017 10:00:00').getTime(),
              //   },
              // },
            },
            // colors: ['#FF0080'],
            // stroke: {
            //   width: 2,
            // },
            // grid: {
            //   borderColor: '#444',
            // },
            // markers: {
            //   size: 0,
            // },
            // xaxis: {
            //   type: 'datetime',
            //   tooltip: {
            //     enabled: false,
            //   },
            // },
            // yaxis: {
            //   tickAmount: 2,
            // },
          },
        ],
        // 体温データ
        series: [
          {
            name: '体温',
            data: periodData.map(({ temperature, createdAt }) => {
              return { x: new Date(createdAt as string).getTime(), y: temperature }
            }),
          },
        ],
      })
    }
  }, [userDataset])

  if (graphOption) {
    if (userDataset?.health.length === 0) return <div>体温データが存在しません</div>

    return (
      <>
        <div>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
          <Chart type="area" options={graphOption.options[0]} series={graphOption.series} />
          {props.type === 'full' && <Chart type="bar" options={graphOption.options[1]} series={graphOption.series} />}
        </div>
      </>
    )
  }

  return <Spinner />
}

export default TemperatureGraph
