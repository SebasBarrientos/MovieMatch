import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
  roomId: string | null;
  isConnected: boolean;
}

const initialState: SocketState = {
  socket: null,
  roomId: null,
  isConnected: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    initializeSocket: (state) => {
      if (!state.socket) {
        state.socket = io('http://localhost:3002'); // Cambia esto a tu servidor si es diferente
      }
    },
    connectSocket: (state) => {
      if (state.socket && !state.isConnected) {
        state.socket.connect();
        state.isConnected = true;
      }
    },
    disconnectSocket: (state) => {
      if (state.socket) {
        state.socket.disconnect();
        state.isConnected = false;
      }
    },
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    emitEvent: (state, action: PayloadAction<{ event: string; data?: any }>) => {
      if (state.socket) {
        const { event, data } = action.payload;
        state.socket.emit(event, data);
      }
    },
  },
});

export const {
  initializeSocket,
  connectSocket,
  disconnectSocket,
  setRoomId,
  emitEvent,
} = socketSlice.actions;

export default socketSlice.reducer;
