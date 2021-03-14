import { UserDataset } from 'types/userDataset'
import { db } from 'utils/firebase'

type Option = {
  cache: boolean
}

export const getUserDataset = async (uid: string, option: Option) => {
  try {
    if (option.cache) {
      return await db
        .collection('users')
        .doc(uid)
        .get({ source: 'cache' })
        .then((doc) => {
          return doc.data() as UserDataset
        })
        .catch(async () => {
          return await db
            .collection('users')
            .doc(uid)
            .get({ source: 'server' })
            .then((doc) => {
              return doc.data() as UserDataset
            })
        })
    } else {
      return await db
        .collection('users')
        .doc(uid)
        .get({ source: 'server' })
        .then((doc) => {
          return doc.data() as UserDataset
        })
    }
  } catch (err) {
    alert(err.message)
    return undefined
  }
}

export const postUserDataset = async (uid: string, data: UserDataset) => {
  try {
    await db.collection('users').doc(uid).set(data)
  } catch (err) {
    alert(err.message)
  }
}
