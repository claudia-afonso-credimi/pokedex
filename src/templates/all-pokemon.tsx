import * as React from 'react'
import { graphql } from 'gatsby'
import { Link, Trans } from 'gatsby-plugin-react-i18next'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md"
import Layout from '../components/layout'
import Card from '../components/card'
import { Locales, Pokemon, PokemonLocale } from '../types/types'
import * as style from '../pages/style/pokemon.module.scss'

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
  pageContext: {
    currentPage: number
    limit: number
    numPages: number
    skip: number
  }

}

const PokemonList: React.FC<PokemonListProps> = (props) => {
  const data = props.data
  const userLanguage = data.locales.edges[0].node.language
  const pokemonData = data.allPokemon.nodes.map((pokemon: any,) => {
    const filteredData = pokemon.locale.filter((el: any) => el.language === userLanguage)
    return { ...filteredData[0], imageUrl: pokemon.imageUrl, id: pokemon.id }
  })

  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

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
        <div>
          {!isFirst && (
            <Link to={`/page/${prevPage}`} rel="prev">
              <MdOutlineKeyboardArrowLeft />
              <Trans>Previous Page</Trans>
            </Link>
          )}
          {!isLast && (
            <Link to={`/page/${nextPage}`} rel="next">
              <Trans>Next Page</Trans>
              <MdOutlineKeyboardArrowRight />
            </Link>
          )}
        </div>
      </>
    </Layout>
  )
}

export const query = graphql`
  query ($language: String!, $skip: Int!, $limit: Int!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
    	edges {
        node {
          ns
          data
          language
        }
      }
    },
    allPokemon(
      limit: $limit
      skip: $skip
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
