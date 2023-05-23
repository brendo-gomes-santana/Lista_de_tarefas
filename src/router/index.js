import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Register from '../pages/Register'

import Admin from '../pages/Admin'

import Privato from './Privato'

export default function RouteApp(){


    return(
        <Routes>
            <Route path='/' element={ <Home/> } />
            <Route path='/register' element={ <Register/> } />

            <Route path='/admin' element={ <Privato> <Admin/> </Privato> } />
        </Routes>
    )
}