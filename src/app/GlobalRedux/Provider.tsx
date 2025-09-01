"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import socketService from "./features/socket/socketService";
import { useEffect } from "react";


export function Providers({ children }: { children: React.ReactNode }) {
        useEffect(() => {
        const events = ["beforeunload", "pagehide", "unload"];
        const socket = socketService.socket;

        const handleDisconnect = () => {
            if (socket && socket.connected) {
                // socket.emit("disconnect", socket.id);
                socket.disconnect();
            }
        };

        events.forEach((event) => {
            window.addEventListener(event, handleDisconnect);
        });

        // cleanup cuando se desmonta
        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, handleDisconnect);
            });
        };
    }, []);
    return <Provider store={store}>{children}</Provider>;
}
