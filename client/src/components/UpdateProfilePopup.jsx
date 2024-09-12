import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import defaultUser from "../assets/userdefault.png"
import { userContext } from '../contexts/UserContextProvider'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
function UpdateProfilePopup({ showUpdatePopup, setShowUpdatePopup, userProfileData }) {

    const [username, setUsername] = useState(userProfileData[0].username)
    const [avatar, setavatar] = useState("")
    const { editUserProfile, responseMessage, setResponseMessage } = useContext(userContext)
    const ref=useRef()
    const {userId}=useParams()
    const handleChange = (e) => {
        setUsername(e.target.value)
    }

    const handleEdit = () => {
        if (username.length > 0 || avatar.length > 0) {
            const formdata = new FormData()
            formdata.append("id",userId)
            formdata.append("username", username)
            formdata.append("avatar", avatar)
            editUserProfile(formdata,setShowUpdatePopup)
        }
        else {
            setResponseMessage("you have not updated anything")
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setResponseMessage("")
        }, 3000);
    }, [responseMessage])

    return (
        <div className='h-screen w-screen bg-black/40 flex justify-center items-center fixed' >
            <div id='popup-div' className='h-[45%] w-[25%] rounded-lg p-3 bg-white'>
                <header className='flex justify-between font-bold '>
                    <p>Update Profile</p>
                    <p onClick={() => setShowUpdatePopup((prev) => !prev)} className='cursor-pointer'>X</p>
                </header>

                <div className='flex flex-col justify-center items-center my-2'>
                    <img
                        src={userProfileData[0].avatar
                            ? `http://localhost:5000/avatar/${userProfileData[0].avatar}`
                            : defaultUser}
                        alt="User Avatar"
                        className='h-20 w-20 rounded-full'
                    />
                    
                    <div className='my-3 '>
                        <label htmlFor="name" className='text-2xl'>Username</label><br />
                        <input type="text" name="username" value={username} onChange={handleChange} className='border outline-none p-1 h-9 rounded bg-transparent w-full ' /><br />
                    </div>
                    <div  className='text-2xl me-7'>
                        <label htmlFor="avatar">Edit avatar</label>
                        <FontAwesomeIcon icon={faUserEdit} onClick={()=>ref.current.click()}  className='ms-3'/>
                        <input type="file" hidden ref={ref} onChange={(e) => setavatar(e.target.files[0])} /><br />
                    </div>
                </div>

                    <button className='bg-red-300 px-3 py-1 rounded-lg mt-4 ' onClick={handleEdit}>Edit </button>
                    <p>{responseMessage}</p>
                <div>

                </div>

            </div>
        </div>
    )
}

export default UpdateProfilePopup
