import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import socketService from './socketService';

interface SocketState {
  socket: Socket | null;
  room: {
    roomId: string | null,
    users:[]| null
  } ;
  isConnected: boolean;
}

const initialState: SocketState = {
  socket: null,
  room: {
    roomId:null,
    users:[]
  },
  isConnected: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connectSocket.fulfilled, (state, action) => {
        state.socket = action.payload;
        state.isConnected = true;
      })
      .addCase(createRoom.fulfilled, (state, action: PayloadAction<string>) => {
        state.room.roomId = action.payload;
      })
      .addCase //agregar si falla la creacion de la habitacion 
  },
})



export const connectSocket = createAsyncThunk('socket/connect', () => {
  return socketService.socket;
})
export const createRoom = createAsyncThunk ('socket/createRoom', async (newRoomId:string) => {
  try {
    return await socketService.createRoom(newRoomId);
  } catch (error) {
    console.error(error);
  }
});
export const connectToRoom = createAsyncThunk ('socket/connectToRoom', async (roomId:string) => {
  try {
    return await socketService.connectToRoom(roomId);
  } catch (error) {
    console.error(error);
  }
});










// const socketSlice = createSlice({
//   name: 'socket',
//   initialState,
//   reducers: {
//     initializeSocket: (state) => {
//       if (!state.socket) {
//         state.socket = io('http://localhost:3000'); // Cambia esto a tu servidor si es diferente
//       }
//     },
//     connectSocket: (state) => {
//       if (state.socket && !state.isConnected) {
//         state.socket.connect();
//         state.isConnected = true;
//       }
//     },
//     disconnectSocket: (state) => {
//       if (state.socket) {
//         state.socket.disconnect();
//         state.isConnected = false;
//       }
//     },
//     setRoomId: (state, action: PayloadAction<string>) => {
//       state.roomId = action.payload;
//     },
//     emitEvent: (state, action: PayloadAction<{ event: string; data?: any }>) => {
//       if (state.socket) {
//         const { event, data } = action.payload;
//         state.socket.emit(event, data);
//       }
//     },
//   },
// });

// export const {
//   initializeSocket,
//   connectSocket,
//   disconnectSocket,
//   setRoomId,
//   emitEvent,
// } = socketSlice.actions;

export default socketSlice.reducer;
