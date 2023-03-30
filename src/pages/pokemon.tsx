import * as React from 'react'
import { graphql } from 'gatsby'
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import Layout from '../components/layout'
import * as style from './style/pokemon.module.scss'

const Pokemon = (props: { location: any }) => {
  return (
    <Layout>
      <>
        <h1 className={style.title}><Trans>title</Trans></h1>
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
    }
  }
`;

export const Head = () => <title>Pokemon page</title>

export default Pokemon
