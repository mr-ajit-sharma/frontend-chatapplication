import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/messageSlice"

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user)
    const dispatch=useDispatch()
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/message/${selectedUser._id}`)
                console.log(res, "get message....///")
                dispatch(setMessages(res.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchMessages()
    }, [selectedUser._id,setMessages])
}

export default useGetMessages
