"use client"
import React, { useEffect } from 'react'
import CreateRoom from './components/CreateRoom'
import JoinRoom from './components/JoinRoom'
import { useDispatch } from 'react-redux';
import { connectSocket } from '@/app/GlobalRedux/features/socket/socketSlice';

const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectSocket()); 
  }, []);

  return (
    <div>
      <CreateRoom />
      <JoinRoom />
    </div>
  )
}

export default Page