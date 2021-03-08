type userDatasetType = {
  name: string
  sex: 'male' | 'female'
  height: number
  weight: number
  doctor: string
  health: {
    mood: ('good' | 'fine' | 'bad')[]
    temperature: number[]
    symptom: string[][]
  }
}

export const userDataset: userDatasetType = {
  name: 'Shinki',
  sex: 'male',
  height: 170,
  weight: 60,
  doctor: '関東中央赤十字病院',
  health: {
    mood: ['good', 'bad', 'fine', 'good', 'bad', 'fine', 'good'],
    temperature: [36.5, 37.8, 36.8, 36.5, 37.8, 36.8, 36.5],
    symptom: [
      [],
      ['頭痛', '咳が出る', '鼻水'],
      ['食欲がない', '鼻づまり'],
      [],
      ['下痢が続く', '悪寒がする', '汗がとまらない'],
      ['お腹が痛い', '吐き気がする', '胃が重い'],
      [],
    ],
  },
}

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
    submit: { message: '記録する', next: '/api/checkup/complete' },
  },
}
