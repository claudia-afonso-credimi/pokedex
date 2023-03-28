import * as React from 'react'
import { Link } from 'gatsby'
import { MdCatchingPokemon } from "react-icons/md"
import * as style from './layout.module.scss'

type LayoutProps = {
  children: React.ReactElement
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

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   return (
//     <div className={style.container}>
//       <MdCatchingPokemon className={style.containerImg}/>
//       <nav className={style.navBar}>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/pokemon">About</Link></li>
//         </ul>
//       </nav>
//       <main className={style.main}>
//         {children}
//       </main>
//       <Footer />
//     </div>
//   )
// }

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={style.container}>
      <MdCatchingPokemon className={style.containerImg}/>
      <NavBar />
      <main className={style.main}>
        {children}
      </main>
    </div>
  )
}

export { Layout }
