
import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../helpers/helper';


export const userContext = createContext()


function UserContextProvider({ children }) {

    const navigate = useNavigate()
    const [responseMessage, setResponseMessage] = useState("")
    const [userId, setUserId] = useState(null)
    const [userProfileData, setUserProfileData] = useState([])

    const loginUser = async (formData) => {
        try {
            const response = await fetch("http://localhost:5000/twizzy/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            if (response.status == 200) {
                const data = await response.json()
                setResponseMessage(data.response)

                localStorage.setItem("token", data.token)
                navigate("/")
            }
            else {
                const data = await response.json()
                setResponseMessage(data.response)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const registerUser = async (formData) => {
        try {
            const response = await fetch("http://localhost:5000/twizzy/users/signup", {
                method: "POST",
                body: formData//since we are sending the img and text
            })


            if (response.status == 200) {
                const data = await response.json()
                setResponseMessage(data.response)
                setResponseMessage(data.response)

                localStorage.setItem("token", data.token)
                navigate("/")
            }
            else {
                const data = await response.json()
                console.log(data)
                setResponseMessage(data.response)
            }
        } catch (error) {
            console.log(error)
        }
    }


    //user profile page
    const getUserProfile = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/twizzy/users/getUserProfile/${userId}`)

            const data = await response.json();
            if (response.status == 200) {
                setUserProfileData(data.response);
            }
            else {
                console.log("error in fetching profile please go back and refresh")
            }
        } catch (error) {
            console.log(error)
        }

    }

    const editUserProfile = async (formData,setShowUpdatePopup) => {
        try {
            const response = await fetch(`http://localhost:5000/twizzy/users/editProfile`, {
                method: "POST",
                body: formData
            })
            const data =await  response.json()
            if (response.status == 200) {
                setResponseMessage(data.response)
                setShowUpdatePopup(false)
            }
            else {

                setResponseMessage(data.response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const followUnfollow=async(obj)=>{
        try {
            const res=await fetch("http://localhost:5000/twizzy/users/followUnfollow",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(obj)
            })
            const data=await res.json()
           

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        const token = localStorage.getItem("token")
        const decodedTokenId = decodeToken(token)
        if (decodedTokenId) {
            setUserId(decodedTokenId)
        }
    }, [localStorage.getItem("token")])

    return (
        <userContext.Provider value={{
            loginUser,
            responseMessage,
            setResponseMessage,
            registerUser,
            userId,
            setUserId,
            getUserProfile,
            userProfileData,
            editUserProfile,
            followUnfollow
        }}>
            {children}
        </userContext.Provider>
    )
}

export default UserContextProvider

