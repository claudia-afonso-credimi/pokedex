import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import Layout from '../components/layout'
import { PokemonPageProps, Pokemon, PokemonLocale } from '../types/types'
import * as style from '../pages/style/pokemon.module.scss'

const PokemonPage: React.FC<PageProps<PokemonPageProps>> = (props) => {
  const userLanguage = props.data.locales.edges[0].node.language
  const pokemonData = props.data.allPokemon.nodes.map((pokemon: PokemonLocale) => {
    const filteredData = pokemon.locale.filter((el: Pokemon) => el.language === userLanguage)
    return { ...filteredData[0], imageUrl: pokemon.imageUrl, id: pokemon.id }
  })

  return (
    <Layout full>
      <div className={style.container}>
        <div className={style.image}></div>
        <h1 className={style.title}>{pokemonData[0].name}</h1>
        <div className={style.detailsContainer}>
          <div className={style.pokemonDetails}>
            <p className={style.detailsTitle}>
              <Trans>Number: </Trans>
            </p>
            <p className={style.details}>{pokemonData[0].id.split('-')[1]}</p>
          </div>
          <div className={style.pokemonDetails}>
            <p className={style.detailsTitle}>
              <Trans>Genus: </Trans>
            </p>
            <p className={style.details}>{pokemonData[0].genus}</p>
          </div>
          <div className={style.pokemonDetails}>
            <p className={style.detailsTitle}>
              <Trans>X: </Trans>
            </p>
            <p className={style.details}>{pokemonData[0].details.x}</p>
          </div>
          <div className={style.pokemonDetails}>
            <p className={style.detailsTitle}>
              <Trans>Y: </Trans>
            </p>
            <p className={style.details}>{pokemonData[0].details.y}</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($language: String!, $slug: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allPokemon(filter: { id: { eq: $slug } }) {
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

export const Head = (): JSX.Element => <title>Pokémon</title>

export default PokemonPage
