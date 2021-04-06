import { useMediaQuery, useTheme } from '@material-ui/core'
import { DataGrid, GridCellParams, GridColumns, GridRowsProp } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/styles'
import MoodIcons from 'components/atoms/mood-icons'
import NonceLabel from 'components/atoms/nonce-label.tsx'
import SymptomTag from 'components/atoms/symptom-tag'
import { getFormattedDate } from 'libs/date'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userDatasetState } from 'states/userDataset'
import { UserHealthData } from 'types/userDataset'

const HealthdataTable: React.FC = () => {
  const theme = useTheme()
  const classes = useStyles()
  const userDataset = useRecoilValue(userDatasetState)
  const [rows, setRows] = useState<GridRowsProp>([])
  const matches = useMediaQuery(theme.breakpoints.up('xl'))

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'createdAt', headerName: '日時', width: !matches ? 120 : undefined, flex: matches ? 2 : undefined },
    {
      field: 'mood',
      headerName: '体調',
      width: !matches ? 100 : undefined,
      flex: matches ? 2 : undefined,
      sortable: false,
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => <MoodIcons mood={params.value as string} size="2.5em" />,
    },
    {
      field: 'temperature',
      headerName: '体温',
      width: !matches ? 100 : undefined,
      flex: matches ? 2 : undefined,
      sortable: false,
    },
    {
      field: 'symptom',
      headerName: '症状',
      width: !matches ? 400 : undefined,
      flex: matches ? 6 : undefined,
      sortable: false,
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridCellParams) => {
        if (!params.row.symptom.length) return <></>

        return params.row.symptom.map((item: string, index: number) => (
          <div key={index.toString()} className={classes.symptom}>
            <SymptomTag>{item}</SymptomTag>
          </div>
        ))
      },
    },
  ]

  useEffect(() => {
    if (!userDataset) return

    let id = 0

    setRows(
      userDataset.health
        .map((item: UserHealthData) => {
          return {
            id: id++,
            createdAt: getFormattedDate(item.createdAt, 'yyyy-MM-dd'),
            mood: item.mood,
            temperature: item.temperature,
            symptom: item.symptom,
          }
        })
        .reverse()
    )
  }, [userDataset])

  return (
    <>
      {userDataset && userDataset.health.length ? (
        <div className={classes.root}>
          <DataGrid rows={rows} columns={columns} pageSize={matches ? 12 : 10} autoHeight />
        </div>
      ) : (
        <NonceLabel>データが不足しています</NonceLabel>
      )}
    </>
  )
}

export default HealthdataTable

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    margin: '2em auto 0',
  },
  symptom: {
    lineHeight: 1.5,
  },
}))
