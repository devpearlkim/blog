import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

type DisconnectFunction = () => void;

const useSocket = (): [Socket | null, boolean, DisconnectFunction] => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = null;
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    if (!socket) {
      socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        console.log("Connected to the server");
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from the server");
        setIsConnected(false);
      });

      socket.on("connect_error", (e: Error) => {
        console.error(e);
        console.log(`connect_error due to ${e.message}`);
        setIsConnected(false);
      });

      return () => {
        if (socket) {
          socket.disconnect();
          socket = null;
        }
      };
    }
  }, []);

  return [socket, isConnected, disconnect];
};

export default useSocket;
