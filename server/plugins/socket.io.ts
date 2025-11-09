import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";
import db from "~~/libs/db";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server();

  io.bind(engine);

  // ✅ Must be outside — defines socket logic
  io.on("connection", (socket) => {
    console.log(socket.id, "connected successfully ✅");

    // Join a room
    socket.on("join-room", (room) => {
      socket.join(room);
      console.log(`${socket.id} joined room: ${room}`);
    });

    // Handle messages
    socket.on("send-message", async ({ message, senderId, recieverId, room }) => {
        const m = await db.message.create({
          data: {
            senderId,
            recieverId,
            message,
          },
        });

        // ✅ Correct: emit event name and payload separately
        io.to(room).emit("new-message", m);
    });
  });

  // ✅ This must be outside the connection handler
  nitroApp.router.use(
    "/socket.io/",
    defineEventHandler({
      handler(event: any) {
        engine.handleRequest(event.node.req, event.node.res);
        event._handled = true;
      },
      websocket: {
        open(peer: any) {
          // @ts-expect-error private method and property
          engine.prepare(peer._internal.nodeReq);
          // @ts-expect-error private method and property
          engine.onWebSocket(
            peer._internal.nodeReq,
            peer._internal.nodeReq.socket,
            peer.websocket
          );
        },
      },
    })
  );
});
