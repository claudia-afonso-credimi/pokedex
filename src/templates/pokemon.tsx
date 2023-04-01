import * as React from 'react'
import { graphql } from 'gatsby'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import Layout from '../components/layout'
import Card from '../components/card'
import { Locales, Pokemon, PokemonLocale } from '../types/types'
import * as style from '../pages/style/pokemon.module.scss'

type PokemonPageProps = {
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

const PokemonPage: React.FC<PokemonPageProps> = ({ data }) => {
  const userLanguage = data.locales.edges[0].node.language
  const pokemonData = data.allPokemon.nodes.map((pokemon: any,) => {
    const filteredData = pokemon.locale.filter((el: any) => el.language === userLanguage)
    return { ...filteredData[0], imageUrl: pokemon.imageUrl, id: pokemon.id }
  })

  return (
    <Layout full>
      <>
        <h1 className={style.title}>Image goes here!</h1>
        <h1 className={style.title}>{pokemonData[0].name}</h1>
        <h1 className={style.title}>{pokemonData[0].genus}</h1>
        <h1 className={style.title}>{pokemonData[0].details.x}</h1>
        <h1 className={style.title}>{pokemonData[0].details.y}</h1>
        <h1 className={style.title}>{pokemonData[0].id}</h1>
      </>
    </Layout>

  )
}

export const query = graphql`
  query ($language: String!, $slug: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
    	edges {
        node {
          ns
          data
          language
        }
      }
    },
    allPokemon(filter: {id: {eq: $slug}}) {
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

export const Head = () => <title>Pokémon</title>

export default PokemonPage
