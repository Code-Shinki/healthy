import { ApexOptions } from 'apexcharts'
import { getFormattedDate } from 'libs/date'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userDatasetState } from 'states/userDataset'
import { UserHealthData } from 'types/userDataset'
import styles from './temperature-graph.module.scss'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Props = {
  length?: number
}

const TemperatureGraph: React.FC<Props> = ({ length }) => {
  const userDataset = useRecoilValue(userDatasetState)
  const [graphOption, setGraphOption] = useState<{ options: ApexOptions[]; series: ApexAxisChartSeries }>()

  useEffect(() => {
    if (!userDataset || !userDataset.health.length) return

    const graphData = length ? userDataset.health.slice(-length) : userDataset.health
    let maxFineTmp = 35.0
    let minFineTmp = 38.0

    // ユーザーの基礎体温を計算
    userDataset.health.map((item: UserHealthData) => {
      if (item.mood === 'good') {
        item.temperature > maxFineTmp && (maxFineTmp = item.temperature)
        item.temperature < minFineTmp && (minFineTmp = item.temperature)
      }
    })

    setGraphOption({
      options: [
        // 流線グラフオプション (ミニグラフ)
        {
          chart: {
            id: 'aria',
            toolbar: {
              show: false,
              autoSelected: 'pan',
            },
            dropShadow: {
              enabled: true,
              enabledOnSeries: [0],
              top: -2,
              left: 2,
              blur: 5,
              opacity: 0.06,
            },
          },
          colors: ['#03a9f4'],
          dataLabels: {
            enabled: true,
            offsetY: -12,
            style: {
              fontWeight: 400,
            },
            background: {
              padding: 6,
              dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 3,
                opacity: 0.06,
              },
            },
          },
          fill: {
            type: 'gradient',
            gradient: {
              opacityFrom: 0.8,
              opacityTo: 0.4,
            },
          },
          markers: {
            size: 6,
            colors: ['#E5F7FE'],
            strokeColors: '#03a9f4',
            strokeWidth: 3,
            hover: {
              size: 8,
            },
          },
          stroke: {
            curve: 'smooth',
            width: 3,
          },
          tooltip: {
            style: {
              fontFamily: 'inherit',
            },
            x: {
              format: 'yyyy年MM月dd日',
            },
          },
          xaxis: {
            type: 'category',
          },
          yaxis: {
            tickAmount: 5,
            min: 35,
            max: 40,
          },
        },
        // 流線グラフオプション (フルグラフ)
        {
          annotations: {
            position: 'back',
            yaxis: [
              {
                y: minFineTmp,
                y2: maxFineTmp,
                fillColor: '#00e396',
                opacity: 0.4,
                label: {
                  text: 'あなたの基礎体温',
                  offsetX: -5,
                  offsetY: -50,
                  style: {
                    background: '#C4F7E5',
                    fontFamily: 'inherit',
                    padding: {
                      left: 7,
                      right: 7,
                      top: 5,
                      bottom: 5,
                    },
                  },
                },
              },
            ],
          },
          chart: {
            id: 'aria',
            toolbar: {
              show: false,
              autoSelected: 'pan',
            },
            dropShadow: {
              enabled: true,
              enabledOnSeries: [0],
              top: -2,
              left: 2,
              blur: 5,
              opacity: 0.06,
            },
          },
          colors: ['#03a9f4'],
          dataLabels: {
            enabled: true,
            offsetY: -12,
            style: {
              fontWeight: 400,
            },
            background: {
              padding: 6,
              dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 3,
                opacity: 0.06,
              },
            },
          },
          fill: {
            type: 'gradient',
            gradient: {
              opacityFrom: 0.8,
              opacityTo: 0.4,
            },
          },
          markers: {
            size: 6,
            colors: ['#E5F7FE'],
            strokeColors: '#03a9f4',
            strokeWidth: 3,
            hover: {
              size: 8,
            },
          },
          stroke: {
            curve: 'smooth',
            width: 3,
          },
          tooltip: {
            style: {
              fontFamily: 'inherit',
            },
            x: {
              format: 'yyyy年MM月dd日',
            },
          },
          xaxis: {
            type: 'datetime',
            labels: {
              format: 'MM月dd日',
            },
          },
          yaxis: {
            tickAmount: 5,
            min: 35,
            max: 40,
          },
        },
        // 棒グラフオプション (フルグラフ)
        {
          chart: {
            id: 'bar',
            brush: {
              target: 'aria',
              enabled: true,
            },
            selection: {
              enabled: true,
              xaxis: {
                min: new Date(userDataset.health.slice(-10, -9)[0].createdAt as string).getTime(),
                max: new Date(userDataset.health.slice(-1)[0].createdAt as string).getTime(),
              },
            },
          },
          colors: ['#00E396'],
          responsive: [
            {
              breakpoint: 1200,
              options: {
                chart: {
                  selection: {
                    enabled: true,
                    xaxis: {
                      min: new Date(userDataset.health.slice(-7, -6)[0].createdAt as string).getTime(),
                      max: new Date(userDataset.health.slice(-1)[0].createdAt as string).getTime(),
                    },
                  },
                },
              },
            },
          ],
          xaxis: {
            type: 'datetime',
            labels: {
              format: 'yyyy/MM/dd',
            },
          },
          yaxis: {
            tickAmount: 1,
            min: 35,
            max: 40,
          },
        },
      ],
      // 体温データ
      series: [
        {
          name: '体温',
          data: graphData.map(({ temperature, createdAt }) => {
            return {
              x: length ? getFormattedDate(createdAt, 'dd') + '日' : new Date(createdAt as string).getTime(),
              y: temperature,
            }
          }),
        },
      ],
    })
  }, [userDataset])

  if (!userDataset || !graphOption) return null

  return (
    <>
      {length ? (
        <section aria-label="graph-wrapper" className={styles.miniGraph}>
          <Chart type="area" options={graphOption.options[0]} series={graphOption.series} height="300px" />
        </section>
      ) : (
        <section aria-label="graph-wrapper" className={styles.fullGraph}>
          <Chart type="area" options={graphOption.options[1]} series={graphOption.series} height="70%" />
          <Chart type="bar" options={graphOption.options[2]} series={graphOption.series} height="30%" />
        </section>
      )}
    </>
  )
}

export default TemperatureGraph
