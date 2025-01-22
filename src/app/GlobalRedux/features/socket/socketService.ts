import { io } from "socket.io-client";

const socket = io('http://localhost:3000')

const createRoom = (newRoomId: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        socket.emit("create-room", newRoomId);

        socket.once("room-created", (response) => {
            if (response.success) {
                const roomId:string = response.roomId 
                resolve(roomId); // Devuelve el roomId
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
                const roomId:string = response.roomId 
                resolve(roomId); // Devuelve el roomId
            } else {
                reject(new Error("No se pudo unir a la sala."));
            }
        });

        socket.once("error", (message) => {
            reject(new Error(message));
        });
    });
};
const selectCategory = (roomId: string, userId: number, categories: number[]): Promise<string> => {
    return new Promise((resolve, reject) => {
        socket.emit("select-categories", { roomId, userId, categories });

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
const movieProviders = (roomId: number, movieId: number): Promise<string | undefined> => {
    console.log(movieId);
    return new Promise((resolve, reject) => {

        socket.emit("movie-providers", { roomId, movieId });

        socket.once("movie-providers", (response) => {
            if (response.success && Object.keys(response.providers.results).length !== 0) {
                console.log(response.providers);
                if (!response.providers.results.ES) {
                    resolve(undefined)
                }
                resolve(response.providers.results.ES.link);
            } else {
                resolve("Only in Cinemas");
            }
        });

        socket.once("error", (message) => {
            reject(new Error(message));
        });
    });
};
const movieDetails = (roomId: number, movieId: number): Promise<string | undefined> => {
    console.log(movieId);
    return new Promise((resolve, reject) => {

        socket.emit("movie-details", { roomId, movieId });

        socket.once("movie-details", (response) => {
            if (response.success && Object.keys(response.movieDetails.imdb_id).length !== 0) {
                resolve(response.movieDetails.imdb_id);
            } else {
                console.log("Error, no hay ID");

                resolve(undefined)
            }
        });

        socket.once("error", (message) => {
            reject(new Error(message));
        });
    });
};




const socketService = {
    socket,
    createRoom,
    connectToRoom,
    selectCategory,
    movieProviders,
    movieDetails
};


export default socketService;

