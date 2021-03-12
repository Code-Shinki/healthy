export type UserDataset = {
  name: null | string
  sex: null | 'male' | 'female'
  height: null | number
  weight: null | number
  doctor: null | string
  createdAt: null | string
  health: [] | UserHealthData[]
}

export type UserHealthData = {
  mood: string
  temperature: number
  symptom: [] | string[]
  createdAt: null | string
}

export type TodaysHealthData = {
  mood: null | string
  temperature: null | number
  symptom: [] | string[]
  createdAt: null | string
}
