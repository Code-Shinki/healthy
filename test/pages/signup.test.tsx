import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import React from 'react'
import Signup from '../../src/pages/signup'
import { auth } from '../../src/utils/firebase'
import AppMock from '../mocks/AppMock'
import { loggedInDemo, loggedInInit, nowLoading, unregistered } from '../mocks/globalStateMock'
import { nextRouterMock } from '../mocks/nextRouterMock'

// モック関数を作成
jest.mock('next/router', () => ({ useRouter: jest.fn() }))
jest.mock('../../src/utils/firebase', () => ({
  auth: { createUserWithEmailAndPassword: jest.fn(() => ({ credential: { user: { uid: 'uid' } } })) },
}))
jest.mock('../../src/requests/userDataset', () => ({
  getUserDataset: jest.fn(),
  postUserDataset: jest.fn(),
  deleteUserDataset: jest.fn(),
}))

describe(`新規登録ページ (/signup)`, () => {
  afterEach(cleanup)

  test('スナップショット', async () => {
    // useRouterのメソッドをモック化する
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const { asFragment } = render(
      <AppMock initializeState={unregistered} drawerMenu={false}>
        <Signup />
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
        <Signup />
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
        <Signup />
      </AppMock>
    )

    // 注意モーダルが存在し、クリック後に消えているか
    expect(screen.queryByRole('presentation', { name: 'このアプリについて' })).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', { name: '確認しました' }))
    expect(screen.queryByRole('presentation', { name: 'このアプリについて' })).not.toBeInTheDocument()

    // メニューが存在しないか
    expect(screen.queryByRole('button', { name: 'ホーム' })).not.toBeInTheDocument()

    // ユーザー名を入力するテキストフィールドが存在し、変更できる
    const name = screen.getByLabelText('name').querySelector('input') as HTMLInputElement
    expect(name.value).toEqual('')
    fireEvent.change(name, { target: { value: '鈴木 美穂' } }) // テキストを変更
    expect(name.value).toEqual('鈴木 美穂')

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

    // 登録ボタンをクリック
    userEvent.click(screen.getByRole('button', { name: '登録する', hidden: true }))

    // メールアドレスのバリデートが走る
    expect(screen.getByText('有効なメールアドレスを入力してください。')).toBeInTheDocument()

    // 有効なメールアドレスに変更して登録ボタンをクリック
    fireEvent.change(email, { target: { value: 'test@test.test' } })
    userEvent.click(screen.getByRole('button', { name: '登録する', hidden: true }))

    // ユーザー登録のリクエストが走った
    expect(auth.createUserWithEmailAndPassword).toHaveBeenCalled()
  })

  test('初期データを持つログイン済みのユーザー', async () => {
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <AppMock initializeState={loggedInInit} drawerMenu={false}>
        <Signup />
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
        <Signup />
      </AppMock>
    )

    // next/routerでダッシュボードページへリダイレクトしているか
    expect(mockRouter.push).toHaveBeenCalledWith('/dashboard')
  })
})
