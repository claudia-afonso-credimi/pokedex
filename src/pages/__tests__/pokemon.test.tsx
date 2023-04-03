import * as React from 'react'
import { render } from '@testing-library/react'
import PokemonPage from '../../templates/pokemon'
import { allMock } from './__mocks__/pokemon.mocks'

describe('Test Pokemon page', () => {
  test('Displays the pokemon name', () => {
    const { getByTestId } = render(<PokemonPage data={allMock.data} />)
    expect(getByTestId('pokemon-name')).not.toBeNull()
  })
})
