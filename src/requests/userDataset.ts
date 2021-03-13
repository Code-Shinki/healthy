import { UserDataset } from 'types/userDataset'
import { db } from 'utils/firebase'

export const fetchGetUserDataset = async (uid: string) => {
  try {
    const snapshot = await db
      .collection('users')
      .doc(uid as string)
      .get({ source: 'cache' })
      .then((doc) => {
        return doc.data()
      })
      .catch(async () => {
        return await db
          .collection('users')
          .doc(uid as string)
          .get({ source: 'server' })
          .then((doc) => {
            return doc.data()
          })
      })
    return snapshot
  } catch (err) {
    alert(err.message)
    return undefined
  }
}

export const fetchPostUserDataset = async (uid: string, data: UserDataset) => {
  try {
    await db.collection('users').doc(uid).set(data)
  } catch (err) {
    alert(err.message)
  }
}
