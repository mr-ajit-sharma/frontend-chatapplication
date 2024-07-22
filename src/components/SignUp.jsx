import React, { useState} from 'react'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { MainUrl } from '../constant'
const SignUp = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  })
  const handleCheckedBox = (gender) => {
    setUser({ ...user, gender })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log("before connection with axios");
      const res = await axios.post(`${MainUrl}/api/v1/user/register`, user, { headers: { "Content-Type": "application/json" }, withCredentials: true })
      console.log(res, "after connection with axios");
      if (res.data.success) {
        navigate('/signin');
        toast.success(res.data.message)
      }
      console.log(res,"response from signup")
    } catch (error) {
      toast.error(error.response.data.message)
      console.log("error in server side from the client")
    }
    setUser({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: ""
    })
    console.log(user)
  }

  return (
    <div className='min-width-96 mx-auto'>
      <div className='w-full p-6 bg-gray-400 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl text-gray-300 text-bold text-center '>SignUp</h1>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label className="p-2 label">
              <span className='text-base label-text'>Full name</span>
            </label>
            <input value={user.fullname} onChange={(e) => setUser({ ...user, fullname: e.target.value })} type="text" className='w-full input input-bordered h-10' placeholder='Enter your name' />
          </div>
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
            <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" className='w-full input input-bordered h-10' placeholder='Enter your password' />
          </div>
          <div>
            <label className="p-2 label">
              <span className='text-base label-text'>Confirm password</span>
            </label>
            <input value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} type="password" className='w-full input input-bordered h-10' placeholder='confirm your password' />
          </div>
          <div className=' flex justify-around my-4'>
            <div className='flex items-center'>
              <p>Male</p>
              <input checked={user.gender === "male"} onChange={() => handleCheckedBox("male")} type="checkbox" defaultChecked className="checkbox mx-2 border border-blue-400" />
            </div>
            <div className='flex items-center'>
              <p>Female</p>
              <input checked={user.gender === "female"} onChange={() => handleCheckedBox("female")} type="checkbox" defaultChecked className="checkbox mx-2 border-blue-400" />
            </div>
          </div>
          <div className='flex justify-around items-center my-4'>
            <p> Already have an account?</p>
            <Link to='/signin' className='border border-slate-700 btn-outline rounded-lg'>
              Sign In
            </Link>
          </div>
          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 border-slate-700 btn-outline'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp