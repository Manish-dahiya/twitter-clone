import React, { useContext, useEffect, useState } from 'react'
import signup_1 from "../assets/signup-1.jpg"
import signup_2 from "../assets/signup-2.jpg"
import { userContext } from '../contexts/UserContextProvider'
import userdefault from "../assets/userdefault.png"

function LoginForm({
    // isLoginIn=true
}) {

    const init={
        username:"",
        email:"",
        password:""
    }
    const [formData,setFormData]=useState(init)
    const [isLoginIn, setIsLogin] = useState(true);
    const {loginUser,responseMessage,setResponseMessage,registerUser}=useContext(userContext)

    const handleChange=(e)=>{
        const {name,value}=e.target;

        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const handleLogin=()=>{
        if(formData.email.length==0 || formData.password.length==0){
            setResponseMessage("fill in the fields first")
        }
        else{
            loginUser({email:formData.email,password:formData.password});
           
        }
    }
    const handleSignup=()=>{
        if(formData.email.length==0 || formData.password.length==0 || formData.username.length==0){
            setResponseMessage("fill in the fields first")
        }
        else{
            const signupData= new FormData();
            signupData.append("username",formData.username)
            signupData.append("email",formData.email)
            signupData.append("password",formData.password)
            signupData.append("avatar",userdefault)
            registerUser(signupData);
            
        }
    }



    useEffect(()=>{
        setResponseMessage(responseMessage)
        setTimeout(()=>{
            setResponseMessage("")
        },3000)
    },[responseMessage])


    return (
        <div className='bg-[#d2cfdf] h-screen w-full flex justify-center items-center'>
            <div className='bg-slate-200 h-[600px] w-[1000px] flex  justify-center items-center'>
                <div id='form' className={` border h-full w-full flex justify-center items-center flex-col ${!isLoginIn && "order-2"}`}>
                    {<div className='text-2xl font-semibold'>{isLoginIn ? "Welcome Back" : "welcome"}</div>}
                    {<div className='mt-2'>please {isLoginIn ? "Login" : "Register"} to coninue.</div>}

                    <div id='inputs'>
                        {!isLoginIn &&<input type="text" name="username" value={formData.username} onChange={handleChange} placeholder='enter your username'  className='mt-5 border-slate-800 border-b outline-none h-10 w-64 bg-transparent' />}<br></br>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}  placeholder='enter your email '  className='mt-5 border-slate-800 border-b outline-none h-10 w-64 bg-transparent' /><br></br>
                        <input type="password" name="password" value={formData.password} onChange={handleChange}  placeholder='password'  className='mt-5 border-slate-800 border-b outline-none h-10 w-64 bg-transparent'  /><br></br>
                    </div>

                    <div id='button' className='mt-4 text-center'>
                        {isLoginIn ?<button className='bg-blue-500 h-10 py-1 px-2 rounded' onClick={(handleLogin)}>Login</button>:<button className='bg-blue-500 h-10 py-1 px-2 rounded' onClick={handleSignup}>Register</button>}
                        <p onClick={()=>setIsLogin(!isLoginIn)} className='cursor-pointer  text-xl mt-1 text-blue-500'>{isLoginIn?"create new account":"already have an account ?"}</p>
                    </div>
                <div>{responseMessage}</div>
                </div>
                <div id='image' className={`bg-pink h-full flex justify-center items-center w-full ${!isLoginIn && "order-1"}`}>
                   <img src={isLoginIn?signup_1:signup_2} alt=""  className='h-full w-full'/>
                </div>
            </div>

        </div>
    )
}

export default LoginForm
