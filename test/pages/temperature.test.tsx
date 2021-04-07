import { cleanup, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import React from 'react'
import Temperature from '../../src/pages/temperature'
import AppMock from '../mocks/app-mock'
import { loggedInDemo, loggedInInit, nowLoading, unregistered } from '../mocks/globalStateMock'
import { nextRouterMock } from '../mocks/nextRouterMock'

// モック関数を作成
jest.mock('next/router', () => ({ useRouter: jest.fn() }))
jest.mock('react-apexcharts', () => {
  return {
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => {
      return <div />
    },
  }
})

describe(`体温グラフページ (/temperature)`, () => {
  afterEach(cleanup)

  test('スナップショット', async () => {
    // useRouterのメソッドをモック化する
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const { asFragment } = render(
      <AppMock initializeState={loggedInDemo} drawerMenu={true}>
        <Temperature />
      </AppMock>
    )

    const tree = asFragment()
    expect(tree).toMatchSnapshot()

    // 再レンダーを待機
    expect(await screen.findByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  test('ログイン状態を判別中', async () => {
    // ソースファイルのrouterに渡した引数をmockRouterで受け取る
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <AppMock initializeState={nowLoading} drawerMenu={true}>
        <Temperature />
      </AppMock>
    )

    // 読み込み中にcomponents/atoms/spinner.tsxが表示されるか
    expect(screen.getByText('読み込んでいます')).toBeInTheDocument()
  })

  test('ログインしていないユーザー', async () => {
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <AppMock initializeState={unregistered} drawerMenu={true}>
        <Temperature />
      </AppMock>
    )

    // next/routerでログインページへリダイレクトしているか
    expect(mockRouter.push).toHaveBeenCalledWith('/login')
  })

  test('初期データを持つログイン済みのユーザー', async () => {
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <AppMock initializeState={loggedInInit} drawerMenu={true}>
        <Temperature />
      </AppMock>
    )

    // メニューが存在するか
    expect(screen.getByRole('button', { name: 'ホーム' })).toBeInTheDocument()

    // ページタイトルが存在するか
    expect(screen.getByRole('heading', { level: 1, name: /体温グラフ/i })).toBeInTheDocument()

    // データが規定数以上存在しないため注意が表示されるか
    expect(screen.getByText('データが不足しています')).toBeInTheDocument()
  })

  test('フルデータを持つログイン済みのユーザー', async () => {
    // useRouterのメソッドをモック化する
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <AppMock initializeState={loggedInDemo} drawerMenu={true}>
        <Temperature />
      </AppMock>
    )

    // メニューが存在するか
    expect(screen.getByRole('button', { name: 'ホーム' })).toBeInTheDocument()

    // ページタイトルが存在するか
    expect(screen.getByRole('heading', { level: 1, name: /体温グラフ/i })).toBeInTheDocument()

    // グラフが存在するか (モック化しているのでラッパーを検出)
    expect(await screen.findByRole('region')).toHaveClass('fullGraph')
  })
})
