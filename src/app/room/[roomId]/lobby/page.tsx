"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import socket, { connectToRoom, onEvent } from "@/app/utils/socket";
import extractIdRoom  from "@/app/utils/catchRoomId";

const Lobby = () => {
  const router = useRouter();

  const roomId = extractIdRoom();
  console.log(roomId);

  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    if (roomId) {
      connectToRoom(roomId as string);

      onEvent("update-users", (users: string[]) => {
        setUsers(users);
      });

      onEvent("all-ready", () => {
        router.push(`/room/${roomId}/categories`);
      });
    }

    return () => {
      socket.off("update-users");
      socket.off("all-ready");
    };
  }, [roomId]);

  const handleReady = () => {
    socket.emit("ready", { roomId });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">Lobby: {roomId}</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
      <button onClick={handleReady} className="btn-primary">
        I'm Ready!
      </button>
    </div>
  );
};

export default Lobby;
