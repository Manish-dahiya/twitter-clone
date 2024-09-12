import React, { useContext, useEffect, useRef, useState } from 'react'
import userdefault from "../assets/userdefault.png"
import postimg from "../assets/signup-2.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faHeart as liked } from '@fortawesome/free-solid-svg-icons'
import { faMessage, faSave, faHeart as like } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import { postContext } from '../contexts/PostContextProvider'
import { userContext } from '../contexts/UserContextProvider'
import CreatePostPopup from './CreatePostPopup'
import { decodeToken } from '../helpers/helper'

function Post({ post, location, refreshFeed }) {

    const [showDelete, setShowDelete] = useState(false)
    const { deletePost, likePost, commentOnPost } = useContext(postContext)
    const { userId } = useContext(userContext)
    const [isLiked, setIsLiked] = useState(post?.likes.includes(userId))
    const [showCommentPopup, setShowCommentPopup] = useState(false)
    const [comment, setComment] = useState("")

    const handleDeletePost = (id) => {
        deletePost(id)
        refreshFeed()
    }

    const handleLike = () => {
        likePost(post?._id, userId, true)

        refreshFeed()
        setIsLiked(true)
    }
    const handleUnlike = () => {
        likePost(post?._id, userId, false)
        refreshFeed()//to update the cnt of likes
        setIsLiked(false)
    }

    const handleComment = () => {
        commentOnPost(userId, post?._id, comment)
        setShowCommentPopup(false)
        refreshFeed()
    }

    useEffect(() => { 
        // console.log(post?.comments[0]?.user.username)
     }, [])

    return (
        <>
            <div className={`bg-white w-[100%]] rounded p-3 border  `}>{/* h-[65%] */}
                <header className='flex  justify-between gap-2 relative'>
                    <div>
                        <img src={userdefault} alt="" className='h-10 w-10 rounded-full border border-slate-400' />
                        <Link to={`/profile/${post?.user?._id}`} className='hover:text-blue-500'>{post?.user?.username}</Link>
                    </div>

                    {post?.user?._id==userId && <FontAwesomeIcon icon={faEllipsis} className='cursor-pointer ' onClick={() => setShowDelete(!showDelete)} />}
                    <div className='absolute right-0 top-4 bg-cyan-300 rounded-lg'>
                        {showDelete && <button className='px-2 py-1 rounded-lg' onClick={() => handleDeletePost(post?._id)}>delete</button>}
                    </div>

                </header>
                <hr className='text-slate-400 mt-2' />
                <div id='post-content' className='flex flex-col  justify-center items-center'>
                    {/* //image if any */}
                    {post?.image && <img src={post?.image ? `http://localhost:5000/post/${post.image}` : postimg} alt="" className='w-[100%] h-[300px] border' />}
                    <p id='post-content'> {post?.text.slice(0, 500)}</p>
                </div>
                <hr className='text-slate-400 mt-2' />
                <footer className='flex gap-10 items-center justify-center mt-7'>
                    <div id='like' className='flex items-center gap-2'>
                        {!isLiked ? <FontAwesomeIcon icon={like} onClick={handleLike} />
                            : <FontAwesomeIcon icon={liked} fill='red' color='red' onClick={handleUnlike} />}
                        <p>{post?.likes?.length}</p>
                    </div>
                    <div id='comment' className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faMessage} className='mt-1' onClick={() => setShowCommentPopup(!showCommentPopup)} />
                        <p onClick={() => setShowCommentPopup(!showCommentPopup)}>{post?.comments?.length}</p>
                    </div>

                    <div id='save' className='flex items-center gap-2'>
                        <FontAwesomeIcon icon={faSave} />
                        <p>200 saved</p>
                    </div>

                </footer>
                <div id='comment'>
                    {showCommentPopup &&
                        <div className=' '>
                            
                            <textarea type="text" value={comment} onChange={(e) => setComment(e.target.value)} className='border  outline-none w-full h-[70%]' placeholder='comment' ></textarea>
                            <button className='bg-sky-300 px-2 rounded-lg ' onClick={handleComment} >comment</button>
                            <div className=' m-2'>
                                comments
                                {post?.comments.map((item, index) => {
                                   return  (
                                    <>
                                        <p>@{item.user.username}</p>
                                        <p className='h-5  text-slate-500'>{item.text}</p>
                                        <hr />
                                    </>
                                   )
                                })}
                            </div>
                           
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Post
