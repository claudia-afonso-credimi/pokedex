import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Trans } from 'gatsby-plugin-react-i18next'
import Layout from '../components/layout'
import { PokemonPageProps, PokemonLocale } from '../types/types'
import { usePokemonDataLanguage } from '../hooks/usePokemonData'
import * as style from '../pages/style/pokemon.module.scss'

type PokemonPage = {
  pageData: PageProps<PokemonPageProps>
}

const PokemonPage: React.FC<PokemonPage> = ({ pageData }) => {
  const userLanguage: string = pageData.data.locales.edges[0].node?.language || ''
  const pokemonList: PokemonLocale[] = pageData.data.allPokemon.nodes || []
  const pokemonData = usePokemonDataLanguage(userLanguage, pokemonList)

  return (
    <Layout full>
      <div className={style.container}>
        <div className={style.image}>
          <GatsbyImage image={pokemonData[0].featuredImg.childImageSharp.gatsbyImageData} alt={pokemonData[0].name} />
        </div>
        <h1 data-testid='pokemon-name' className={style.title}>
          {pokemonData[0].name}
        </h1>
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
        featuredImg {
          childImageSharp {
            gatsbyImageData(width: 200, placeholder: BLURRED)
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
`

export const Head = (): JSX.Element => <title>Pokémon</title>

export default PokemonPage
