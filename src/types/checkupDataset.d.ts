export type CheckupDataset = {
  [key: string]: {
    question: string
    button: { prev: string; next: string; nextMessage: string }
  }
}
