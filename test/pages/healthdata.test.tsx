import { cleanup, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import React from 'react'
import Healthdata from '../../src/pages/healthdata'
import AppMock from '../mocks/app-mock'
import { loggedInDemo, loggedInInit, nowLoading, unregistered } from '../mocks/globalStateMock'
import { nextRouterMock } from '../mocks/nextRouterMock'

// モック関数を作成
jest.mock('next/router', () => ({ useRouter: jest.fn() }))
jest.mock('../../src/requests/userDataset', () => ({
  getUserDataset: jest.fn(),
  postUserDataset: jest.fn(),
  deleteUserDataset: jest.fn(),
}))

describe(`ヘルスデータページ (/healthdata)`, () => {
  afterEach(cleanup)

  test('スナップショット', async () => {
    // useRouterのメソッドをモック化する
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const { container } = render(
      <AppMock initializeState={loggedInDemo} drawerMenu={true}>
        <Healthdata />
      </AppMock>
    )

    // DataGridの一部idとaria-controlsがテストごとに異なった値を出力するため、該当箇所をリプレイスしておく
    // https://github.com/mui-org/material-ui/issues/21293#issuecomment-654921524
    const tree = container.innerHTML.replace(/id="mui-[0-9]*"/g, '').replace(/aria-controls="(mui-[0-9]* *)*"/g, '')

    expect(tree).toMatchSnapshot()
  })

  test('ログイン状態を判別中', async () => {
    // ソースファイルのrouterに渡した引数をmockRouterで受け取る
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <AppMock initializeState={nowLoading} drawerMenu={true}>
        <Healthdata />
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
        <Healthdata />
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
        <Healthdata />
      </AppMock>
    )

    // メニューが存在するか
    expect(screen.getByRole('button', { name: 'ホーム' })).toBeInTheDocument()

    // ページタイトルが存在するか
    expect(screen.getByRole('heading', { level: 1, name: /ヘルスデータ/i })).toBeInTheDocument()

    // データが規定数以上存在しないため注意が表示されるか
    expect(screen.getByText('データが不足しています')).toBeInTheDocument()
  })

  test('フルデータを持つログイン済みのユーザー', async () => {
    // useRouterのメソッドをモック化する
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <AppMock initializeState={loggedInDemo} drawerMenu={true}>
        <Healthdata />
      </AppMock>
    )

    // メニューが存在するか
    expect(screen.getByRole('button', { name: 'ホーム' })).toBeInTheDocument()

    // ページタイトルが存在するか
    expect(screen.getByRole('heading', { level: 1, name: /ヘルスデータ/i })).toBeInTheDocument()

    // テーブルが存在するか
    expect(screen.getByText('日時')).toBeInTheDocument()
    expect(screen.getByText('体調')).toBeInTheDocument()
    expect(screen.getByText('体温')).toBeInTheDocument()
  })
})
