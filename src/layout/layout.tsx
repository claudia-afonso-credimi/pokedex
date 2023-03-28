import * as React from 'react'
import { Link } from 'gatsby'
import * as style from './layout.module.scss'

type LayoutProps = {
  children: React.ReactElement
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={style.container}>
      <nav className={style.navBar}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/pokemon">About</Link></li>
        </ul>
      </nav>
      <main className={style.main}>
        {children}
      </main>
      <footer className={style.footer}>
        change language
      </footer>
    </div>
  )
}

const EmptyLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={style.container}>
      <main className={style.main}>
        {children}
      </main>
      <footer className={style.footer}>
        change language
      </footer>
    </div>
  )
}

export { Layout, EmptyLayout }
