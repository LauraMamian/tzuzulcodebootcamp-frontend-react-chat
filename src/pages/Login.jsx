import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/auth";

export default function Login() {
  const state = useSelector((state) => { return state.auth }) //Devuelve el estado global
  // Se puede decidir la parte que se quiere obtener
  const dispatch = useDispatch() // Funcion para actualizar el estado

  const handleLogin = async (event) => {
    event.preventDefault()
    const { email, password } = event.target

    // Lo que se pasa aqui es la data necesaria para poder realizar el proceso asincrono
    dispatch(login({
      email: email.value,
      password: password.value
    }))
  }

  // const handleLogin = async (event) => {
  //   event.preventDefault()

  //   try {
  //     const { email, password } = event.target
  //     const data = await post("/api/auth/login", {
  //       email: email.value,
  //       password: password.value
  //     })

  //     // dispatch(login({
  //     //   name: "Laura",
  //     //   email: "laura@tzuzulcode.com"
  //     // }))
  //     // login(payload)
  //     // Nota: Solo se puede pasar un parametro como payload
  //     dispatch(login(data.user))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      {state.logged && <p>Hi {state.user.name}!</p>}
      <form onSubmit={handleLogin}>
        <input type="email" name='email' placeholder='Email' />
        <input type="password" name='password' placeholder='Password' />
        <button>Login</button>
      </form>
    </>
  )
}
