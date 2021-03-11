import firebase from 'firebase'

export type checkupDatasetType = {
  [key: string]: {
    question: string
    submit: { message: string; next: string }
  }
}

export const checkupDataset: checkupDatasetType = {
  init: {
    question: '今日のデータがありませんね。調子はいかがですか？',
    submit: { message: '次へ', next: '' },
  },
  good: {
    question: 'それでは本日は体温だけ記録しておきましょう！',
    submit: { message: '記録する', next: '/api/checkup/complete' },
  },
  fine: {
    question: 'なるほど…体温を測っておきましょうか',
    submit: { message: '次へ', next: 'symptom' },
  },
  bad: {
    question: 'そうですか…少しだけお時間をください。体温は何度でしょうか。',
    submit: { message: '次へ', next: 'symptom' },
  },
  symptom: {
    question: '今日はどんな症状がありますか？',
    submit: { message: '記録する', next: 'complete' },
  },
  complete: {
    question: 'データを記録しています…',
    submit: { message: '', next: '' },
  },
}

export type userHealthDataType = {
  mood: 'good' | 'fine' | 'bad'
  temperature: number
  symptom: string[]
  createdAt: string | null
}

export type userDatasetType = {
  name: string | null
  sex: 'male' | 'female' | null
  height: number | null
  weight: number | null
  doctor: string | null
  createdAt: firebase.firestore.FieldValue | null
  health: userHealthDataType[] | []
}

export const userInitialDataset: userDatasetType = {
  name: null,
  sex: null,
  height: null,
  weight: null,
  doctor: null,
  createdAt: null,
  health: [],
}

export const userDemoDataset: userDatasetType = {
  name: '山田 太郎',
  sex: 'male',
  height: 172,
  weight: 65,
  doctor: '樫山市立中央病院',
  createdAt: null,
  health: [
    {
      mood: 'bad',
      temperature: 37.8,
      symptom: ['頭痛', '咳が出る', '鼻水'],
      createdAt: null,
    },
    {
      mood: 'bad',
      temperature: 37.3,
      symptom: ['咳が出る', '鼻水'],
      createdAt: null,
    },
    {
      mood: 'fine',
      temperature: 36.9,
      symptom: ['食欲がない', '鼻づまり'],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.5,
      symptom: ['鼻づまり'],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.6,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.4,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.6,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'fine',
      temperature: 36.3,
      symptom: ['腰痛'],
      createdAt: null,
    },
    {
      mood: 'fine',
      temperature: 36.5,
      symptom: ['筋肉痛'],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.5,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.7,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.7,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.5,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'fine',
      temperature: 36.3,
      symptom: ['鼻づまり'],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.4,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.4,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.6,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'fine',
      temperature: 36.5,
      symptom: ['寝不足'],
      createdAt: null,
    },
    {
      mood: 'bad',
      temperature: 36.3,
      symptom: ['寝不足'],
      createdAt: null,
    },
    {
      mood: 'bad',
      temperature: 36.4,
      symptom: ['寝不足'],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.3,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.6,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.5,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.4,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.6,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.5,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'fine',
      temperature: 36.4,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.5,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.5,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.4,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.7,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.6,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'bad',
      temperature: 36.6,
      symptom: ['ストレス'],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.5,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.6,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.4,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.4,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.4,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.5,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.5,
      symptom: ['口唇ヘルペス'],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.4,
      symptom: ['口唇ヘルペス'],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 35.8,
      symptom: ['口唇ヘルペス'],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.6,
      symptom: ['口唇ヘルペス'],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.6,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.4,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.5,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.5,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.7,
      symptom: ['喉の痛み（カラオケ）'],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.4,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.6,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.5,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.6,
      symptom: ['空咳', '喉の痛み'],
      createdAt: null,
    },
    {
      mood: 'fine',
      temperature: 36.8,
      symptom: ['空咳', '倦怠感'],
      createdAt: null,
    },
    {
      mood: 'bad',
      temperature: 37.6,
      symptom: ['空咳', '倦怠感', '下痢'],
      createdAt: null,
    },
    {
      mood: 'bad',
      temperature: 38.5,
      symptom: ['空咳', '倦怠感', '息切れ', '下痢'],
      createdAt: null,
    },
    {
      mood: 'bad',
      temperature: 37.8,
      symptom: ['空咳', '倦怠感', '喉の痛み', '頭痛'],
      createdAt: null,
    },
    {
      mood: 'bad',
      temperature: 37.2,
      symptom: ['空咳', '倦怠感', '喉の痛み'],
      createdAt: null,
    },
    {
      mood: 'fine',
      temperature: 36.8,
      symptom: ['倦怠感', '鼻水'],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.4,
      symptom: [],
      createdAt: null,
    },
    {
      mood: 'good',
      temperature: 36.5,
      symptom: [],
      createdAt: null,
    },
  ],
}
