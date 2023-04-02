import * as React from 'react'
import { graphql } from 'gatsby'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import Layout from '../components/layout'
import { Locales, Pokemon, PokemonLocale } from '../types/types'
import * as style from './style/pokemon.module.scss'

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
      <div className={style.container}>
        <div className={style.image}></div>
        <h1 className={style.title}>{pokemonData[0].name}</h1>
        <div className={style.detailsContainer}>
          <div className={style.pokemonDetails}>
            <p className={style.detailsTitle}><Trans>Number: </Trans></p>
            <p className={style.details}>{pokemonData[0].id.split('-')[1]}</p>
          </div>
          <div className={style.pokemonDetails}>
            <p className={style.detailsTitle}><Trans>Genus: </Trans></p>
            <p className={style.details}>{pokemonData[0].genus}</p>
          </div>
          <div className={style.pokemonDetails}>
            <p className={style.detailsTitle}><Trans>X: </Trans></p>
            <p className={style.details}>{pokemonData[0].details.x}</p>
          </div>
          <div className={style.pokemonDetails}>
            <p className={style.detailsTitle}><Trans>Y: </Trans></p>
            <p className={style.details}>{pokemonData[0].details.y}</p>
          </div>
        </div>
        {/* <p className={style.details}><Trans>Genus: </Trans>{pokemonData[0].genus}</p>
        <p className={style.details}><Trans>X: </Trans>{pokemonData[0].details.x}</p>
        <p className={style.details}><Trans>Y: </Trans>{pokemonData[0].details.y}</p> */}
      </div>
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
