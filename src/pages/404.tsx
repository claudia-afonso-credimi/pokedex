import * as React from 'react'
import { Link, HeadFC, PageProps } from 'gatsby'
import Layout from '../components/layout'
import * as style from './style/404.module.scss'

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout full>
      <main>
        <h1 className={style.title}>Page not found</h1>
        <p className={style.details}>
          Sorry 😔, we couldn’t find what you were looking for.
          <br />
          {process.env.NODE_ENV === 'development' ? (
            <>
              <br />
              Try creating a page in <code className={style.codeStyles}>src/pages/</code>.
              <br />
            </>
          ) : null}
          <br />
          <Link to='/' className={style.link}>
            Go home
          </Link>
        </p>
      </main>
    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
