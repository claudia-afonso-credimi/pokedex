import * as React from 'react'
import { MdCatchingPokemon } from "react-icons/md"
import { BiSearchAlt } from "react-icons/bi"
import Input from '../components/input/input'
import { Layout } from '../layout/layout'
import * as style from './style/index.module.scss'

const HomePage = () => {
  return (
    <Layout>
      <>
        <p className={style.overTitle}>Welcome to Pokédex</p>
        <h1 className={style.title}>What Pokémon are you looking for?</h1>
        {/* <MdCatchingPokemon color={'yellow'} /> */}
        <div>
        <Input icon={BiSearchAlt} />
        </div>
      </>
    </Layout>

  )
}

export const Head = () => <title>Home Page</title>

export default HomePage
