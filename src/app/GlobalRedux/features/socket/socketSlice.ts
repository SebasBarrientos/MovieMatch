import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import socketService from './socketService';
import { log } from 'console';

interface SocketState {
  socket: any | null;
  room: {
    roomId: number | null,
    users: string[] | null
  };
  isConnected: boolean;
  creationError: boolean
  conectionError: boolean
  loading: boolean,
  movieList: [],
  movieProviders: any

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
  movieList: [],
  movieProviders: null,
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
      // .addCase(movieProviders.fulfilled, (state, action) => {
      //   console.log(action.payload.results);
      //   if (Object.keys(action.payload.results).length === 0) {
      //     console.log("Results vacio");
          
      //     state.movieProviders = "Only in Cinemas"
      //   }  else {
      //     state.movieProviders = action.payload.results.ES
      //     console.log("Results vacio y condicional no funciona1");
      //   }        
      //   console.log("Results vacio y condicional no funciona2");
      // })
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
export const selectCategory = createAsyncThunk('socket/selectCategory', async ({ roomId, userId, selected }: { roomId: number; userId: number; selected: [] }) => {
  try {
    console.log(roomId);

    return await socketService.selectCategory(roomId, userId, selected);
  } catch (error: any) {
    console.error("Error al intentar conectar a la sala:", error.message);
    return error.message;
  }
});
// export const movieProviders = createAsyncThunk("socket/movieProviders", async ({ roomId, movieId }: { roomId: number; movieId: number }) => {
//   try {
//     return await socketService.movieProviders(roomId, movieId);
//   } catch (error: any) {
//     console.error("Error al intentar conectar a la sala:", error.message);
//     return error.message;
//   }
// })




export const resetVariables = () => {

}

export const { setUsers, setMovieList } = socketSlice.actions
export default socketSlice.reducer;
