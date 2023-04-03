import { Pokemon, PokemonLocale, PokemonSearchBox } from '../types/types'

export const usePokemonDataLanguage = (lang: string, pokemon: PokemonLocale[]): Pokemon[] => {
  const pokemonData: Pokemon[] = pokemon.map((pokemon: PokemonLocale) => {
    const filteredData = pokemon.locale.filter((el: Pokemon) => el.language === lang)
    return { ...filteredData[0], imageUrl: pokemon.imageUrl, id: pokemon.id, featuredImg: pokemon.featuredImg }
  })

  return pokemonData
}

export const usePokemonDataSearch = (lang: string, pokemon: PokemonLocale[]): PokemonSearchBox[] => {
  const pokemonData: PokemonSearchBox[] = pokemon.map((pokemon: PokemonLocale) => {
    const filteredData = pokemon.locale.filter((el: Pokemon) => el.language === lang)
    return { key: pokemon.id, value: filteredData[0].name }
  })

  return pokemonData
}
