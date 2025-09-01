"use client";
import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./features/socket/socketSlice";
export const store = configureStore({
    reducer: {
        socket: socketReducer,
    },
    //Esta parte es porque socket no es serializable y Redux Toolkit por defecto chequºea que todo lo que se guarda en el store sea serializable
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["socket/connect/fulfilled"],
                ignoredPaths: ["socket.socket"],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
