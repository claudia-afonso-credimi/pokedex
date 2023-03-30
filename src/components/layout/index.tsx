import * as React from 'react'
import {Link, useI18next} from 'gatsby-plugin-react-i18next';
import "@formatjs/intl-pluralrules/polyfill"
import { MdCatchingPokemon, MdOutlineKeyboardBackspace } from "react-icons/md"
import * as style from './layout.module.scss'

type LayoutProps = {
  children: React.ReactElement
}

const NavBar: React.FC = () => {
  const {languages, originalPath} = useI18next()
  const path = location.pathname.replace(/\//g, "")
  const isHomePage = languages.includes(path) || languages.includes(`/${path}/`)

  return (
    <nav className={style.navBar}>
      {!isHomePage &&
        <Link to="/" className={style.navCta}>
          <MdOutlineKeyboardBackspace />
        </Link>
      }
      <ul className={style.list}>
        {languages && languages.map((lang, index) => {
          return (
            <li key={index} className={style.listItem}>
              <Link to={originalPath} language={lang} className={style.navCta}>
                {lang.toUpperCase()}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className={style.container}>
      <NavBar />
      <main className={style.main}>
        {children}
      </main>
      <MdCatchingPokemon className={style.containerImg}/>
    </div>
  )
}

export default Layout
