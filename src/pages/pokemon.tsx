import * as React from 'react'
import { Layout } from '../layout/layout'

const AboutPage = () => {
  return (
    <Layout>
      <p>Hi there! I'm the proud creator of this site, which I built with Gatsby.</p>
    </Layout>
  )
}

export const Head = () => <title>About Me</title>

export default AboutPage
