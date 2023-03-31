import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Pokemon } from '../../types/types'
import * as style from './card.module.scss'

type PokemonProps = {
  pokemon: Pokemon
}

const Card: React.FC<PokemonProps> = ({ pokemon }) => {
  return (
    <div className={style.card}>
        <div className={style.imgContainer}>
        {/* {imagehere} */}
        </div>
        <h2 className={style.name}>{pokemon.name}</h2>
    </div>
  )
}

export default Card
