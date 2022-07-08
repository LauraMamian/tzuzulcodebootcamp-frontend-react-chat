import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Navbar() {

  //const {user, logged} = useSelector((state) => { return state.auth }) //Devuelve el estado global
  const {user, logged} = useSelector(state => state.auth) // Lee el estado global

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        {/* {logged && <li>Hi {user.name}!</li>} */}
      </ul>
    </nav>
  )
}
