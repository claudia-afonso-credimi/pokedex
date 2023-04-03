import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import ReactSearchBox from 'react-search-box'
import { Link, Trans } from 'gatsby-plugin-react-i18next'
import { BiSearchAlt } from 'react-icons/bi'
import { PokemonLocale, PokemonPageProps, PokemonSearchBox } from '../types/types'
import Layout from '../components/layout'
import { usePokemonDataSearch } from '../hooks/usePokemonData'
import * as style from './style/index.module.scss'

const HomePage: React.FC<PageProps<PokemonPageProps>> = ({ data }) => {
  const userLanguage: string = data.locales.edges[0].node.language
  const pokemonList: PokemonLocale[] = data.allPokemon.nodes
  const pokemonData: PokemonSearchBox[] = usePokemonDataSearch(userLanguage, pokemonList)

  return (
    <Layout>
      <>
        <p className={style.overTitle}>
          <Trans>Welcome to Pokédex</Trans>
        </p>
        <h1 className={style.title}>
          <Trans>What Pokémon are you looking for?</Trans>
        </h1>
        <div className={style.input}>
          <ReactSearchBox
            placeholder='Bulbasaur...'
            data={pokemonData}
            onSelect={(value) => window && (window.location.href = `${value.item.key}`)}
            onChange={() => null}
            autoFocus
            leftIcon={<BiSearchAlt className={style.inputIcon} />}
            iconBoxSize='48px'
          />
        </div>
        <div className={style.ctaContainer}>
          <Link to={'/page'} className={style.cta}>
            <Trans>Show all</Trans>
          </Link>
        </div>
      </>
    </Layout>
  )
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allPokemon {
      nodes {
        id
        imageUrl
        locale {
          language
          genus
          name
          details {
            x
            y
          }
        }
      }
    }
  }
`

export const Head = (): JSX.Element => (
  <title>
    <Trans>Home Page</Trans>
  </title>
)

export default HomePage
