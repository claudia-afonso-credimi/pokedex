import * as React from 'react'
import { graphql } from 'gatsby'
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import Layout from '../components/layout'
import Card from '../components/card'
import { Locales, Pokemon, PokemonLocale } from '../types/types'
import * as style from './style/pokemon.module.scss'

type PokemonListProps = {
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

const PokemonList: React.FC<PokemonListProps> = ({ data }) => {
  const userLanguage = data.locales.edges[0].node.language
  const pokemonData = data.allPokemon.nodes.map((pokemon: any,) => {
    const filteredData = pokemon.locale.filter((el: any) => el.language === userLanguage)
    return { ...filteredData[0], imageUrl: pokemon.imageUrl, id: pokemon.id }
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
  query ($language: String!,$limit: Int!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    },
    allPokemon (
      limit: $limit
    ) {
      nodes {
        id
        imageUrl
        localImage {
          childImageSharp {
            gatsbyImageData(
              width: 200
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
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

export const Head = () => <title>All Pokémon</title>

export default PokemonList
