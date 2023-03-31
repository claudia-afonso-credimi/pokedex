import * as React from 'react'
import { graphql } from 'gatsby'
import ReactSearchBox from "react-search-box"
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import { BiSearchAlt } from "react-icons/bi"
import Input from '../components/input/input'
import Layout from '../components/layout'
import * as style from './style/index.module.scss'

const HomePage = ({ data }: { data: any}) => {
  const {t} = useTranslation()
  const userLanguage = data.locales.edges[0].node.language
  const pokemonData = data.allPokemon.nodes.map((pokemon: any,) => {
    const filteredData = pokemon.locale.filter((el: any) => el.language === userLanguage)
    return { key: filteredData[0].name, value: filteredData[0].name }
  })

  console.log(pokemonData)

  return (
    <Layout>
      <>
        <p className={style.overTitle}><Trans>Welcome to Pokédex</Trans></p>
        <h1 className={style.title}><Trans>What Pokémon are you looking for?</Trans></h1>
        <ReactSearchBox
          placeholder="Bulbasaur..."
          data={pokemonData}
          onSelect={(record: any) => console.log(record)}
          onFocus={() => {
            console.log("This function is called when is focussed");
          }}
          onChange={(value) => console.log(value)}
          autoFocus
          leftIcon={<BiSearchAlt />}
          iconBoxSize="48px"
        />
        <div className={style.ctaContainer}>
          <Link to={'/pokemon'} className={style.cta}><Trans>Search</Trans></Link>
          <Link to={'/pokemon'} className={style.cta}><Trans>Show all</Trans></Link>
        </div>
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
  },
`;

export const Head = () => <title>Home Page</title>

export default HomePage
