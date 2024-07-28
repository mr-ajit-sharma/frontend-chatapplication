import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useDispatch} from 'react-redux'
import { setAuthUser } from '../redux/userSlice'
const SignIn = () => {
  const [user, setUser] = useState({
    username: "",
    password: ""
  })
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      console.log("before connection with axios");
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/login`, user, { headers: { "Content-Type": "application/json" }, withCredentials: true })
      console.log(res, "after connection with axios");
      if (res.data.success) {
        navigate('/');
        toast.success(res.data.message)
      }
      console.log(res,"response from the signin")
      dispatch(setAuthUser(res.data))
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error,"error in server side from the client")
    }
    setUser({
      username: "",
      password: ""
    })
  }
  return (
    <div className='min-width-96 mx-auto'>
      <div className='w-full p-6 bg-gray-400 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl text-gray-300 text-bold text-center '>SignIn</h1>
        <form onSubmit={handleSubmit} action="">
          <div>
            <label className="p-2 label">
              <span className='text-base label-text'>Username</span>
            </label>
            <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} type="text" className='w-full input input-bordered h-10' placeholder='Enter your username' />
          </div>
          <div>
            <label className="p-2 label">
              <span className='text-base label-text'>Password</span>
            </label>
            <input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className='w-full input input-bordered h-10' placeholder='Enter your password' />
          </div>
          <div className='flex justify-around items-center my-4'>
            <p> Don't have an account?</p>
            <Link to='/signup' className='border border-slate-700 btn-outline rounded-lg'>
              Sign Up
            </Link>
          </div>
          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 border-slate-700 btn-outline'>Sign In</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn