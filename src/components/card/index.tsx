import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import * as style from './card.module.scss'

type CardProps = {
  data?: Record<string, any>
}

// ○ Pokemon number
// ○ Pokemon name (in correct language)
// ○ Pokemon genus (in correct language)
// ○ Pokemon description (in correct language)
// ○ Pokemon image

const Card: React.FC<CardProps> = ({ data }) => {
  const imageTemp = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png" as IGatsbyImageData
  return (
    <div className={style.card}>
        <div className={style.imgContainer}>
          {/* <GatsbyImage className={style.img} image={imageTemp} alt={'data.blogPost.author'} /> */}
        </div>
        <h2 className={style.name}>Bulbasaur</h2>
    </div>
  )
}

export default Card
