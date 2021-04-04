export const validateEmail = (email: string) => {
  // https://qiita.com/sakuro/items/1eaa307609ceaaf51123
  if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
    return true
  }
  return false
}

export const validatePassword = (password: string) => {
  // https://qiita.com/mpyw/items/886218e7b418dfed254b
  if (password.match(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/)) {
    return true
  }
  return false
}

export const validateName = (name: string | null) => {
  // 30文字以下の文字列またはnullならばtrue
  if (name === null || (name.length >= 0 && name.length <= 30)) {
    return true
  }
  return false
}

export const validateHeight = (height: number | null) => {
  // 50～300の数字またはnullならばtrue
  if (height === null || (height >= 50 && height <= 300)) {
    return true
  }
  return false
}

export const validateWeight = (weight: number | null) => {
  // 10～300の数字またはnullならばtrue
  if (weight === null || (weight >= 10 && weight <= 300)) {
    return true
  }
  return false
}

export const validateDoctor = (doctor: string | null) => {
  // 30文字以下の文字列またはnullならばtrue
  if (doctor === null || (doctor.length >= 0 && doctor.length <= 30)) {
    return true
  }
  return false
}
