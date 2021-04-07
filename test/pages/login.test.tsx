import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import React from 'react'
import Login from '../../src/pages/login'
import { auth } from '../../src/utils/firebase'
import AppMock from '../mocks/app-mock'
import { loggedInDemo, loggedInInit, nowLoading, unregistered } from '../mocks/globalStateMock'
import { nextRouterMock } from '../mocks/nextRouterMock'

// モック関数を作成
jest.mock('next/router', () => ({ useRouter: jest.fn() }))
jest.mock('../../src/utils/firebase', () => ({
  auth: { signInWithEmailAndPassword: jest.fn() },
}))
jest.mock('../../src/requests/userDataset', () => ({
  getUserDataset: jest.fn(),
  postUserDataset: jest.fn(),
  deleteUserDataset: jest.fn(),
}))

describe(`ログインページ (/login)`, () => {
  afterEach(cleanup)

  test('スナップショット', async () => {
    // useRouterのメソッドをモック化する
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const { asFragment } = render(
      <AppMock initializeState={unregistered} drawerMenu={false}>
        <Login />
      </AppMock>
    )

    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })

  test('ログイン状態を判別中', async () => {
    // ソースファイルのrouterに渡した引数をmockRouterで受け取る
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <AppMock initializeState={nowLoading} drawerMenu={false}>
        <Login />
      </AppMock>
    )

    // 読み込み中にcomponents/atoms/spinner.tsxが表示されるか
    expect(screen.getByText('読み込んでいます')).toBeInTheDocument()
  })

  test('ログインしていないユーザー', async () => {
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <AppMock initializeState={unregistered} drawerMenu={false}>
        <Login />
      </AppMock>
    )

    // メニューが存在しないか
    expect(screen.queryByRole('button', { name: 'ホーム' })).not.toBeInTheDocument()

    // メールアドレスを入力するテキストフィールドが存在し、変更できる
    const email = screen.getByLabelText('email').querySelector('input') as HTMLInputElement
    expect(email.value).toEqual('')
    fireEvent.change(email, { target: { value: 'test' } }) // テキストを変更
    expect(email.value).toEqual('test')

    // パスワードを入力するテキストフィールドが存在し、変更できる]
    const password = screen.getByLabelText('password').querySelector('input') as HTMLInputElement
    expect(password.value).toEqual('')
    fireEvent.change(password, { target: { value: 'Z9mLGk3R' } }) // テキストを変更
    expect(password.value).toEqual('Z9mLGk3R')

    // ログインボタンをクリック
    userEvent.click(screen.getByRole('button', { name: 'ログイン', hidden: true }))

    // メールアドレスのバリデートが走る
    expect(screen.getByText('有効なメールアドレスを入力してください。')).toBeInTheDocument()

    // 有効なメールアドレスに変更して登録ボタンをクリック
    fireEvent.change(email, { target: { value: 'test@test.test' } })
    userEvent.click(screen.getByRole('button', { name: 'ログイン', hidden: true }))

    // ユーザー登録のリクエストが走った
    expect(auth.signInWithEmailAndPassword).toHaveBeenCalled()
  })

  test('初期データを持つログイン済みのユーザー', async () => {
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <AppMock initializeState={loggedInInit} drawerMenu={false}>
        <Login />
      </AppMock>
    )

    // next/routerでダッシュボードページへリダイレクトしているか
    expect(mockRouter.push).toHaveBeenCalledWith('/dashboard')
  })

  test('フルデータを持つログイン済みのユーザー', async () => {
    // useRouterのメソッドをモック化する
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <AppMock initializeState={loggedInDemo} drawerMenu={false}>
        <Login />
      </AppMock>
    )

    // next/routerでダッシュボードページへリダイレクトしているか
    expect(mockRouter.push).toHaveBeenCalledWith('/dashboard')
  })
})
