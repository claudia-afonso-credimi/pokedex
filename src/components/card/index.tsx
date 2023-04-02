import { Link } from 'gatsby-plugin-react-i18next'
import React from 'react'
import { Pokemon } from '../../types/types'
import * as style from './card.module.scss'

type CardProps = {
  pokemon: Pokemon
}

const Card: React.FC<CardProps> = ({ pokemon }) => {
  return (
    <Link className={style.card} to={`/${pokemon.id}`}>
      <h2 className={style.name}>{pokemon.name}</h2>
      <div className={style.imgContainer}></div>
    </Link>
  )
}

export default Card
