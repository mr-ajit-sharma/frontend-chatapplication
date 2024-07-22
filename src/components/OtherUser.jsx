import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'

const OtherUser = ({ user }) => {
    const dispatch = useDispatch()
    const { selectedUser,onlineUsers } = useSelector(store => store.user)
const isOnline=onlineUsers?.includes(user._id)
    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user))
        console.log(user)
    }
    return (
        <>
            <div onClick={() => selectedUserHandler(user)} className={`${selectedUser?._id===user?._id ?'bg-zinc-200':""}flex items-center gap-2 hover:bg-zinc-300  rounded p-2 cursor-pointer`}>
                <div className={`avatar ${isOnline ?'online':' '} `}>
                    <div className="rounded-full w-12">
                        <img src={user?.profilephoto} className='' alt="" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex text-white justify-between hover:text-black gap-2'>
                        <p>{user?.fullname}</p>
                    </div>
                </div>
            </div>
            <div className="divider my-0 py-0 h-2"></div>

        </>
    )
}

export default OtherUser