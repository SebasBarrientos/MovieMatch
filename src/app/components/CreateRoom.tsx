"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createRoom } from "@/app/GlobalRedux/features/socket/socketSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/app/GlobalRedux/store';
const CreateRoom = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { socket } = useSelector((state: RootState) => state.socket);

  const handleCreateRoom = async () => {

    if (!socket) {
      alert('No hay conexión con el servidor.');
      return;
    }

    setLoading(true);
    const newRoomId: string = Math.random().toString(36).substring(2, 8).toUpperCase();
    try {
      const success = dispatch(createRoom(newRoomId));

      if (success) {
        router.push(`/room/${newRoomId}/lobby`);
      } else {
        alert("Error al crear la sala.");
      }
    } catch (error) {
      alert("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleCreateRoom}
        disabled={loading}
        className="bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
        <span className="bg-slate-400 shadow-slate-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
        {loading ? "Creating Room..." : "Create Room"}
      </button>
  </>
  );
};

export default CreateRoom;
