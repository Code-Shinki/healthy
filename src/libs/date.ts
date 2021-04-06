import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export const getFormattedDate = (date: string | Date, conversion: string): string => {
  const jstDate = utcToZonedTime(new Date(date), 'Asia/Tokyo')

  return format(jstDate, conversion)
}

export const getDemoDate = () => {
  const demoDate = []
  const today = new Date()
  const start = new Date()

  start.setDate(today.getDate() - 60)

  // 二か月前から今日までの日付を配列に格納
  for (let i = start; i < today; i.setDate(i.getDate() + 1)) {
    demoDate.push(i.toString())
  }

  return demoDate
}
