import { cleanup, render } from '@testing-library/react'
import { useRouter } from 'next/router'
import React from 'react'
import Top from '../../src/pages/index'
import { nextRouterMock } from '../mocks/nextRouterMock'

// モック関数を作成
jest.mock('next/router', () => ({ useRouter: jest.fn() }))

describe(`トップページ (/)`, () => {
  afterEach(cleanup)

  test('スナップショット', async () => {
    // useRouterのメソッドをモック化する
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const { asFragment } = render(<Top />)
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })
})
