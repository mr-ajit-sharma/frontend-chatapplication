import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { io } from 'socket.io-client';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import { useSelector, useDispatch } from 'react-redux';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';
import { MainUrl } from './constant';
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/signin',
    element: <SignIn />
  },
]);

const App = () => {
  const { authUser} = useSelector(store => store.user);
  const {socket} = useSelector(store =>store.socket);
  const dispatch = useDispatch()
  useEffect(() => {
    if (authUser) {
      const socket = io(`${MainUrl}`, {
        query: {
          userId: authUser._id
        }
      });
      dispatch(setSocket(socket));
      socket.on('getOnlineUsers',(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers));
      })      
      return ()=>socket.close()
    }else{

      if(socket){
        socket.close()
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);
  return (
    <div className='p-4 flex h-screen justify-center items-center'>
      <RouterProvider router={router}>
        {/* Render your routes */}
      </RouterProvider>
    </div>
  );
};

export default App;
