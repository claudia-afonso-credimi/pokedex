import React from 'react'
import * as style from './input.module.scss'

type InputProps = {
  icon?: React.ReactElement
  error?: string
}

const Input: React.FC<InputProps> = ({ icon, error}) => {
  return <input className={style.input} type="text" id="search" name="search" placeholder="Pokemon name" />
}

export default Input
