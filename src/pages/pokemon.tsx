import * as React from 'react'
import { graphql } from 'gatsby'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import Layout from '../components/layout'
import Card from '../components/card'
import { Locales, Pokemon, PokemonLocale } from '../types/types'
import * as style from './style/pokemon.module.scss'

type PokemonProps = {
  data: {
    locales:  {
      edges: [{
        node: Locales
      }]
    }
    allPokemon: {
      nodes: PokemonLocale[]
    }
  }
}

const PokemonCard: React.FC<PokemonProps> = ({ data }) => {
  const userLanguage = data.locales.edges[0].node.language
  const pokemonData = data.allPokemon.nodes.map((pokemon: any,) => {
    const filteredData = pokemon.locale.filter((el: any) => el.language === userLanguage)
    return filteredData[0]
  })

  return (
    <Layout full>
      <>
        <h1 className={style.title}><Trans>Pokédex</Trans></h1>
        <ul className={style.cardsGrid}>
          {pokemonData.map((el: Pokemon, index: number) => {
            return (
              <li key={index}>
                <Card pokemon={el} />
              </li>
            )}
          )}
        </ul>
      </>
    </Layout>

  )
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    },
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
`;

export const Head = () => <title>Pokemon page</title>

export default PokemonCard
