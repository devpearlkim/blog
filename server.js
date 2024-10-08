import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set");
}

const client = new MongoClient(uri);

const db = client.db("ess");
const pcsCollection = db.collection("pcs");

const app = express();

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const messagesNamespace = io.of("/messages");

messagesNamespace.on("connection", (socket) => {
  socket.on("message", (data) => {
    console.log(`Received message: ${data}`);
    messagesNamespace.emit("data", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const sendData = async () => {
  while (true) {
    try {
      const data = await pcsCollection.findOne({
        _id: new ObjectId("64d0f1c8b2345d67890a1b23"),
      });
      if (data) {
        messagesNamespace.emit("data", data);
        console.log(`Sent data: ${JSON.stringify(data)}`);
      } else {
        console.log("No data found.");
      }
    } catch (e) {
      console.error(`Error sending data: ${e}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

sendData().catch((err) =>
  console.error(`Failed to start background tasks: ${err}`)
);

const SOCKET_PORT = 8000;

server.listen(SOCKET_PORT, () => {
  console.log(`Server is listening on http://localhost:${SOCKET_PORT}`);
});
