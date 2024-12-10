import { io } from "socket.io-client";

const socket = io('http://localhost:3000')

const createRoom = (newRoomId: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        socket.emit("create-room", newRoomId);

        socket.once("room-created", (response) => {
            if (response.success) {
                resolve(response.roomId); // Devuelve el roomId
            } else {
                reject(new Error("No se pudo crear la sala."));
            }
        });

        socket.once("error", (message) => {
            reject(new Error(message)); // Maneja errores
        });
    });
};

const connectToRoom = (roomId: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        socket.emit("join-room", roomId);

        socket.once("room-joined", (response) => {
            if (response.success) {
                resolve(response); // Devuelve el roomId
            } else {
                reject(new Error("No se pudo unir a la sala."));
            }
        });

        socket.once("error", (message) => {
            reject(new Error(message)); 
        });
    });
};


// const createRoom = async (newRoomId: string) => {
//     socket.emit('create-room', newRoomId);
//     socket.once('room-created', (response) => {
//         if (response.success) {
//             return response.roomId
//         }
//     });
//     socket.once('error', (message) => {
//         console.error(message);
//     });
// };

// const connectToRoom = async (roomId: string) => {
//     socket.emit("join-room", roomId);
//     socket.once("room-joined", (response) => {
//         if (response.success) {
//             console.log(response.roomId);
//             return response.roomId
//         }
//     })
//     socket.once('error', (message) => {
//         console.error(message);
//     });
//     ;
// }

const socketService = {
    socket,
    createRoom,
    connectToRoom
};


export default socketService;

