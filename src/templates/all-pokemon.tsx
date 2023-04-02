import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Link, Trans } from 'gatsby-plugin-react-i18next'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import Layout from '../components/layout'
import Card from '../components/card'
import { PokemonPageProps, Pokemon, PokemonLocale } from '../types/types'
import * as style from '../pages/style/all-pokemon.module.scss'

type PageContext = {
  currentPage: number
  numPages: number
}

const PokemonList: React.FC<PageProps<PokemonPageProps, PageContext>> = (props) => {
  const userLanguage = props.data.locales.edges[0].node.language
  const pokemonData = props.data.allPokemon.nodes.map((pokemon: PokemonLocale) => {
    const filteredData = pokemon.locale.filter((el: Pokemon) => el.language === userLanguage)
    return { ...filteredData[0], imageUrl: pokemon.imageUrl, id: pokemon.id }
  })

  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <Layout full>
      <>
        <div>
          <h1 className={style.title}>
            <Trans>Pokédex</Trans>
          </h1>
          <ul className={style.cardsGrid}>
            {pokemonData.map((el: Pokemon, index: number) => {
              return (
                <li key={index}>
                  <Card pokemon={el} />
                </li>
              )
            })}
          </ul>
        </div>
        <div className={`${isLast ? style.lastPage : ''} ${style.pagination} ${isFirst ? style.firstPage : ''}`}>
          {!isFirst && (
            <Link to={`/page/${prevPage}`} rel='prev' className={style.paginationLink}>
              <MdOutlineKeyboardArrowLeft />
              <Trans>Previous Page</Trans>
            </Link>
          )}
          {!isLast && (
            <Link to={`/page/${nextPage}`} rel='next' className={style.paginationLink}>
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
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allPokemon(limit: $limit, skip: $skip) {
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

export const Head = () => <title>All Pokémon</title>

export default PokemonList
