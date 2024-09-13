import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRoutes({children}) {

    const navigate=useNavigate()
    const [isloggedIn,setIslogged]=useState(false)

    useEffect(()=>{
        const localUser=localStorage.getItem("token")
        if(localUser){
            setIslogged(true)
        }
        else{
            navigate("/login")
        }
    },[])



  return (
    isloggedIn?children:null
  )
}

export default ProtectedRoutes
