import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import socketService from './socketService';
import { log } from 'console';

interface SocketState {
  socket: Socket | null;
  room: {
    roomId: string | null,
    users: [] | null
  };
  isConnected: boolean;
  creationError: boolean
  conectionError: boolean
  loading: boolean,
  movieList: []
}

const initialState: SocketState = {
  socket: null,
  room: {
    roomId: null,
    users: []
  },
  isConnected: false,

  creationError: false,
  conectionError: false,
  loading: false,
  movieList:[] 
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<string[]>) => {
      state.room.users = action.payload;
    },
    setMovieList: (state, action) => {
      state.movieList = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectSocket.fulfilled, (state, action) => {
        state.socket = action.payload;
        state.isConnected = true;
        state.conectionError = false
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.room.roomId = action.payload;
      })
      .addCase(createRoom.rejected, (state, action) => {
        console.error("Failed to create room:", action.payload); // Logging
      })
      .addCase(connectToRoom.fulfilled, (state, action) => {
        state.room.roomId = action.payload.roomId;
        //   console.log(action.payload);
        //   state.room.roomId = action.payload;
      })
      .addCase(connectToRoom.rejected, (state, action) => {
        console.error("Failed to join room:", action.payload)
        state.conectionError = true
      })
      .addCase(selectCategory.pending, (state, action) => {
        state.loading = true
      })
      .addCase(selectCategory.fulfilled, (state, action) => {
        state.loading = false

      })
  },
})



export const connectSocket = createAsyncThunk('socket/connect', () => {
  return socketService.socket;
})
export const createRoom = createAsyncThunk('socket/createRoom', async (newRoomId: string) => {
  try {
    return await socketService.createRoom(newRoomId);
  } catch (error) {
    console.error(error);
  }
});
export const connectToRoom = createAsyncThunk('socket/connectToRoom', async (roomId: string, { rejectWithValue }) => {
  try {
    return await socketService.connectToRoom(roomId);
  } catch (error: any) {
    console.error("Error al intentar conectar a la sala:", error.message);
    return rejectWithValue(error.message);
  }
});
export const selectCategory = createAsyncThunk('socket/selectCategory', async ({ roomId, userId, selected }: { roomId: string | null; userId: string | undefined; selected: number[] }) => {
  try {
    console.log(roomId);

    return await socketService.selectCategory(roomId, userId, selected);
  } catch (error: any) {
    console.error("Error al intentar conectar a la sala:", error.message);
    return error.message;
  }
});

export const resetVariables = () => {

}








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
export const { setUsers, setMovieList } = socketSlice.actions
export default socketSlice.reducer;
