import React from 'react'
import { IconType } from 'react-icons/lib'
import * as style from './input.module.scss'

type InputProps = {
  icon?: IconType
  error?: string
}

const Input: React.FC<InputProps> = ({ icon: Icon, error}) => {
  return (
    Icon ?
      <div className={style.inputWrapper}>
        <>
          <Icon className={style.inputIcon} />
          <input className={style.input} type="text" id="search" name="search" placeholder="Pokemon name" />
          {error && <p className={style.errorMessage}>Required</p>}
        </>
      </div>
    :
      <input className={style.input} type="text" id="search" name="search" placeholder="Pokemon name" />
  )
}

export default Input
