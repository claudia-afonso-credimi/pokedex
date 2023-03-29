import * as React from 'react'
import {Link, useI18next} from 'gatsby-plugin-react-i18next';
import "@formatjs/intl-pluralrules/polyfill"
import { MdCatchingPokemon } from "react-icons/md"
import * as style from './layout.module.scss'

type LayoutProps = {
  children: React.ReactElement
}

const NavBar: React.FC = () => {
  const {languages, changeLanguage} = useI18next()

  return (
    <nav className={style.navBar}>
      <ul className={style.list}>
        {languages && languages.map((lang, index) => {
          return (
            <li key={index} className={style.listItem}>
              <a
                className={style.navLink}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  changeLanguage(lang);
                }}>
                {lang.toUpperCase()}
              </a>
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

export { Layout }
