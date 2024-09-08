
import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../helpers/helper';


export const userContext=createContext()


function UserContextProvider({children}) {

    const navigate=useNavigate()
    const [responseMessage,setResponseMessage]=useState("")
    const [userId,setUserId]=useState(null)
    const loginUser=async(formData)=>{
       try {
        const response=await fetch("http://localhost:5000/twizzy/users/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        })

        if(response.status==200){
            const data=await response.json()
            setResponseMessage(data.response)

            localStorage.setItem("token",data.token)
            navigate("/")
        }
        else{
            const data=await response.json()
            setResponseMessage(data.response)
        }
       } catch (error) {
            console.log(error)
       }
    }


    const registerUser=async (formData)=>{
        try {
            const response=await fetch("http://localhost:5000/twizzy/users/signup",{
                method:"POST",
                body:formData//since we are sending the img and text
            })

            
            if(response.status==200){
                const data=await response.json()
            setResponseMessage(data.response)
                setResponseMessage(data.response)
    
                localStorage.setItem("token",data.token)
                navigate("/")
            }
            else{
                const data=await response.json()
                console.log(data)
                setResponseMessage(data.response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        const token=localStorage.getItem("token")
        const decodedTokenId=decodeToken(token)
        if(decodedTokenId){
            setUserId(decodedTokenId)
        }
    },[localStorage.getItem("token")])

  return (
    <userContext.Provider value={{
        loginUser,
        responseMessage,
        setResponseMessage,
        registerUser,
        userId,
        setUserId
    }}>
      {children}
    </userContext.Provider>
  )
}

export default UserContextProvider

