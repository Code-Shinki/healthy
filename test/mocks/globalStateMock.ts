import userDemoDataset from '../../src/datasets/userDemoDataset.json'
import userInitDataset from '../../src/datasets/userInitDataset.json'
import { currentUserState } from '../../src/states/currentUser'
import { userDatasetState } from '../../src/states/userDataset'
import { User } from './firebaseMock'

export const nowLoading = ({ set }: any) => {
  set(currentUserState, undefined)
}

export const unregistered = ({ set }: any) => {
  set(currentUserState, null)
}

export const loggedInInit = ({ set }: any) => {
  set(currentUserState, User)
  set(userDatasetState, userInitDataset)
}

export const loggedInDemo = ({ set }: any) => {
  set(currentUserState, User)
  set(userDatasetState, userDemoDataset)
}
