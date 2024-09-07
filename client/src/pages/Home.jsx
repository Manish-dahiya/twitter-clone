import React from 'react'
import userdefault from "../assets/userdefault.png"
import Post from '../components/Post'

function Home() {
    const allPosts = [1, 2, 3, 4, 5, 6, 67, 7, 8, 8]
    const sponsors = [1, 2, 3, 4, 4, 5, 6, 7]
    const hashtags=["#TrainAccident","Javascript","#salman khan","#chota bheem","modi","melodi","india"]

    return (
        <div className='flex flex-wrap justify-center items-center h-screen w-full overflow-hidden  '>
            <div id='first' className='border bg-[#D2E0FB] w-[20%] h-full py-2'>

                <div id='profile ' className='flex flex-col justify-center items-center'>
                    <img src={userdefault} alt="" className='h-20 w-20 rounded-full' />
                    <h1 className='my-2'>username</h1>
                    <div className='flex gap-5 justify-center items-center'>
                        <div className='text-center'> <h1>1000</h1><span>posts</span></div>
                        <div className='text-center'> <h1>1000</h1><span>followers</span></div>
                        <div className='text-center'> <h1>1000</h1><span>following</span></div>
                    </div>
                </div>
                <hr className='text-slate-600 mt-10' />
                <div id='tabs ' className='flex flex-col  items-center my-10'>
                    <div className=' h-14 p-4 w-full hover:bg-slate-500'>Home</div>
                    <div className=' h-14 p-4 w-full  hover:bg-slate-500'>Trending</div>
                    <div className=' h-14 p-4 w-full  hover:bg-slate-500'>Message</div>
                    <div className=' h-14 p-4 w-full  hover:bg-slate-500'>Profile</div>

                </div>
                <div id='logout'>
                    <div className=' h-14 p-4 w-full hover:bg-slate-500'>Logout</div>
                </div>


            </div>
            {/* //middle part */}
            <div className='bg-[#8EACCD] w-[60%] h-full overflow-x-scroll scrollbar-hidden'>
                <header className='h-14 w-full bg-white flex justify-between items-center border p-2'>
                    <div>
                        <input type="text" name="search" placeholder='search anything' className='bg-transparent p-1 border rounded-sm w-64 outline-none border-slate-800 h-10' />
                        <button className='bg-sky-300 px-3 py-1 w-54 h-10 rounded-lg ms-2'>Search</button>
                    </div>
                    <button className='bg-red-300 px-3 py-1 w-54 h-10 rounded-lg'>Create post</button>
                </header>

                <div id='feed' className='mx-20 mt-10  h-full' >
                    {/* //posts will come here  */}
                    {allPosts.map((item, index) => (
                        <Post />
                    ))}
                </div>

            </div>
            <div id='last' className='bg-[#D2E0FB] w-[20%] h-full  flex flex-col justify-center items-center p-2'>
                <div id='sponsors' className='  '>
                    <h1>sponsors</h1>
                    <div className='overflow-y-scroll h-[400px]'>
                        {sponsors.map((item, index) => (
                            <div className='border h-52 w-52 bg-red-300'>

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
        </div>
    )
}

export default Home
