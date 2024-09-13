import React, { useContext, useEffect, useState } from 'react'
import userdefault from "../assets/userdefault.png"
import Post from '../components/Post'
import CreatePostPopup from '../components/CreatePostPopup'
import { Link } from 'react-router-dom'
import { decodeToken } from '../helpers/helper'
import { postContext } from '../contexts/PostContextProvider'
import { userContext } from '../contexts/UserContextProvider'

function Home() {
    const sponsors = [1, 2, 3, 4, 4, 5, 6, 7]
    const hashtags=["#TrainAccident","Javascript","#salman khan","#chota bheem","modi","melodi","india"]

    const [showPopup,setShowPopup]=useState(false);
    const token=localStorage.getItem("token")
    const [userId,setUserId]=useState(decodeToken(token))//it will return you the id
    const { getUserProfile, userProfileData,getAllUsers,allUsers } = useContext(userContext);
    
    const {feed,getfeed}=useContext(postContext)
    const [allposts,setallPosts]=useState([])
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(()=>{
        setUserId(decodeToken(localStorage.getItem("token")))
    },[localStorage.getItem("token")])

    useEffect(()=>{
        getfeed()  
        getUserProfile(userId)
        getAllUsers()
    },[])

  

    useEffect(()=>{
        setallPosts(feed);
    },[feed,allposts])

    const refreshFeed=()=>{
        getfeed();
    }

    const handleSearch=(e)=>{
        if (searchQuery === "") {
            // Reset to the full feed if search query is empty
            setallPosts(feed);
          } else {
            // Filter posts based on search query
            const newArr = feed.filter((item) =>
              item.text.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setallPosts(newArr);
          }
    }




    return (
        <div className='md:flex flex-wrap justify-center items-center h-screen w-full overflow-hidden  '>
            <div id='first' className= 'hidden  md:block border bg-[#D2E0FB] w-[20%] h-full py-2'>

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


            </div>
            {/* //middle part */}
            <div className='bg-[#8EACCD]  w-[100%] md:w-[60%] h-full overflow-x-scroll scrollbar-hidden'>
                <header className='h-14 w-full bg-[#D2E0FB] flex  gap-2 items-center border p-2 rounded-b-lg'>
                    <p className='md:hidden'> &#9776;</p>
                    <div>
                        <input type="text" name="search" value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value); handleSearch();}} placeholder='search anything' className='bg-transparent p-1 border rounded-lg w-64 outline-none border-slate-800 h-10' />
                    </div>
                    <button className='bg-red-300 px-1 text-sm md:text-xl py-1 w-54 h-10 rounded-lg' onClick={()=>setShowPopup(true)}>Create post</button>
                </header>

                <div id='feed' className='mt-10 mx-20  h-full' >
                    {/* //posts will come here  */}
                    {allposts.length>0 && allposts.map((item, index) => (
                        <>
                        <Post post={item} refreshFeed={refreshFeed} location="home"/>
                        <br />
                        </>
                    ))}
                </div>

            </div>
            <div id='last' className='hidden bg-[#D2E0FB] w-[20%] h-full  md:flex flex-col justify-center items-center p-2'>
                <div id='sponsors' className='  '>
                    <h1 className='font-bold text-2xl'>Our Users</h1>
                    <div className='overflow-y-scroll h-[400px] '>
                        {allUsers?.map((item, index) => (
                            <div className='border h-10 w-52 bg-[#8EACCD] flex items-center p-2 rounded-lg'>
                                <Link to={`/profile/${item._id}`} className='hover:text-blue-500'>@{item.username}</Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-4 border rounded-xl  overflow-y-scroll h-[400px] '>
                    <h1 className='font-bold text-2xl'>What's happening ?</h1>
                    <div className=''>
                        {hashtags.map((item,index)=>(
                            <div key={index} className='border-b  h-10 w-full p-2'>{item}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* //popup here  */}
            {showPopup && <CreatePostPopup showPopup={showPopup} setShowPopup={setShowPopup} refreshFeed={refreshFeed} />}
        </div>
    )
}

export default Home
