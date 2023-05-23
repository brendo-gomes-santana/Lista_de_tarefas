import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import React from 'react'

import { auth } from '../../service/firebaseConnect'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Register() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleRegister(e){
    e.preventDefault()
    if(!email || !password){
      alert('preenchar todos os campos')
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
    .then(()=> {  
      navigate('/admin', { replace:true })
    }).catch((error)=> {
      console.log(error)
    })
  }
  return (
    <>
      <div className='containerHome'>
        <h1>Cadastro</h1>
        <span>Vamos Criar sua conta</span>
      
        <form onSubmit={handleRegister} className='form'>
          <input type='text' placeholder='Digite seu email'
          value={email} onChange={ v => setEmail(v.target.value)}/>
          <input type='password' placeholder='Digite sua senha'
          value={password} onChange={ v => setPassword(v.target.value)}/>
          <button type='submit'>Acessar</button>
        </form>
        <Link to='/' className='button-link'>Já possui uma conta? Faça login</Link>
      </div>
    </>
  )
}
