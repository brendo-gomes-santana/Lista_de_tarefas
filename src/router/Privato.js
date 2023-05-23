import { useState, useEffect } from "react"

import { auth } from "../service/firebaseConnect";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Privato({children}){

    const [loading, setLoading] = useState(true);
    const [logado, setLogado] = useState(false);


    useEffect(()=> {
        (async()=> {
            onAuthStateChanged(auth, (user)=> {
                //se tem user logado
                if(user){
                    const userData = {
                        id: user.uid,
                        email: user.email
                    }
                    localStorage.setItem('@detailUser', JSON.stringify(userData))
                    setLoading(false)
                    setLogado(true)
                }else{
                    setLoading(false)
                    setLogado(false)
                }
            })
        })()
    },[])
    if(loading){
        return(
            <div>

            </div>
        )
    }
    if(!logado){
        return <Navigate to='/'/>
    }


    return children   
}