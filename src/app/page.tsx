"use client"
import React, { useEffect } from 'react'
import CreateRoom from './components/CreateRoom'
import JoinRoom from './components/JoinRoom'
import { useDispatch } from 'react-redux';
import { connectSocket } from '@/app/GlobalRedux/features/socket/socketSlice';
import { AppDispatch } from '@/app/GlobalRedux/store';


const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(connectSocket());
  }, []);

  return (
    <div>
      <div className="bg-slate-950 text-slate-400 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl cursor-pointer text-white font-bold relative mb-4 text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700"
          >Welcome to MovieMatch! 🎬🍿</h1>
          <p className="text-lg text-slate-400 mb-6">
            Tired of spending hours choosing a movie to watch with friends or family?<br />
            <span className="text-slate-200 font-semibold">MovieMatch</span> is here to help!
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-300">How does it work?</h2>
          <ul className="list-disc list-inside text-left mx-auto text-slate-400 max-w-2xl mb-8">
            <li><span className="font-semibold text-slate-200">Create a room:</span> Invite your friends to join from anywhere.</li>
            <li><span className="font-semibold text-slate-200">Choose categories:</span> Each participant selects their favorite movie categories.</li>
            <li><span className="font-semibold text-slate-200">Find matches:</span> MovieMatch analyzes the selections to find common categories.</li>
            <li><span className="font-semibold text-slate-200">Vote!:</span> Start voting "Like" or "Dislike" on the suggested movies.</li>
            <li><span className="font-semibold text-slate-200">Discover the winner:</span> If everyone votes "Like," we have a winning movie! 🎉</li>
          </ul>
          <p className="text-lg font-semibold text-slate-200 mb-8">
            Stop arguing and start enjoying! ✨
          </p>
          <div className="flex flex-col items-center justify-center gap-6">
            <CreateRoom />
            <JoinRoom />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
