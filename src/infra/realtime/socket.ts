import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export function setupSocket(server: any) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Unauthorized"));

    try {
      const payload = jwt.verify(token, env.JWT_SECRET);
      // @ts-ignore
      socket.data.user = payload;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    // @ts-ignore
    const { studioId, userId } = socket.data.user;

    // Studio-scoped room
    socket.join(`studio:${studioId}`);

    console.log(`🎬 User ${userId} connected to studio ${studioId}`);

    socket.on("asset:comment", (payload) => {
      // @ts-ignore
      const { studioId, userId } = socket.data.user;

      const event = {
        assetId: payload.assetId,
        comment: payload.comment,
        authorId: userId,
        timestamp: new Date().toISOString(),
      };

      socket.to(`studio:${studioId}`).emit("asset:commented", event);
    });

    socket.on("asset:approve", (payload) => {
      // @ts-ignore
      const { studioId, role } = socket.data.user;

      if (role !== "DIRECTOR" && role !== "PRODUCER") {
        return;
      }

      socket.to(`studio:${studioId}`).emit("asset:approved", {
        assetId: payload.assetId,
        approvedAt: new Date().toISOString(),
      });
    });

    socket.on("disconnect", () => {
      console.log(`❌ User ${userId} disconnected`);
    });
  });

  return io;
}
