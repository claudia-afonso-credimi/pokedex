import * as React from 'react'
import '@formatjs/intl-pluralrules/polyfill'
import { Link, useI18next } from 'gatsby-plugin-react-i18next'
import { MdCatchingPokemon } from 'react-icons/md'
import { BiHome } from 'react-icons/bi'
import * as style from './layout.module.scss'

type LayoutProps = {
  children: React.ReactElement
  full?: boolean
}

const NavBar: React.FC = () => {
  const { languages, originalPath, path } = useI18next()
  const currentLang = path.replace(/\//g, '')
  const isHomePage = path === '/' || languages.includes(currentLang) || languages.includes(`/${currentLang}/`)

  return (
    <nav className={style.navBar}>
      {!isHomePage && (
        <Link to='/' className={style.navCta}>
          <BiHome size={24} />
        </Link>
      )}
      <ul className={style.list}>
        {languages &&
          languages.map((lang, index) => {
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

const Layout: React.FC<LayoutProps> = ({ children, full }) => {
  return (
    <div className={`${style.container} ${full ? style.full : ''}`}>
      <div className={style.wrapper}>
        <NavBar />
        <main className={`${style.main} ${full ? style.full : ''}`}>{children}</main>
        <MdCatchingPokemon className={style.containerImg} />
      </div>
    </div>
  )
}

export default Layout
