import { atom } from 'recoil'

export const isCheckupValidState = atom<boolean>({
  key: 'IsCheckupValid',
  default: false,
})
