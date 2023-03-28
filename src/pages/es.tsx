import * as React from 'react'
import { FormattedMessage } from "react-intl"
import { BiSearchAlt } from "react-icons/bi"
import Input from '../components/input/input'
import { Layout } from '../layout/layout'
import messages from '../data/i18n/es'
import * as style from './style/index.module.scss'

const HomePage = (props: { location: any }) => {
  return (
    <Layout location={props.location} messages={messages}>
      <>
        <p className={style.overTitle}><FormattedMessage id={messages.index.overTitle} /></p>
        <h1 className={style.title}><FormattedMessage id={messages.index.title} /></h1>
        <div>
        <Input icon={BiSearchAlt} />
        </div>
      </>
    </Layout>

  )
}

export const Head = () => <title>Home Page</title>

export default HomePage
