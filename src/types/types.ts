export type Locales = {
  ns: string
  data: string
  language: string
}

export type PokemonLocale = {
  id: string
  imageUrl: string
  locale: Pokemon[]
}

export type Pokemon = {
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
