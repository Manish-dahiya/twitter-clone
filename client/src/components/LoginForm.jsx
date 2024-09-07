import React, { useState } from 'react'
import signup_1 from "../assets/signup-1.jpg"
import signup_2 from "../assets/signup-2.jpg"


function LoginForm({
    // isLoginIn=true
}) {

    const [isLoginIn, setIsLogin] = useState(true);


    return (
        <div className='bg-[#d2cfdf] h-screen w-full flex justify-center items-center'>
            <div className='bg-slate-400 h-[600px] w-[1000px] flex  justify-center items-center'>
                <div id='form' className={` border h-full w-full flex justify-center items-center flex-col ${!isLoginIn && "order-2"}`}>
                    {<div className='text-2xl font-semibold'>{isLoginIn ? "Welcome Back" : "welcome"}</div>}
                    {<div className='mt-2'>please {isLoginIn ? "Login" : "Register"} to coninue.</div>}

                    <div id='inputs'>
                        {!isLoginIn &&<input type="text" name="username" placeholder='enter your username'  className='mt-5 border-slate-800 border-b outline-none h-10 w-64 bg-transparent' />}<br></br>
                        <input type="email" name="email" placeholder='enter your email '  className='mt-5 border-slate-800 border-b outline-none h-10 w-64 bg-transparent' /><br></br>
                        <input type="password" name="password" placeholder='password'  className='mt-5 border-slate-800 border-b outline-none h-10 w-64 bg-transparent'  /><br></br>
                    </div>

                    <div id='button' className='mt-4 text-center'>
                        {isLoginIn ?<button className='bg-blue-500 h-10 py-1 px-2 rounded'>Login</button>:<button className='bg-blue-500 h-10 py-1 px-2 rounded'>Register</button>}
                        <p onClick={()=>setIsLogin(!isLoginIn)} className='cursor-pointer  text-xl mt-1 text-blue-500'>{isLoginIn?"create new account":"already have an account ?"}</p>
                    </div>

                </div>
                <div id='image' className={`bg-pink h-full flex justify-center items-center w-full ${!isLoginIn && "order-1"}`}>
                   <img src={isLoginIn?signup_1:signup_2} alt=""  className='h-full w-full'/>
                </div>
            </div>

        </div>
    )
}

export default LoginForm
