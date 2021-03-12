export type CheckupDataset = {
  [key: string]: {
    question: string
    submit: { message: string; next: string }
  }
}
