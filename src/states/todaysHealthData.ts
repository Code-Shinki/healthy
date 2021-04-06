import { atom } from 'recoil'
import { TodaysHealthData } from 'types/userDataset'

export const todaysHealthDataState = atom<TodaysHealthData>({
  key: 'TodaysHealthData',
  default: {
    mood: null,
    temperature: null,
    symptom: [],
    createdAt: null,
  },
})
