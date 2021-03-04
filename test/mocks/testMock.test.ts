import { cleanup } from '@testing-library/react'

describe(`This is Mock`, () => {
  afterEach(() => {
    cleanup
  })

  test('operation check', () => {
    expect(1 + 1).toBe(2)
    expect(1 + 1).not.toBe(3)
  })
})
