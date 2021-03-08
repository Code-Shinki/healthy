import { atom } from 'recoil'
import { userDataset } from 'scripts/dataset'

export const userDataState = atom({
  key: 'userDataState',
  default: userDataset,
})

export const todaysHealthState = atom({
  key: 'todaysHealthState',
  default: {
    mood: '',
    temperature: 0,
    symptom: [] as string[],
  },
})

export const isValidState = atom({
  key: 'isValidState',
  default: false,
})
