import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'
const MessageContainer = () => {
    const { selectedUser,authUser,onlineUsers } = useSelector(store => store.user)
    const isOnline=onlineUsers?.includes(selectedUser?._id)
    const dispatch = useDispatch()
    useEffect(() => {
        return () => (dispatch(setSelectedUser(null)))
    }, [])
    return (
        <>
            {selectedUser !== null ? (
                <div className='md:min-w-[550px] flex flex-col '>
                    <div className='flex items-center gap-2 text-white px-4 py-2 mb-2 bg-zinc-400'>
                        <div className={`avatar ${isOnline?'online':''}`}>
                            <div className="rounded-full w-12">
                                <img src={selectedUser?.profilephoto} className='' alt="" />
                            </div>
                        </div>
                        <div className='flex flex-col flex-1'>
                            <div className='flex justify-between gap-2'>
                                <p>{selectedUser?.fullname}</p>
                            </div>
                        </div>
                    </div>
                    <Messages />

                    <SendInput />
                </div>
            ) : (
                <div className='md:min-w-[550px] flex flex-col items-center justify-center'>
                    <h1 className=' text-white text-4xl font-bold'>Hi...., {authUser?.fullname.toUpperCase()}</h1>
                    <h1 className='text-white text-2xl'>Let's start conversation</h1>

                </div>
            )}
        </>
    )
}

export default MessageContainer