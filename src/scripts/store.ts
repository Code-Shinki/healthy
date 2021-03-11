import firebase from 'firebase/app'
import { atom } from 'recoil'
import { userDatasetType } from 'scripts/dataset'

export const loginUserState = atom({
  key: 'loginUserState',
  default: undefined as firebase.User | null | undefined,
  dangerouslyAllowMutability: true,
})

export const userDataState = atom({
  key: 'userDataState',
  default: {} as userDatasetType,
})

export const todaysHealthState = atom({
  key: 'todaysHealthState',
  default: {
    mood: '',
    temperature: 0,
    symptom: [] as string[],
    createdAt: (null as unknown) as string,
  },
})

export const isCheckupValidState = atom({
  key: 'isCheckupValidState',
  default: false,
})
