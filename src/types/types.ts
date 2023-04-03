import { PageProps } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'

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
  featuredImg: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
  locale: Pokemon[]
}

export type Pokemon = {
  id: string
  language: string
  imageUrl: string
  featuredImg: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
  genus: string
  name: string
  details: {
    x: string
    y: string
  }
}

export type PokemonDataPageProps = {
  data: PokemonPageProps
}

export type PokemonPageProps = {
  allPokemon: {
    nodes: PokemonLocale[]
  }
  locales: Locales
}

export type PokemonSearchBox = {
  key: string
  value: string
}

export type PageContext = {
  currentPage: number
  numPages: number
}

export type PaginationData = {
  isFirst: boolean
  isLast: boolean
  prevPage: string
  nextPage: string
}
