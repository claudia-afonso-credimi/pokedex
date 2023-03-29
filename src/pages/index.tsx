import * as React from 'react'
import { graphql } from 'gatsby'
import {Trans, useTranslation} from 'gatsby-plugin-react-i18next'
import { BiSearchAlt } from "react-icons/bi"
import Input from '../components/input/input'
import { Layout } from '../components/layout'
import * as style from './style/index.module.scss'

const HomePage = () => {
  const {t} = useTranslation()

  return (
    <Layout>
      <>
        <p className={style.overTitle}><Trans>Welcome to Pokédex</Trans></p>
        <h1 className={style.title}><Trans>What Pokémon are you looking for?</Trans></h1>
        <div>
        <Input icon={BiSearchAlt} />
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
    }
  }
`;

export const Head = () => <title>Home Page</title>

export default HomePage
