import { io, Socket } from 'socket.io-client';

const socket: Socket = io("http://localhost:3000", {
});
export const connectToRoom = (roomId: string) => {
  socket.emit("join-room", roomId);
};
// Función para crear la sala
export const createRoom = async (roomId: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    socket.emit('create-room', roomId);  
    socket.on('room-created', (response) => {
      if (response.success) {
        resolve(true);  
      } else {
        resolve(false); 
      }
    });
    socket.on('error', (message) => {
      console.error(message);
      reject(false); 
    });
  });}



  
export const joinRoom = async (roomId: string): Promise<boolean> => { //hacerlo bien todo
  return new Promise((resolve, reject) => {
    socket.emit('join-room', roomId);  
    socket.on('room-created', (response) => {
      if (response.success) {
        resolve(true);  
      } else {
        resolve(false); 
      }
    });
    socket.on('error', (message) => {
      console.error(message);
      reject(false);
    });
  });
};

// Función para desconectar
export const disconnectSocket = () => {
  socket.disconnect();
};

export default socket;