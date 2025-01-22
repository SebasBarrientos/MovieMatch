import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import socketService from './socketService';

interface SocketState {
  socket: any
  room: {
    roomId: string
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
    roomId: "",
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
        console.error("Failed to create room:", action.payload);
      })
      .addCase(connectToRoom.fulfilled, (state, action) => {
        state.room.roomId = action.payload;
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
export const createRoom = createAsyncThunk('socket/createRoom',async (newRoomId: string, { rejectWithValue }) => {
    try {
      return await socketService.createRoom(newRoomId);
    } catch (error: any) {
      console.error(error.message);
      return rejectWithValue(error.message); // Maneja errores explícitamente
    }
  }
);
export const connectToRoom = createAsyncThunk('socket/connectToRoom', async (roomId: string, { rejectWithValue }) => {
  try {
    return await socketService.connectToRoom(roomId);
  } catch (error: any) {
    console.error("Error al intentar conectar a la sala:", error.message);
    return rejectWithValue(error.message);
  }
});
export const selectCategory = createAsyncThunk('socket/selectCategory', async ({ roomId, userId, selected }: { roomId: string; userId: number; selected: number[] }) => {
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

export const { setUsers, setMovieList } = socketSlice.actions
export default socketSlice.reducer;
