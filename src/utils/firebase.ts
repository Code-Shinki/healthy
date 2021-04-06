import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from 'utils/env'

const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
}
if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}

if (process.browser) {
  ;(async () => {
    // firestoreのキャッシュを有効化
    await firebase.firestore().enablePersistence({ synchronizeTabs: true })
  })()
}

const auth = firebase.auth()
const db = firebase.firestore()

export { auth, db }
