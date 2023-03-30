import * as React from 'react'
import { graphql } from 'gatsby'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import Layout from '../components/layout'
import Card from '../components/card'
import * as style from './style/pokemon.module.scss'

const Pokemon = ({ data }: { data: Record<string, any>}) => {
  return (
    <Layout full>
      <>
        <h1 className={style.title}><Trans>Pokédex</Trans></h1>
        <div className={style.cardsGrid}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </>
    </Layout>

  )
}

// export const query = graphql`
//   query ($language: String!) {
//     locales: allLocale(filter: {language: {eq: $language}}) {
//       edges {
//         node {
//           ns
//           data
//           language
//         }
//       }
//     },
//      allNyTimesArticles(
//       filter: {
//         pub_date: { eq: "1980-11-23T05:00:00+0000" }
//         abstract: { ne: "" }
//       }
//     ) {
//       nodes {
//         pub_date
//         headline {
//           main
//         }
//         abstract
//         web_url
//       }
//     }
//   },
// `;

export const Head = () => <title>Pokemon page</title>

export default Pokemon
