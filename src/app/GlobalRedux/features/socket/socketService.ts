import { io } from "socket.io-client";

const socket = io('http://localhost:3000')


const createRoom = async (newRoomId: string) => {
    socket.emit('create-room', newRoomId);
    socket.on('room-created', (response) => {
        if (response.success) {
            return response.roomId
        }
    });
    socket.on('error', (message) => {
        console.error(message);
    });
};

const connectToRoom = async (roomId: string) => {
    socket.emit("join-room", roomId);
    socket.on("room-joined",(response)=> {
        if (response.succes) {
            return response.roomId
        }
    })
    socket.on('error', (message) => {
        console.error(message);
    });
    ;
}

const socketService = {
    socket,
    createRoom,
    connectToRoom
};


export default socketService;