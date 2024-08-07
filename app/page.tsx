"use client";

import useSocket from "@/utils/useSocket";
import React, { useEffect, useState } from "react";

interface Data {
  _id: {
    $oid: string;
  };
  output: number;
  command: number;
  frequency: number;
  r_phase_volt: number;
  s_phase_volt: number;
  t_phase_volt: number;
  r_phase_current: number;
  s_phase_current: number;
  t_phase_current: number;
  status: number;
}

const DataDisplay: React.FC = () => {
  const [socket, isConnected, disconnect] = useSocket();
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    console.log(socket);
    if (socket) {
      console.log(socket);
      const handleData = (receivedData: Data) => {
        console.log("Received data:", receivedData);
        setData(receivedData);
      };

      socket.on("data", handleData);

      return () => {
        console.log("Disconnecting socket");
        socket.off("data", handleData);
        disconnect();
      };
    }
  }, [socket, disconnect]);

  return (
    <div>
      <h1>WebSocket Data</h1>
      {isConnected ? (
        data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>No data received yet</p>
        )
      ) : (
        <p>Connecting to the server...</p>
      )}
    </div>
  );
};

export default DataDisplay;
