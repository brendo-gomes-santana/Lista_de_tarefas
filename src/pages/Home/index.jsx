import { useState } from 'react'
import { Link } from 'react-router-dom'

import React from 'react'
import'./style.css'

export default function Home() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(e){
    e.preventDefault()
    if(!email || !password){
      alert('preenchar todos os campos')
    }
    alert('texte')
  }
  return (
    <>
      <div className='containerHome'>
        <h1>Lista de Tarefas</h1>
        <span>Gerencie sua agenda de forma fácil</span>
      
        <form onSubmit={handleLogin} className='form'>
          <input type='text' placeholder='Digite seu email'
          value={email} onChange={ v => setEmail(v.target.value)}/>
          <input type='password ' placeholder='Digite sua senha'
          value={password} onChange={ v => setPassword(v.target.value)}/>
          <button type='submit'>Acessar</button>
        </form>
        <Link to='register' className='button-link'>Não possuí uma conta? Cadastre-se</Link>
      </div>
      
    </>
  )
}
