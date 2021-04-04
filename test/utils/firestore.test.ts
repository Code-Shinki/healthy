import * as firebase from '@firebase/testing'
import * as fs from 'fs'
import demoDataset from '../../src/datasets/userDemoDataset.json'
import initDataset from '../../src/datasets/userInitDataset.json'

const PROJECT_ID = 'shinki-healthy-test'
const RULES_PATH = 'firebase/firestore.rules'

// 認証付きのFirestore Appを作成
const createAuthApp = (auth?: Record<string, unknown>): firebase.firestore.Firestore => {
  return firebase.initializeTestApp({ projectId: PROJECT_ID, auth: auth }).firestore()
}

// 管理者権限で操作できるFirestore appを作成
const createAdminApp = (): firebase.firestore.Firestore => {
  return firebase.initializeAdminApp({ projectId: PROJECT_ID }).firestore()
}

describe('Firestoreセキュリティルール', () => {
  const userDemoDataset = demoDataset
  const userInitDataset = initDataset

  // セキュリティルールを読み込む
  beforeAll(async () => {
    await firebase.loadFirestoreRules({
      projectId: PROJECT_ID,
      rules: fs.readFileSync(RULES_PATH, 'utf8'),
    })
  })

  // Firestoreデータをクリーンアップ
  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: PROJECT_ID })
  })

  // Firestoreアプリを削除
  afterAll(async () => {
    await Promise.all(firebase.apps().map((app) => app.delete()))
  })

  describe('ユーザー認証の検証', () => {
    test('自分のuidと同様のドキュメントIDのデータのみ閲覧、作成、編集、削除可能', async () => {
      // Yamadaで認証を持つDBの作成
      const db = createAuthApp({ uid: 'Yamada' })
      const userDocumentRef = db.collection('users').doc('Yamada')

      // 自分のuidと同様のドキュメントIDのユーザー情報を追加可能
      await firebase.assertSucceeds(userDocumentRef.set(userDemoDataset))

      // 自分のuidと同様のドキュメントIDのユーザー情報を閲覧可能
      await firebase.assertSucceeds(userDocumentRef.get())

      // 自分のuidと同様のドキュメントIDのユーザー情報を編集可能
      await firebase.assertSucceeds(userDocumentRef.update({ name: 'Yamada Taro' }))

      // 自分のuidと同様のドキュメントIDのユーザー情報を削除可能
      await firebase.assertSucceeds(userDocumentRef.delete())
    })

    test('自分のuidと異なるドキュメントIDのデータは閲覧、作成、編集、削除が出来ない', async () => {
      // 事前にadmin権限で別ユーザーでのデータを準備
      createAdminApp().collection('users').doc('Yamada').set(userInitDataset)

      // Suzukiで認証を持つDBの作成
      const db = createAuthApp({ uid: 'Suzuki' })

      // Yamadaでusersコレクションへの参照を取得
      const userDocumentRef = db.collection('users').doc('Yamada')

      // 自分のuidと同様のドキュメントIDのユーザー情報を追加不可
      await firebase.assertFails(userDocumentRef.set(userDemoDataset))

      // 自分のuidと同様のドキュメントIDのユーザー情報を閲覧不可
      await firebase.assertFails(userDocumentRef.get())

      // 自分のuidと同様のドキュメントIDのユーザー情報を編集不可
      await firebase.assertFails(userDocumentRef.update({ name: 'Yamada Taro' }))

      // 自分のuidと同様のドキュメントIDのユーザー情報を削除不可
      await firebase.assertFails(userDocumentRef.delete())
    })
  })

  describe('スキーマの検証', () => {
    test('正しくないスキーマの場合は作成できない', async () => {
      // Yamadaで認証を持つDBの作成
      const db = createAuthApp({ uid: 'Yamada' })
      const userDocumentRef = db.collection('users').doc('Yamada')

      // 想定外のプロパティがある
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, age: 1 }))

      // プロパティの型が異なる
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, name: 1234 }))
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, gender: true }))
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, height: '172' }))
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, weight: '65' }))
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, doctor: false }))
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, createdAt: 2021 }))
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, health: '[string]' }))
    })

    test('正しくないスキーマの場合は編集できない', async () => {
      // 事前にadmin権限で別ユーザーでのデータを準備
      createAdminApp().collection('users').doc('Yamada').set(userInitDataset)

      // Yamadaで認証を持つDBの作成
      const db = createAuthApp({ uid: 'Yamada' })
      const userDocumentRef = db.collection('users').doc('Yamada')

      // 想定外のプロパティがある場合
      await firebase.assertFails(userDocumentRef.update({ place: 'japan' }))

      // プロパティの型が異なる場合
      await firebase.assertFails(userDocumentRef.update({ name: 1234 }))
      await firebase.assertFails(userDocumentRef.set({ gender: true }))
      await firebase.assertFails(userDocumentRef.update({ height: '172' }))
      await firebase.assertFails(userDocumentRef.set({ weight: '65' }))
      await firebase.assertFails(userDocumentRef.update({ doctor: false }))
      await firebase.assertFails(userDocumentRef.set({ createdAt: 2021 }))
      await firebase.assertFails(userDocumentRef.update({ health: '[string]' }))
    })
  })

  describe('値のバリデーション', () => {
    test('nameは30文字以下の文字列かnullである', async () => {
      // Yamadaで認証を持つDBの作成
      const db = createAuthApp({ uid: 'Yamada' })
      const userDocumentRef = db.collection('users').doc('Yamada')

      // 正しい値ではデータを作成できる
      await firebase.assertSucceeds(userDocumentRef.set({ ...userInitDataset, name: 'a'.repeat(30) }))
      await firebase.assertSucceeds(userDocumentRef.set({ ...userInitDataset, name: null }))

      // 正しくない値ではデータを作成できない
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, name: 'a'.repeat(31) }))
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, name: 1 }))
    })

    test('genderは「男性」か「女性」の文字列またはnullである', async () => {
      // Yamadaで認証を持つDBの作成
      const db = createAuthApp({ uid: 'Yamada' })
      const userDocumentRef = db.collection('users').doc('Yamada')

      // 正しい値ではデータを作成できる
      await firebase.assertSucceeds(userDocumentRef.set({ ...userInitDataset, gender: '男性' }))
      await firebase.assertSucceeds(userDocumentRef.set({ ...userInitDataset, gender: '女性' }))
      await firebase.assertSucceeds(userDocumentRef.set({ ...userInitDataset, gender: null }))

      // 正しくない値ではデータを作成できない
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, gender: 'male' }))
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, gender: 'female' }))
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, gender: true }))
    })

    test('heightは50〜300の数値かnullである', async () => {
      // Yamadaで認証を持つDBの作成
      const db = createAuthApp({ uid: 'Yamada' })
      const userDocumentRef = db.collection('users').doc('Yamada')

      // 正しい値ではデータを作成できる
      await firebase.assertSucceeds(userDocumentRef.set({ ...userInitDataset, height: 172 }))
      await firebase.assertSucceeds(userDocumentRef.set({ ...userInitDataset, height: 50 }))
      await firebase.assertSucceeds(userDocumentRef.set({ ...userInitDataset, height: 300 }))
      await firebase.assertSucceeds(userDocumentRef.set({ ...userInitDataset, height: null }))

      // 正しくない値ではデータを作成できない
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, height: -172 }))
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, height: 49 }))
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, height: 301 }))
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, height: '172' }))
    })

    test('weightは10〜300の数値かnullである', async () => {
      // Yamadaで認証を持つDBの作成
      const db = createAuthApp({ uid: 'Yamada' })
      const userDocumentRef = db.collection('users').doc('Yamada')

      // 正しい値ではデータを作成できる
      await firebase.assertSucceeds(userDocumentRef.set({ ...userInitDataset, weight: 62 }))
      await firebase.assertSucceeds(userDocumentRef.set({ ...userInitDataset, weight: 10 }))
      await firebase.assertSucceeds(userDocumentRef.set({ ...userInitDataset, weight: 300 }))
      await firebase.assertSucceeds(userDocumentRef.set({ ...userInitDataset, weight: null }))

      // 正しくない値ではデータを作成できない
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, weight: -62 }))
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, weight: 9 }))
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, weight: 301 }))
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, weight: '62' }))
    })

    test('doctorは30文字以下の文字列かnullである', async () => {
      // Yamadaで認証を持つDBの作成
      const db = createAuthApp({ uid: 'Yamada' })
      const userDocumentRef = db.collection('users').doc('Yamada')

      // 正しい値ではデータを作成できる
      await firebase.assertSucceeds(userDocumentRef.set({ ...userInitDataset, doctor: 'a'.repeat(30) }))
      await firebase.assertSucceeds(userDocumentRef.set({ ...userInitDataset, doctor: null }))

      // 正しくない値ではデータを作成できない
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, doctor: 'a'.repeat(31) }))
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, doctor: 1 }))
    })

    test('createdAtは50文字以下の文字列かnullである', async () => {
      // Yamadaで認証を持つDBの作成
      const db = createAuthApp({ uid: 'Yamada' })
      const userDocumentRef = db.collection('users').doc('Yamada')

      // 正しい値ではデータを作成できる
      await firebase.assertSucceeds(userDocumentRef.set({ ...userInitDataset, createdAt: 'a'.repeat(50) }))
      await firebase.assertSucceeds(userDocumentRef.set({ ...userInitDataset, createdAt: null }))

      // 正しくない値ではデータを作成できない
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, createdAt: 'a'.repeat(51) }))
      await firebase.assertFails(userDocumentRef.set({ ...userInitDataset, createdAt: 1 }))
    })
  })
})
