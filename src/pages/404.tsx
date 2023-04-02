import * as React from 'react'
import { Link, HeadFC, graphql } from 'gatsby'
import { Trans } from 'gatsby-plugin-react-i18next'
import Layout from '../components/layout'
import * as style from './style/404.module.scss'

const NotFoundPage: React.FC = () => {
  return (
    <Layout full>
      <main>
        <h1 className={style.title}>
          <Trans>Page not found</Trans>
        </h1>
        <p className={style.details}>
          <Trans>Sorry 😔, we couldn’t find what you were looking for.</Trans>
          <br />
          {process.env.NODE_ENV === 'development' ? (
            <>
              <br />
              <Trans>Try creating a page in </Trans>
              <code className={style.codeStyles}>src/pages/</code>.
              <br />
            </>
          ) : null}
          <br />
          <Link to='/' className={style.link}>
            <Trans>Go home</Trans>
          </Link>
        </p>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`

export default NotFoundPage

export const Head: HeadFC = () => (
  <title>
    <Trans>Page not found</Trans>
  </title>
)
