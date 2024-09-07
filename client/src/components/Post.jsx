import React from 'react'
import userdefault from "../assets/userdefault.png"
import image from "../assets/signup-2.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as liked } from '@fortawesome/free-solid-svg-icons'
import { faMessage, faSave, faHeart as like } from '@fortawesome/free-regular-svg-icons'

function Post() {

    const postobj = {
        image: userdefault,
        username: "@manish",

    }


    return (
        <div className='bg-white w-full h-[500px] rounded p-3 my-3'>
            <header className='flex items-center gap-2'>
                <img src={userdefault} alt="" className='h-10 w-10 rounded-full border border-slate-400' />
                <h1>username</h1>
            </header>
            <hr className='text-slate-400 mt-2' />
            <div id='post-content' className='flex flex-col justify-center items-center'>
                {/* //image if any */}
                <img src={image} alt="" className='w-[300px] h-[300px] border' />
                <p id='post-content'> ligendi ducimus impedit, sed consequuntur accusantium vitae ad voluptate debitis, ut fugiat excepturi, corporis numquam hic.</p>
            </div>
            <hr className='text-slate-400 mt-2' />
            <footer className='flex gap-10 items-center justify-center mt-7'>
                <div id='like' className='flex items-center gap-2'>
                    <FontAwesomeIcon icon={like} />
                    {/* <FontAwesomeIcon icon={liked}/> */}
                    <p>2.1k</p>
                </div>
                <div id='comment' className='flex items-center gap-2'>
                    <FontAwesomeIcon icon={faMessage} className='mt-1' />
                    <p>4.2k</p>
                </div>

                <div id='save' className='flex items-center gap-2'>
                    <FontAwesomeIcon icon={faSave} />
                    <p>200 saved</p>
                </div>
            </footer>
        </div>
    )
}

export default Post
