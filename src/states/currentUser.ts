import firebase from 'firebase/app'
import { atom } from 'recoil'

export const currentUserState = atom<undefined | null | firebase.User>({
  key: 'CurrentUser',
  default: undefined,
  dangerouslyAllowMutability: true,
})
