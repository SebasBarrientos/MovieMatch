"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createRoom } from "@/app/utils/socket";

const CreateRoom = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async () => {
    setLoading(true);
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();  
    try {
      const success = await createRoom(newRoomId); 

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
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">Create a Room</h2>
      <button
        onClick={handleCreateRoom}
        className="btn-primary mt-4"
        disabled={loading}
      >
        {loading ? "Creating Room..." : "Create Room"}
      </button>
 
    </div>
  );
};

export default CreateRoom;
