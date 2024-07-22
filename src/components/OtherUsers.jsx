import React from 'react'
import OtherUser from './OtherUser'
import userGetOtherUsers from '../hooks/userGetOtherUsers'
import { useSelector } from 'react-redux'

const OtherUsers = () => {
    userGetOtherUsers()//custome hook
    const { otherUsers } = useSelector(store => store.user)
    console.log(otherUsers, "othersusers .....")
    if (!otherUsers) return;//early return
    return (
        <div className='overflow-auto flex-1'>
            {console.log(OtherUsers,"hello otherusers/....")}
            {otherUsers?.map((user) => {
                return <OtherUser key={user._id} user={user} />
            })}
        </div>
    )
}

export default OtherUsers