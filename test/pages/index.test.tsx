import { cleanup, render } from '@testing-library/react'
import React from 'react'
import Home from '../../src/pages/index'

describe(`TOP PAGE`, () => {
  afterEach(() => {
    cleanup
  })

  test('snapshot', async () => {
    const { asFragment } = render(<Home />)
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })

  test('integration', async () => {
    render(<Home />)
  })
})
