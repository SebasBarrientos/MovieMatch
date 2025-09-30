"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createRoom } from "@/app/GlobalRedux/features/socket/socketSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from '@/app/GlobalRedux/store';
const CreateRoom = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { socket } = useSelector((state: RootState) => state.socket);

  const handleCreateRoom = async () => {

    if (!socket) {
      alert('There is no conection to the server');
      return;
    }

    setLoading(true);
    const newRoomId: string = Math.random().toString(36).substring(2, 8).toUpperCase();
    try {
      dispatch(createRoom(newRoomId));
      router.push(`/room/${newRoomId}/lobby`);
    } catch (error) {
      alert("Error conecting to the server: " + error );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleCreateRoom}
        disabled={loading}
        className="w-full h-14 text-lg rounded-md font-bold bg-gradient-to-br from-[hsl(45,85%,55%)] to-[hsl(35,80%,50%)] hover:opacity-90  shadow-glow transition-all duration-300 hover:shadow-[0_0_40px_hsl(45_85%_55%_/_0.4)]">
        {loading ? "Creating Room..." : "Create new Room"}
      </button>
    </>
  );
};

export default CreateRoom;
