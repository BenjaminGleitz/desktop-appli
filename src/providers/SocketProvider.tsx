import { ReactNode, createContext, useContext, useMemo } from "react";

export type AppSocket = {
    onMessage(callback: (message: unknown) => void): () => void;
    send(message: unknown): void;
};

// Define typings of code exposed by Electron on window object
declare global {
    interface Window {
        MessageAPI: {
            addMessageListener(callback: (message: unknown) => void): () => void;
            send(message: unknown): void;
        };
    }
}

const context = createContext<AppSocket | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
    const appSocket = useMemo<AppSocket>(
        () => ({
            onMessage(callback) {
                console.log("Attempting to add message listener...");
                return window.MessageAPI.addMessageListener(callback);
            },
            send(message) {
                console.log("Sending message:", message);
                window.MessageAPI.send(message);
            },
        }),
        []
    );

    return <context.Provider value={appSocket}>{children}</context.Provider>;
}

export function useSocket() {
    const socket = useContext(context);
    if (!socket) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return socket;
}
