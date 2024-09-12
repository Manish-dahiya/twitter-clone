import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { postContext } from '../contexts/PostContextProvider';
import { userContext } from '../contexts/UserContextProvider';

function CreatePostPopup({showPopup,setShowPopup,refreshFeed}) {

    const [postText,setPostText]=useState("")
    const [postImg,setPostImg]=useState("")
    const ref=useRef(null)
    const {uploadUserPost,postMessage,setPostMessage}=useContext(postContext)
    const {userId}=useContext(userContext)

    const handleChange=(e)=>{
        setPostText(e.target.value);
    }
    const handleInputRef=()=>{
        ref.current.click();
    }

    const handleUploadPost=()=>{
        const postData=new FormData();
        postData.append("user",userId)
        postData.append("text",postText)
        postData.append("image",postImg);

        if(!userId || postText.length==0 ){
            setPostMessage("write something first")
        }
        else{
            uploadUserPost(postData,refreshFeed)
            setShowPopup(false)
        }

    }
    useEffect(()=>{console.log(userId)},[])


    useEffect(()=>{
        setPostMessage(postMessage)
        setTimeout(()=>{
            setPostMessage("")
        },3000)
    },[postMessage])

  return (
    <div className='bg-black/40  fixed h-full w-full flex justify-center items-center'>
        <div className='bg-neutral-300 p-5  w-[500px] rounded-lg '>
            <header className='flex justify-between items-center mb-4'>
                <h1 className='font-bold'>Create a twizzy</h1>
                <h1 onClick={()=>setShowPopup(false)} className='font-bold cursor-pointer text-red-300'>X</h1>
            </header>

            <div>
                <textarea type="text" name="text" value={postText} onChange={handleChange} placeholder="what's in your mind ?" className='border h-[300px] w-full bg-transparent outline-none p-1'/>
                <input ref={ref} type="file" className='hidden'   name="image" onChange={(e)=>setPostImg(e.target.files[0])} />
                <FontAwesomeIcon icon={faImage} onClick={handleInputRef}/>
            </div>

            <footer className='flex justify-end gap-2 items-center'>
                <button className='bg-blue-400 h-10 px-3  rounded-lg ' onClick={handleUploadPost}>Post</button>
                <button className='bg-red-300 h-10 px-3  rounded-lg ' onClick={()=>setShowPopup(false)}>cancel</button>
            </footer>
            <div>{postMessage}</div>
        </div>
    </div>
  )
}

export default CreatePostPopup
