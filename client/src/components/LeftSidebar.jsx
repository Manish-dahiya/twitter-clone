import React, { useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import userdefault from "../assets/userdefault.png" 
import { userContext } from '../contexts/UserContextProvider'

function LeftSidebar({showLeftSidebar,setShowLeftSidebar,userProfileData}) {

    const {userId}=useContext(userContext)
  return (
    <>
    <div className='bg-black flex justify-between w-full p-3 '>
      <p>twizzy</p>
      <p onClick={()=>setShowLeftSidebar((prev)=>!prev)}>X</p>
    </div>

    <div id='profile ' className='flex flex-col justify-center items-center'>
                     { userProfileData.length>0?  <img    
                                    src={userProfileData[0].avatar
                                        ? `http://localhost:5000/avatar/${userProfileData[0].avatar}`
                                        : userdefault}
                                    alt="User Avatar"
                                    className='h-20 w-20 rounded-full object-cover object-center'
                                />
                                :<img src={userdefault} alt="" className='h-20 w-20 rounded-full' />
                    }
                    <h1 className='my-2'>{userProfileData.length>0 ? userProfileData[0].username:"username"}</h1>
                    <div className='flex gap-5 justify-center items-center'>
                        <div className='text-center'> <h1>{userProfileData.length>0 ? userProfileData[0].posts.length:"0"}</h1><span>posts</span></div>
                        <div className='text-center'> <h1>{userProfileData.length>0 ? userProfileData[0].followers.length:"0"}</h1><span>followers</span></div>
                        <div className='text-center'> <h1>{userProfileData.length>0 ? userProfileData[0].following.length:"0"}</h1><span>following</span></div>
                    </div>
                </div>
                <hr className=' border border-[#8eaccd] mt-10' />
                <div id='tabs ' className='flex flex-col  items-center my-10'>
                    <div className=' h-14 p-4 w-full border-b border-[#8eaccd] hover:bg-[#bac7e1c8]'>Home</div>
                    <div className=' h-14 p-4 w-full border-b border-[#8eaccd] hover:bg-[#bac7e1c8]'>Trending</div>
                    <div className=' h-14 p-4 w-full border-b border-[#8eaccd] hover:bg-[#bac7e1c8]'>Message</div>
                    <Link to={`/profile/${userId}`}  className=' h-14 p-4 w-full border-b border-[#8eaccd] hover:bg-[#bac7e1c8]'>Profile</Link>

                </div>
                <div id='logout'>
                    <div className=' h-14 p-4 w-full hover:bg-[#bac7e1c8] border-b border-[#8eaccd]'>Logout</div>
                </div>

    </>
  )
}

export default LeftSidebar
