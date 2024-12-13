
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import extractIdRoom from "@/app/utils/catchRoomId";
import { useDispatch, useSelector } from "react-redux";
import { connectToRoom, setUsers } from "../GlobalRedux/features/socket/socketSlice";
import { RootState } from '@/app/GlobalRedux/store';

const Lobby = () => {
  const dispatch = useDispatch();
  const { socket, room, conectionError } = useSelector((state: RootState) => state.socket);
  const router = useRouter();
  if (!socket) {
    alert('No hay conexión con el servidor.');
    router.push("/")
    return;
  }
  const roomId = extractIdRoom();
  socket.on("update-users", (users: []) => {
    dispatch(setUsers(users));
  });
  socket.on("users-ready", (roomId) => {
    
    router.push(`/room/${roomId}/categories`)
  });
  useEffect(() => {
    dispatch(connectToRoom(roomId as string));
  }, [])

  useEffect(() => {
  }, [room.users])

  useEffect(() => {
    if (conectionError) {
      alert("No se pudo unir a la sala. Redirigiendo...");

      router.push("/"); // Redirige al inicio
    }
  }, [conectionError])




  const handleReady = () => {
    socket.emit("ready",  roomId);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">Lobby: {roomId}</h1>
      <ul>
        {room.users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
      <button onClick={handleReady} className="btn-primary">
        We are Ready!
      </button>
    </div>
  );
};

export default Lobby;
