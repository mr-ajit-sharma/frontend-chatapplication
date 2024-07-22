import axios from 'axios';
import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import { MainUrl } from '../constant';
const SendInput = () => {
    const [message,setMessage]=useState("")
    const {selectedUser}=useSelector(store=>store.user)
    const {messages}=useSelector(store=>store.message)
    const dispatch=useDispatch()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const res=await axios.post(`${MainUrl}/api/v1/message/send/${selectedUser._id}`,{message},{headers:{'Content-Type':'application/json'},withCredentials:true})
            console.log(res,"sended message");
            dispatch(setMessages([...messages,res?.data?.newMessage]))
        } catch (error) {
            console.log(error,'error in send input')
        }
        setMessage("")
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit} className='px-4 my-3'>
                <div  className=' w-full relative'>
                    <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='text something.......' className=' p-3 border border-zinc-500 text-sm rounded-lg block w-full bg-gray-600 text-white' />
                    <button type='submit' className=' absolute flex inset-y-0 end-0 cursor-pointer items-center pr-4'><IoSend /></button>
                </div>
            </form>
        </div>
    )
}

export default SendInput