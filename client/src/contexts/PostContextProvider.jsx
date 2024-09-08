import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const postContext=createContext()

function PostContextProvider({children}) {
    
    const navigate=useNavigate()

    const [postMessage,setPostMessage]=useState("")
    const uploadUserPost=async(formData)=>{
        try {
            const response=await fetch("http://localhost:5000/twizzy/posts/create-post",{
                method:"POST",
                body:formData
            })
            
            const data=await response.json()
            if(response.status==200){
                setPostMessage(data.response)
               
            }
           else{
            setPostMessage(data.response)
           }

        } catch (error) {
          console.log(error)  
        }
    }

  return (
    <postContext.Provider  value={{
        uploadUserPost,
        postMessage,
        setPostMessage
    }}>
      {children}
    </postContext.Provider>
  )
}

export default PostContextProvider
