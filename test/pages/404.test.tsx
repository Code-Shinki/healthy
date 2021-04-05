import { cleanup, render } from '@testing-library/react'
import { useRouter } from 'next/router'
import React from 'react'
import Error from '../../src/pages/404'
import { nextRouterMock } from '../mocks/nextRouterMock'

// モック関数を作成
jest.mock('next/router', () => ({ useRouter: jest.fn() }))

describe(`404ページ (/404)`, () => {
  afterEach(cleanup)

  test('スナップショット', async () => {
    // useRouterのメソッドをモック化する
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const { asFragment } = render(<Error />)
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })
})
