// src/utils/socket.ts
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3000", {
  autoConnect: false, // No conectar automáticamente
});

export const connectToRoom = (roomId: string) => {
  socket.emit("join-room", roomId);
};

export const createRoom = (roomId: string) => {
  socket.emit("create-room", roomId);
};

export const onEvent = (event: string, callback: (data: any) => void) => {
  socket.on(event, callback);
};

export const sendEvent = (event: string, data: any) => {
  socket.emit(event, data);
};

export default socket;
