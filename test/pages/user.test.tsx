import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import React from 'react'
import User from '../../src/pages/user'
import { postUserDataset } from '../../src/requests/userDataset'
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

describe(`ユーザー設定ページ (/user)`, () => {
  afterEach(cleanup)

  test('スナップショット', async () => {
    // useRouterのメソッドをモック化する
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const { asFragment } = render(
      <AppMock initializeState={loggedInDemo} drawerMenu={true}>
        <User />
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
      <AppMock initializeState={nowLoading} drawerMenu={true}>
        <User />
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
        <User />
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
        <User />
      </AppMock>
    )

    // メニューが存在するか
    expect(screen.getByRole('button', { name: 'ホーム' })).toBeInTheDocument()

    // ページタイトルが存在するか
    expect(screen.getByRole('heading', { level: 1, name: /ユーザー設定/i })).toBeInTheDocument()

    // フォームラベルが存在するか
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(5)

    // ユーザー名を入力するテキストフィールドが存在し、空であるか
    expect(screen.getByRole('textbox', { name: 'name' })).toHaveDisplayValue('')

    // 性別を選択するラジオボタンが存在し、選択されていないか
    expect(screen.getByRole('radio', { name: '男性' })).not.toBeChecked()
    expect(screen.getByRole('radio', { name: '女性' })).not.toBeChecked()

    // 身長を入力するテキストフィールドが存在し、空であるか
    expect(screen.getByRole('spinbutton', { name: 'height' })).toHaveDisplayValue('')

    // 体重を入力するテキストフィールドが存在し、空であるか
    expect(screen.getByRole('spinbutton', { name: 'weight' })).toHaveDisplayValue('')

    // かかりつけ医を入力するテキストフィールドが存在し、空であるか
    expect(screen.getByRole('textbox', { name: 'doctor' })).toHaveDisplayValue('')
  })

  test('フルデータを持つログイン済みのユーザー', async () => {
    // useRouterのメソッドをモック化する
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <AppMock initializeState={loggedInDemo} drawerMenu={true}>
        <User />
      </AppMock>
    )

    // メニューが存在するか
    expect(screen.getByRole('button', { name: 'ホーム' })).toBeInTheDocument()

    // ページタイトルが存在するか
    expect(screen.getByRole('heading', { level: 1, name: /ユーザー設定/i })).toBeInTheDocument()

    // フォームラベルが存在するか
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(5)

    // ユーザー名を入力するテキストフィールドが存在し、変更できるか
    const name = screen.getByRole('textbox', { name: 'name' })
    expect(name).toHaveDisplayValue('山本 太郎')
    userEvent.type(name, 'です') // テキストを変更
    expect(name).toHaveDisplayValue('山本 太郎です')

    // 性別を選択するラジオボタンが存在し、チェックできるか
    expect(screen.getByRole('radio', { name: '男性' })).toBeChecked()
    expect(screen.getByRole('radio', { name: '女性' })).not.toBeChecked()
    userEvent.click(screen.getByRole('radio', { name: '女性' })) // 女性を選択
    expect(screen.getByRole('radio', { name: '男性' })).not.toBeChecked()
    expect(screen.getByRole('radio', { name: '女性' })).toBeChecked()

    // 身長を入力するテキストフィールドが存在し、変更できるか
    const height = screen.getByRole('spinbutton', { name: 'height' })
    expect(height).toHaveDisplayValue('172')
    userEvent.type(height, '{backspace}5') // 値を変更
    expect(height).toHaveDisplayValue('175')

    // 体重を入力するテキストフィールドが存在し、変更できるか
    const weight = screen.getByRole('spinbutton', { name: 'weight' })
    expect(weight).toHaveDisplayValue('65.4')
    userEvent.type(weight, '{backspace}8') // 値を変更
    expect(weight).toHaveDisplayValue('65.8')

    // かかりつけ医を入力するテキストフィールドが存在し、変更できるか
    const doctor = screen.getByRole('textbox', { name: 'doctor' })
    expect(doctor).toHaveDisplayValue('樫山市立中央病院')
    userEvent.type(doctor, 'です') // テキストを変更
    expect(doctor).toHaveDisplayValue('樫山市立中央病院です')

    // 更新ボタンをクリック & ステートの更新を待機
    userEvent.click(screen.getByRole('button', { name: '更新する' }))
    await screen.findByRole('heading', { level: 1 })

    // データベースへのリクエストが走るか
    expect(postUserDataset).toHaveBeenCalled()
  })
})
