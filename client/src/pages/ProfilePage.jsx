import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { userContext } from '../contexts/UserContextProvider'
import deafaultUser from "../assets/userdefault.png"
import Post from '../components/Post'
import UpdateProfilePopup from '../components/UpdateProfilePopup'

function ProfilePage() {
    const { userId } = useParams();
    const { getUserProfile, userProfileData, followUnfollow } = useContext(userContext);
    const [showUpdatePopup, setShowUpdatePopup] = useState(false)
    const [tab, setTab] = useState(0)// 0->posts 1->followers 2->following

    const { userId: loggedInUserId } = useContext(userContext)
    const [followers,setFollowers]=useState([])
    const [following,setFollowing]=useState([])
    const [isFollow,setIsFollow]=useState( false)


    const arr=[1,2,3,44,56,6,7,8,89,9,9,9,0,0]

    useEffect(() => {
        getUserProfile(userId);
    }, [userId, getUserProfile]);

    useEffect(() => {
        // Update isFollow based on whether the logged-in user is in the followers list
        if (userProfileData.length > 0) {
            setIsFollow(userProfileData[0].followers.includes(loggedInUserId));
        }
    }, [userProfileData, loggedInUserId]);

    const handleFollow = (userId) => {
        const obj = {
            userId: userId,
            followerId: loggedInUserId,
            follow: true
        }
        followUnfollow(obj)
        setIsFollow(true)
    }

    const handleUnfollow = (followerid) => {
        const obj = {
            userId: userId,
            followerId: followerid,
            follow: false
        }
        followUnfollow(obj)
        setIsFollow(false)
    }


    const getfollowers=async ()=>{
        const response=await fetch(`http://localhost:5000/twizzy/users/getfollowers/${userId}`)
        const data=await response.json();
        if(response.status==200){
            setFollowers(data.response)
        }
        else {
            console.log("error")
        }
    }
    const getfollowing=async ()=>{
        const response=await fetch(`http://localhost:5000/twizzy/users/getfollowing/${userId}`)
        const data=await response.json();
        if(response.status==200){
            setFollowers(data.response)
        }
        else {
            console.log("error")
        }
    }

    return (
        <div className='h-screen w-full p-3 flex justify-center items-center'>
            
            <div className='border border-slate-600 h-full   w-[1000px] overflow-hidden'>
            <Link to={"/"} className='outline-none bg-red-300 rounded-b px-3 py-1 '>Home</Link>
                
                <div id='profileInfo' className='h-[40%] w-full border-b  flex flex-col justify-center items-center p-3'>
                    {
                        userProfileData.length > 0 ? (
                            <>
                                <img
                                    src={userProfileData[0].avatar
                                        ? `http://localhost:5000/avatar/${userProfileData[0].avatar}`
                                        : deafaultUser}
                                    alt="User Avatar"
                                    className='h-20 w-20 rounded-full'
                                />
                                <h1>{userProfileData[0].username}</h1>
                                <div id='followersDiv' className='h-16 w-64 mt-2 rounded-lg border flex gap-3 justify-center items-center p-2'>
                                    <div className='text-center'>
                                        <h1>{userProfileData[0].followers.length}</h1>
                                        <span>Followers</span>
                                    </div>
                                    <div className='text-center'>
                                        <h1>{userProfileData[0].following.length}</h1>
                                        <span>Following</span>
                                    </div>
                                    <div className='text-center'>
                                        <h1>{userProfileData[0].posts.length}</h1>
                                        <span>Posts</span>
                                    </div>
                                </div>
                                <div id='editProfile' className='mt-2'>
                                    {userId == loggedInUserId ? <button className='bg-red-300 h-10 px-3 py-1 rounded-lg' onClick={() => setShowUpdatePopup(!showUpdatePopup)}>Edit Profile</button>
                                        : <div>
                                            <>
                                                {
                                                   isFollow ? <button className='bg-cyan-300 px-3 py-1 rounded-lg h-10' onClick={()=>handleUnfollow(loggedInUserId)}>Unfollow</button>
                                                        : <button className='bg-cyan-300 px-3 py-1 rounded-lg h-10' onClick={()=>handleFollow(userId)}>follow</button>

                                                }
                                            </>
                                        </div>
                                    }                                </div>

                            </>
                        ) : ""
                    }
                </div>

                <div className='overflow-y-scroll h-full'>
                    <div className='w-full flex items-center justify-between px-24 '>
                        <button onClick={()=>setTab(0)}>posts</button>
                        <button onClick={() => { getfollowers(); setTab(1); }}>followers</button>
                        <button onClick={() => {getfollowing(); setTab(2);  }}>following</button>
                    </div>

                    {
                        tab == 0 ? <div id='posts' className='overflow-y-scroll h-[60%] '>
                            {
                                userProfileData.length > 0 && (
                                    <div className='  p-2 flex flex-wrap flex-row gap-3'>
                                        {
                                            userProfileData[0].posts.map((item, index) => (
                                                <div className='h-[465px] w-[300px] '>
                                                    <Post key={index} post={item} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>

                            : tab == 1 ? 
                            <div id='followers' className='flex flex-col gap-2 items-center justify-center overflow-y-scroll'>
                                {
                                    followers?.length>0? followers?.map((item,index)=>{
                                        return <Link to={`/profile/${item._id}`} key={index} className='w-96 border h-[49px] flex justify-between items-center rounded-lg p-2 bg-slate-300'>
                                            {item.username}
                                        </Link>
                                    })
                                    :<div className='mt-10'>No followers</div>
                                
                                }
                            </div>

                                : <div className='flex flex-col items-center justify-center overflow-y-scroll'>
                                 {
                                    following?.length>0 ? following?.map((item,index)=>{
                                        return <Link to={`/profile/${item._id}`} key={index} className=''>
                                            {item.username}
                                        </Link>
                                    })
                                    :<div className='mt-10'> No following</div>
                                }
                                </div>

                    }
                </div>

            </div>
            <>
                {showUpdatePopup && <UpdateProfilePopup showUpdatePopup={showUpdatePopup} setShowUpdatePopup={setShowUpdatePopup} userProfileData={userProfileData} />}
            </>
        </div>
    );
}

export default ProfilePage
{/* //{ */ }
//     "data": [
//       {
//         "_id": "66dc12f1df119c450276345d",
//         "username": "manish",
//         "email": "manish@gmail.com",
//         "password": "$2b$10$7LcXH5ZYr94135ZMMhjXuOisBB3xYgaFMDbo3i//b4.LZoVvATp4S",
//         "avatar": null,
//         "following": [],
//         "followers": [],
//         "posts": [
//           {
//             "_id": "66decd08aa2b7fd10b22f9eb",
//             "user": "66dc12f1df119c450276345d",
//             "image": null,
//             "text": "manish post is always nice ",
//             "likes": [],
//             "comments": [],
//             "__v": 0
//           }
//         ],
//         "__v": 0
//       }
//     ]
//   }
