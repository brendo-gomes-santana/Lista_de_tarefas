import React, { useState, useEffect } from 'react'

import { GoSignOut } from 'react-icons/go'
import { RiEmotionSadFill } from 'react-icons/ri'

import './style.css'

import { auth, db } from '../../service/firebaseConnect'
import { signOut } from 'firebase/auth'

import { 

  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,

  doc,
  deleteDoc,

  updateDoc
 } from 'firebase/firestore'

export default function Admin() {

  const [tarefa, setTarefa] = useState('')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('@detailUser')) || {})

  const [array, setArray] = useState([])

  const [edit, setEdit] = useState({})
  
  useEffect(()=> {
    (async()=> {
      const userDefailt = localStorage.getItem("@detailUser")
      setUser(JSON.parse(userDefailt))

      if(userDefailt){
        JSON.parse(userDefailt)

        const tarefaRef = await collection(db, 'Tarefas')
        const q = await query(tarefaRef, orderBy('created', 'desc'), where('user_id', '==', user?.id))
        onSnapshot(q, (snapShot)=> {
          let list = []
          snapShot.forEach((doc)=> {
            list.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              user_id: doc.data().user_id
            })
          })

            setArray(list)

        })
      }
    })()
  },[user?.id])

  async function HandleResgister(e){
    e.preventDefault()
    if(!tarefa){
      alert('Digite um tarefa')
      return;
    }

    if(edit?.id){
      handleUpdateTarefas()
      return;
    }

    await addDoc(collection(db, 'Tarefas'),{
      tarefa: tarefa,
      created: new Date(),
      user_id: user?.id
    })
    .then(()=> {
      setTarefa('')
    })  
    .catch((error)=> {
      console.log(error)
    })
  }

  async function handleDesloga(){
    await signOut(auth);
    localStorage.clear()
    
  }

  async function deletarefa(id_tarefa){
    const docRef = doc(db, 'Tarefas', id_tarefa)
    await deleteDoc(docRef)
  }

  async function editarTarefa(tarefa){
    setEdit(tarefa)
    setTarefa(tarefa.tarefa)
  }

  async function handleUpdateTarefas(){
    const DocRef = doc(db, 'Tarefas', edit?.id)
    await updateDoc(DocRef, {
      tarefa: tarefa
    }).then(()=> {
      setEdit({})
      setTarefa('')
    }).catch((error)=> {
      console.log(error)
      setEdit({})
    })
  }
  return (
    <div className='containerAdmin'>
        <h1>Minhas tarefas</h1>

        <form onSubmit={HandleResgister} className='form'>
          <textarea placeholder='Digite suas tarefa'
          value={tarefa} onChange={ v => setTarefa(v.target.value)}/>

          {Object.keys(edit).length === 0 ? (
              <button type='submit' className='bnt-register'>Registar tarefa</button>
            ) : (
              <button type='submit' className='bnt-register'
              style={{backgroundColor: '#6add39'}}
              >Atualizar tarefa</button>
            )}
         
        </form>

      { array?.length === 0 ? (
        <p>No momento você não possui tarefas ! <RiEmotionSadFill/></p>
      ) : (
        array.map((item)=> {
          return(
            <article className='list' key={item.id}>
            <p>{item.tarefa}</p>
    
            <div>
              <button onClick={()=> editarTarefa(item)}>Editar</button>
              <button className='bnt-delete' onClick={() => deletarefa(item.id)}>Concluir</button>
            </div>
          </article>
          )
        })
      )}

      <button className='btn-logout' onClick={handleDesloga}>
        <GoSignOut/>
      </button>
    </div>
  )
}
