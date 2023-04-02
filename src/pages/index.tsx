import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import ReactSearchBox from 'react-search-box'
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import { BiSearchAlt } from 'react-icons/bi'
import { PokemonLocale, Pokemon, PokemonPageProps } from '../types/types'
import Layout from '../components/layout'
import style from './style/index.module.scss'

type PokemonSearchBox = {
  key: string
  value: string
}[]

const HomePage: React.FC<PageProps<PokemonPageProps>> = ({ data }) => {
  const { t } = useTranslation()
  const userLanguage: string = data.allLocale.edges[0].node.language
  const pokemonData: PokemonSearchBox = data.allPokemon.nodes.map((pokemon: PokemonLocale) => {
    const filteredData = pokemon.locale.filter((el: Pokemon) => el.language === userLanguage)
    return { key: pokemon.id, value: filteredData[0].name }
  })

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
    allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
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

export const Head = (): JSX.Element => <title>Home Page</title>

export default HomePage
