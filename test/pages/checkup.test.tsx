import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import React from 'react'
import Checkup from '../../src/pages/checkup'
import { postUserDataset } from '../../src/requests/userDataset'
import AppMock from '../mocks/AppMock'
import { loggedInDemo, loggedInInit, nowLoading, unregistered } from '../mocks/globalStateMock'
import { nextRouterMock } from '../mocks/nextRouterMock'

// モック関数を作成
jest.mock('next/router', () => ({ useRouter: jest.fn() }))
jest.mock('../../src/requests/userDataset', () => ({
  getUserDataset: jest.fn(),
  postUserDataset: jest.fn(),
  deleteUserDataset: jest.fn(),
}))

describe(`体調記録ページ (/checkup)`, () => {
  afterEach(cleanup)

  test('スナップショット', async () => {
    // useRouterのメソッドをモック化する
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const { asFragment } = render(
      <AppMock initializeState={loggedInDemo} drawerMenu={true}>
        <Checkup />
      </AppMock>
    )

    const tree = asFragment()
    expect(tree).toMatchSnapshot()

    // 再レンダーを待機
    expect(await screen.findByText('今日の体調')).toBeInTheDocument()
  })

  test('ログイン状態を判別中', async () => {
    // ソースファイルのrouterに渡した引数をmockRouterで受け取る
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <AppMock initializeState={nowLoading} drawerMenu={true}>
        <Checkup />
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
        <Checkup />
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
        <Checkup />
      </AppMock>
    )

    // メニューが存在するか
    expect(screen.getByRole('button', { name: 'ホーム' })).toBeInTheDocument()

    // タイトルが存在するか
    expect(screen.getByRole('heading', { level: 1, name: '今日の体調' })).toBeInTheDocument()

    // 進退ボタンが存在するか
    const nextButton = screen.getByRole('button', { name: '次へ' })
    const prevButton = screen.getByRole('button', { name: '戻る' })

    // step1が表示されているか
    expect(screen.getByText('調子はいかがですか？')).toBeInTheDocument()
    const moodLabels = screen
      .getByRole('region', { name: 'form-wrapper' })
      .querySelectorAll('label') as NodeListOf<HTMLLabelElement>
    expect(moodLabels).toHaveLength(3)

    // step1でbadを選択して次に進めるか
    userEvent.click(moodLabels[2])
    userEvent.click(nextButton)

    // step2が表示されているか
    const temperatureInput = screen.getByRole('spinbutton')
    expect(screen.getByText('体温はどうでしょうか？')).toBeInTheDocument()
    expect(temperatureInput).toHaveDisplayValue('36.5')
    expect(screen.getByText('初めての記録ですね！')).toBeInTheDocument()

    // step2で体温を変更して次に進めるか
    userEvent.type(temperatureInput, '{backspace}36.8')
    expect(temperatureInput).toHaveDisplayValue('36.8')
    userEvent.click(nextButton)

    // step3が表示されているか
    const symptomInput = screen.getByRole('textbox')
    const symptomAddButton = screen.getByRole('button', { name: '追加する' })
    expect(screen.getByText('どんな症状がありますか？')).toBeInTheDocument()
    expect(screen.queryByText('寝不足')).not.toBeInTheDocument()
    expect(symptomInput).toHaveDisplayValue('')
    expect(symptomAddButton).toBeInTheDocument()

    // step3で症状を変更して戻れるか
    userEvent.type(symptomInput, '吐き気')
    expect(symptomInput).toHaveDisplayValue('吐き気')
    userEvent.click(symptomAddButton)
    expect(symptomInput).toHaveDisplayValue('')
    expect(screen.getByText('吐き気')).toBeInTheDocument()
    userEvent.click(prevButton)

    // step2 -> step1 -> fineを選択して次へ
    expect(screen.getByText('体温はどうでしょうか？')).toBeInTheDocument()
    userEvent.click(prevButton)
    expect(screen.getByText('調子はいかがですか？')).toBeInTheDocument()

    const newMoodLabels = screen
      .getByRole('region', { name: 'form-wrapper' })
      .querySelectorAll('label') as NodeListOf<HTMLLabelElement> // NodeListは再取得が必要

    userEvent.click(newMoodLabels[1])
    userEvent.click(nextButton)
    expect(screen.getByText('熱はありますか？')).toBeInTheDocument()

    // fineルートに入力データを引き継げているか
    expect(temperatureInput).toHaveDisplayValue('36.8')
    userEvent.click(nextButton)
    expect(screen.getByText('吐き気')).toBeInTheDocument()

    // データを登録できるか
    userEvent.click(screen.getByRole('button', { name: '記録する' }))
    expect(postUserDataset).toHaveBeenCalled()
  })

  test('フルデータを持つログイン済みのユーザー', async () => {
    // useRouterのメソッドをモック化する
    const mockRouter = nextRouterMock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <AppMock initializeState={loggedInDemo} drawerMenu={true}>
        <Checkup />
      </AppMock>
    )

    // メニューが存在するか
    expect(screen.getByRole('button', { name: 'ホーム' })).toBeInTheDocument()

    // タイトルが存在するか
    expect(screen.getByRole('heading', { level: 1, name: '今日の体調' })).toBeInTheDocument()

    // 進退ボタンが存在するか
    const nextButton = screen.getByRole('button', { name: '次へ' })
    const prevButton = screen.getByRole('button', { name: '戻る' })

    // step1が表示されているか
    expect(screen.getByText('調子はいかがですか？')).toBeInTheDocument()
    const moodLabels = screen
      .getByRole('region', { name: 'form-wrapper' })
      .querySelectorAll('label') as NodeListOf<HTMLLabelElement>
    expect(moodLabels).toHaveLength(3)

    // step1でbadを選択して次に進めるか
    userEvent.click(moodLabels[2])
    userEvent.click(nextButton)

    // step2が表示されているか
    const temperatureInput = screen.getByRole('spinbutton')
    expect(screen.getByText('体温はどうでしょうか？')).toBeInTheDocument()
    expect(temperatureInput).toHaveDisplayValue('36.5')
    expect(screen.getByText('前回と変わりないですか？')).toBeInTheDocument()

    // step2で体温を変更して次に進めるか
    userEvent.type(temperatureInput, '{backspace}36.8')
    expect(temperatureInput).toHaveDisplayValue('36.8')
    expect(screen.getByText('前回よりも 0.3℃ 高いですね…')).toBeInTheDocument()
    userEvent.click(nextButton)

    // step3が表示されているか
    const symptomInput = screen.getByRole('textbox')
    const symptomAddButton = screen.getByRole('button', { name: '追加する' })
    expect(screen.getByText('どんな症状がありますか？')).toBeInTheDocument()
    expect(screen.queryByText('寝不足')).toBeInTheDocument()
    expect(symptomInput).toHaveDisplayValue('')
    expect(symptomAddButton).toBeInTheDocument()

    // step3で症状を変更して戻れるか
    userEvent.type(symptomInput, '吐き気')
    expect(symptomInput).toHaveDisplayValue('吐き気')
    userEvent.click(symptomAddButton)
    expect(symptomInput).toHaveDisplayValue('')
    expect(screen.getByText('吐き気')).toBeInTheDocument()
    userEvent.click(prevButton)

    // step2 -> step1 -> fineを選択して次へ
    expect(screen.getByText('体温はどうでしょうか？')).toBeInTheDocument()
    userEvent.click(prevButton)
    expect(screen.getByText('調子はいかがですか？')).toBeInTheDocument()

    const newMoodLabels = screen
      .getByRole('region', { name: 'form-wrapper' })
      .querySelectorAll('label') as NodeListOf<HTMLLabelElement> // NodeListは再取得が必要

    userEvent.click(newMoodLabels[1])
    userEvent.click(nextButton)
    expect(screen.getByText('熱はありますか？')).toBeInTheDocument()

    // fineルートに入力データを引き継げているか
    expect(temperatureInput).toHaveDisplayValue('36.8')
    expect(screen.getByText('前回よりも 0.3℃ 高いですね…')).toBeInTheDocument()
    userEvent.click(nextButton)
    expect(screen.getByText('寝不足')).toBeInTheDocument()
    expect(screen.getByText('吐き気')).toBeInTheDocument()

    // データを登録できるか
    userEvent.click(screen.getByRole('button', { name: '記録する' }))
    expect(postUserDataset).toHaveBeenCalled()
  })
})
