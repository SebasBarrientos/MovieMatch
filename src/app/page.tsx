"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import socket, { createRoom } from "@/app/utils/socket";

const CreateRoom = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreateRoom = () => {
    setLoading(true);

    // Genera un ID único para la sala
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();

    createRoom(roomId);

    socket.on("room-created", () => {
      router.push(`/room/${roomId}`);
    });

    socket.on("error", (message) => {
      alert(message);
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Create a Room</h1>
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
