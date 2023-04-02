export type Locales = {
  edges: {
    node: {
      language: string
    }
  }[]
}

export type PokemonLocale = {
  id: string
  imageUrl: string
  locale: Pokemon[]
}

export type Pokemon = {
  id: string
  language: string
  genus: string
  name: string
  details: {
    x: string
    y: string
  }
}

export type PokemonImages = {
  id: string
  imageUrl: string
}

export type PokemonPageProps = {
  allPokemon: {
    nodes: PokemonLocale[]
  }
  allLocale: Locales
}
