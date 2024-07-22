
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector(store => store.socket);
    const messages = useSelector(store => store.message);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket) return; // Return if socket is not available
        const handleNewMessage = (newMessage) => {
            dispatch(setMessages((prevMessages) => [...prevMessages, newMessage]));
        };
        socket.on('newMessage', handleNewMessage);
        
        return () => {
            socket.off('newMessage', handleNewMessage); // Cleanup on unmount
        };
    }, [socket, dispatch]);
};

export default useGetRealTimeMessage;
