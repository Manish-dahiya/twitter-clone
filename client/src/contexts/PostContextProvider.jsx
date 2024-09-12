import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const postContext=createContext()

function PostContextProvider({children}) {
    
    const navigate=useNavigate()

    const [postMessage,setPostMessage]=useState("")
    const [feed,setFeed]=useState([])


    const uploadUserPost=async(formData,refreshFeed)=>{
        try {
            const response=await fetch("http://localhost:5000/twizzy/posts/create-post",{
                method:"POST",
                body:formData
            })
            
            const data=await response.json()
            if(response.status==200){
                setPostMessage(data.response)
                refreshFeed()
            }
           else{
            setPostMessage(data.response)
           }

        } catch (error) {
          console.log(error)  
        }
    }

    const deletePost=async(postId)=>{
      try {
        const res=await fetch(`http://localhost:5000/twizzy/posts/deletePost/${postId}`)
        if(res.status==200){
          // window.location.reload(false)//works well
        }
      } catch (error) {
        console.log(error)
      }
    }
    const likePost=async(postId,userId,like)=>{
      try {
        const res=await fetch(`http://localhost:5000/twizzy/posts/likePost`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({postId,userId,like})
        })
        if(res.status==200){
          // window.location.reload(false)//works well
        }
      } catch (error) {
        console.log(error)
      }
    }
   

    const getfeed=async()=>{
      try {
        const resp=await fetch("http://localhost:5000/twizzy/posts/getFeed")
        if(resp.status==200){
          const data=await resp.json();
          setFeed(data.response)

        }
        else{
          console.log("error in fetching the feed")
        }
      } catch (error) {
        console.log(error)
      }
    }

    const commentOnPost=async(userId,postId,comment)=>{
      try {
        const res=await fetch("http://localhost:5000/twizzy/posts/comment",{
          method:"POST",
          headers:{
             "Content-Type":"application/json"
          },
          body:JSON.stringify({userId,postId,comment})
        })

        if(res.status==200){

        }
      } catch (error) {
        
      }
    }


   

  return (
    <postContext.Provider  value={{
        uploadUserPost,
        postMessage,
        setPostMessage,
        feed,
        getfeed,
        deletePost,
        likePost,
        commentOnPost
    }}>
      {children}
    </postContext.Provider>
  )
}

export default PostContextProvider
