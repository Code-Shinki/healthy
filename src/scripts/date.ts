import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export const getCorrectDate = (date: null | string | Date, conversion?: string): string => {
  if (date === null) throw new Error('Argument is null.')
  if (typeof date === 'string') date = new Date(date)

  const jstDate = utcToZonedTime(date, 'Asia/Tokyo')

  if (!conversion) return jstDate.toString()

  return format(jstDate, conversion)
}

export const getDemoDate = () => {
  const today = new Date()
  const start = new Date()
  start.setDate(today.getDate() - 60)
  let demoDate: string[] = []

  for (let i = start; i < today; i.setDate(i.getDate() + 1)) {
    demoDate = [...demoDate, i.toString()]
  }

  return demoDate
}
