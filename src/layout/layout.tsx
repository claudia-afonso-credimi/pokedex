import * as React from 'react'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from "gatsby"
import { FormattedMessage, IntlProvider } from "react-intl"
import "@formatjs/intl-pluralrules/polyfill"
import { getCurrentLangKey } from 'ptz-i18n'
import { MdCatchingPokemon } from "react-icons/md"
import * as style from './layout.module.scss'

type LayoutProps = {
  children: React.ReactElement
  location: any
  messages: any
}

const NavBar = () => {
  return (
    <nav className={style.navBar}>
      <ul className={style.list}>
        <li className={style.listItem}>EN</li>
        <li className={style.listItem}>IT</li>
        <li className={style.listItem}>ES</li>
      </ul>
    </nav>
  )
}

const Layout: React.FC<LayoutProps> = ({ children, location, messages }) => {
  const data = useStaticQuery(graphql`
    query SiteData {
      site {
        siteMetadata {
          title
          languages {
            languages {
              defaultLangKey
              langs
            }
          }
        }
      }
    }
  `)

  const { langs, defaultLangKey } = data.site.siteMetadata.languages.languages;

  const langKey = getCurrentLangKey(langs, defaultLangKey, location.pathname);

  return (
    <IntlProvider locale={langKey} messages={messages}>
      <div className={style.container}>
        <MdCatchingPokemon className={style.containerImg}/>
        <NavBar />
        <main className={style.main}>
          {children}
        </main>
      </div>
    </IntlProvider>
  )
}

export { Layout }
