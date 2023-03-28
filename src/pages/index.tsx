import * as React from 'react'
import { MdCatchingPokemon } from "react-icons/md"
import Input from '../components/input/input'
import { EmptyLayout } from '../layout/layout'
import * as style from './style/index.module.scss'

const HomePage = () => {
  return (
    <EmptyLayout>
      <div>
        <p>Welcome to</p>
        <h1 className={style.title}>Pokédex</h1>
        {/* <MdCatchingPokemon color={'yellow'} /> */}
        <div>
          <Input />
          <div>
            <button>Show all</button>
            <button>Surprise Me</button>
          </div>
        </div>
      </div>
    </EmptyLayout>

  )
}

export const Head = () => <title>Home Page</title>

export default HomePage
