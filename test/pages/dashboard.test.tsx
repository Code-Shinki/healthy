import { cleanup, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import React from 'react'
import Dashboard from '../../src/pages/dashboard'
import AppMock from '../mocks/AppMock'
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

describe(`ダッシュボード (/dashboard)`, () => {
  afterEach(cleanup)

  test('スナップショット', async () => {
    // useRouterのメソッドをモック化する
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const { asFragment } = render(
      <AppMock initializeState={loggedInDemo} drawerMenu={true}>
        <Dashboard />
      </AppMock>
    )

    const tree = asFragment()
    expect(tree).toMatchSnapshot()

    // 再レンダーを待機
    expect(await screen.findByText('最近の調子')).toBeInTheDocument()
  })

  test('ログイン状態を判別中', async () => {
    // ソースファイルのrouterに渡した引数をmockRouterで受け取る
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <AppMock initializeState={nowLoading} drawerMenu={true}>
        <Dashboard />
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
        <Dashboard />
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
        <Dashboard />
      </AppMock>
    )

    // メニューが存在するか
    expect(screen.getByRole('button', { name: 'ホーム' })).toBeInTheDocument()

    // 各コンテナのタイトルが存在するか
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(4)

    // データが規定数以上存在しないため注意が表示されるか
    expect(screen.getAllByText('データが不足しています')).toHaveLength(3)
  })

  test('フルデータを持つログイン済みのユーザー', async () => {
    // useRouterのメソッドをモック化する
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <AppMock initializeState={loggedInDemo} drawerMenu={true}>
        <Dashboard />
      </AppMock>
    )

    // メニューが存在するか
    expect(screen.getByRole('button', { name: 'ホーム' })).toBeInTheDocument()

    // サマリーデータが存在するか
    expect(screen.getByRole('heading', { level: 2, name: '1月1日の体調' })).toBeInTheDocument()
    expect(screen.getByText('寝不足')).toBeInTheDocument()
    expect(screen.getByText('今日の体調を記録しましょう！')).toBeInTheDocument()

    // コンディションリストが存在するか
    expect(screen.getByRole('heading', { level: 2, name: '最近の調子' })).toBeInTheDocument()

    // 体温グラフが存在するか
    expect(screen.getByRole('heading', { level: 2, name: '最近の体温' })).toBeInTheDocument()
    expect(await screen.findByRole('region')).toHaveClass('miniGraph')

    // ユーザー情報が存在するか
    expect(screen.getByRole('heading', { level: 2, name: 'ユーザー情報' })).toBeInTheDocument()
    expect(screen.getByText('山本 太郎')).toBeInTheDocument()
    expect(screen.getByText('男性')).toBeInTheDocument()
    expect(screen.getByText('172 cm')).toBeInTheDocument()
    expect(screen.getByText('65.4 kg')).toBeInTheDocument()
    expect(screen.getByText('樫山市立中央病院')).toBeInTheDocument()
  })
})
