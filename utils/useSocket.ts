import { disconnect } from "process";
import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const useSocket = () => {
  const disconnect = useCallback(() => {
    socket?.disconnect();
    socket = null;
  }, []);

  useEffect(() => {
    if (!socket) {
      socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
        transports: ["websocket"],
      });

      socket.on("connect_error", (e: Error) => {
        console.error(e);
        console.log(`connect_error due to ${e.message}`);
      });
    }
  }, [socket]);

  return [socket, disconnect];
};

export default useSocket;
