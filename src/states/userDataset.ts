import { atom } from 'recoil'
import { UserDataset } from 'types/userDataset'

export const userDatasetState = atom<undefined | UserDataset>({
  key: 'UserDataset',
  default: undefined,
})
