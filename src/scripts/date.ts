import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export const getCorrectDate = (date: string | Date | null, conversion?: string): string => {
  if (date === null) throw new Error('dateがnullです')

  const jstDate = utcToZonedTime(date, 'Asia/Tokyo')

  if (!conversion) return jstDate.toString()

  return format(jstDate, conversion)
}
