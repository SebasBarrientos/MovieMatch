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
      <div className="bg-slate-950 text-slate-400 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl cursor-pointer text-white font-bold relative mb-4 text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700"
>¡Bienvenido a MovieMatch! 🎬🍿</h1>
          <p className="text-lg text-slate-400 mb-6">
            ¿Cansado de pasar horas buscando qué película ver con amigos o familia?<br />
            <span className="text-slate-200 font-semibold">¡MovieMatch</span> está aquí para ayudarte!
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-slate-300">¿Cómo funciona?</h2>
          <ul className="list-disc list-inside text-left mx-auto text-slate-400 max-w-2xl mb-8">
            <li><span className="font-semibold text-slate-200">Crea una sala:</span> Invita a tus amigos a unirse desde cualquier lugar.</li>
            <li><span className="font-semibold text-slate-200">Elige categorías:</span> Cada participante selecciona sus categorías de películas favoritas.</li>
            <li><span className="font-semibold text-slate-200">Encuentra coincidencias:</span> MovieMatch analiza las selecciones para encontrar categorías en común.</li>
            <li><span className="font-semibold text-slate-200">¡Voten!:</span> Ve votando "Like" o "Dislike" a las películas sugeridas.</li>
            <li><span className="font-semibold text-slate-200">Descubre al ganador:</span> Si todos votan "Like", ¡tenemos una película ganadora! 🎉</li>
          </ul>

          {/* <h2 className="text-2xl font-semibold mb-4 text-slate-300">¿Por qué MovieMatch?</h2>
          <p className="text-lg text-slate-400 mb-8">
            Con MovieMatch, elegir películas ya no es una discusión interminable.
            Es una forma simple, entretenida y social de asegurarte de que todos estén contentos con la decisión.
            Ideal para noches de cine, reuniones familiares o incluso citas virtuales.
          </p> */}

          <p className="text-lg font-semibold text-slate-200 mb-8">
            ¡Deja de discutir y empieza a disfrutar! ❤️✨
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