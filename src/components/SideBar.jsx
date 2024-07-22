import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import toast from 'react-hot-toast'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';
import { MainUrl } from '../constant';
const SideBar = () => {
    const [search, setSearch] = useState('')
    const { otherUsers, } = useSelector(store => store.user)
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${MainUrl}/api/v1/user/logout`)
            navigate('/signin')
            toast.success(res.data.message)
            dispatch(setAuthUser(null))
            // console.log(res,"logout")
        } catch (error) {
            toast.error("error in the logout")
            console.log(error)
        }
    }
    const searchHandler = (e) => {
        e.preventDefault()
        const trimmedResult=search.trim().toLowerCase()
        if(trimmedResult===""){
            dispatch(setOtherUsers(otherUsers))
        }else{
            const searchTerm=trimmedResult.split(/\s+/);
            const searchedUser=otherUsers.filter(user=>{
                return searchTerm.every(term=>{
                    return user.fullname.toLowerCase().includes(term)
                })
            })
            if(searchedUser.length>0){
                dispatch(setOtherUsers(searchedUser))
            }else{
                dispatch(setOtherUsers([]))
                toast.error("user not found")
            }
        }
        }
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <form action="" onSubmit={searchHandler} className='flex items-center gap-2'>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='input input-bordered rounded-md' placeholder='....search' />
                <button type='submit' className='btn cursor-pointer bg-zinc-500 text-blue-900'><BiSearchAlt2 className='outline-none w-6 h-6 text-white' /></button>
            </form>
            <div className="divider p-4"></div>
            <OtherUsers />
            <div className='mt-2 '>
                <button onClick={logoutHandler} className='btn hover:bg-black hover:text-white'>Log Out</button>
            </div>
        </div>
    )
}

export default SideBar