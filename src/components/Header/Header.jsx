import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <nav>
        <span> <Link to='/'>🤙 PokeRedux</Link> </span>
      </nav>
      <nav></nav>
    </header>
  )
}

export default Header