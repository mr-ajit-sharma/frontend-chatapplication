import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser,selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
        
    }, [message]);


    return (
        <div className={`overflow-auto`}>
            <div ref={scroll} className={`chat ${message?.senderId===authUser?._id ?  'chat-end': 'chat-start'}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Avatar" src={message.senderId===authUser?._id?authUser?.profilePhoto:selectedUser?.profilephoto} />
                    </div>
                </div>
                <div className="chat-header">
                    <time className="text-xs text-black opacity-50">{new Date(message.createdAt).toLocaleTimeString()}</time>
                </div>
                <div className="chat-bubble">{message?.message}</div>
                <div className="chat-footer opacity-50 text-black">
                    Delivered
                </div>
            </div>
        </div>
    );
};

export default Message;
