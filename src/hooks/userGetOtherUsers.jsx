import { useEffect } from "react"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setOtherUsers } from "../redux/userSlice.js"

const userGetOtherUsers = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                // const URL=`"https://heychatme.onrender.com" || "http://localhost:5173"`
                axios.defaults.withCredentials = true
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user`);
                console.log(res,"get other users")
                dispatch(setOtherUsers(res.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchOtherUsers()
    }, [])
}
export default userGetOtherUsers