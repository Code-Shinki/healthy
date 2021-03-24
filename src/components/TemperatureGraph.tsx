import { makeStyles, Theme } from '@material-ui/core/styles'
import WarningIcon from '@material-ui/icons/Warning'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
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
  const classes = useStyles()
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
          // 棒グラフオプション
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
            data: periodData.map(({ temperature, createdAt }) => {
              return { x: new Date(createdAt as string).getTime(), y: temperature }
            }),
          },
        ],
      })
    }
  }, [userDataset])

  if (graphOption) {
    if (userDataset?.health.length === 0) {
      return (
        <>
          <div className={classes.noGraph}>
            <WarningIcon style={{ fontSize: '1.5em' }} />
            体温データが存在しません
          </div>
        </>
      )
    }

    if (props.type === 'mini') {
      return (
        <>
          <div className={classes.miniGraph}>
            <Chart type="area" options={graphOption.options[0]} series={graphOption.series} height="300px" />
          </div>
        </>
      )
    }

    if (props.type === 'full') {
      return (
        <>
          <div className={classes.fullGraph}>
            <Chart type="area" options={graphOption.options[0]} series={graphOption.series} height="70%" />
            <Chart type="bar" options={graphOption.options[1]} series={graphOption.series} height="30%" />
          </div>
        </>
      )
    }
  }

  return null
}

export default TemperatureGraph

const useStyles = makeStyles((theme: Theme) => ({
  miniGraph: {
    padding: '2em 0 0',
    [theme.breakpoints.up('lg')]: {
      padding: '60px 40px 40px',
    },
  },
  fullGraph: {
    height: '80vh',
    padding: '2em 0 0',
    [theme.breakpoints.up('lg')]: {
      height: '88vh',
      padding: '60px 40px 40px',
    },
  },
  noGraph: {
    color: 'var(--c-primary)',
    fontSize: '1.3em',
    padding: '5em 1em 3em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.5em',
    },
    '& svg': {
      marginRight: '.3em',
    },
  },
}))
