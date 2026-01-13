import { Server } from 'socket.io';
import http from 'http';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { AssetCacheService } from '../../app/services/AssetCacheService'; // Import AssetCacheService

let io: Server;

export function setupSocket(server: http.Server) {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Unauthorized'));

    try {
      const payload = jwt.verify(token, env.JWT_SECRET);
      // @ts-ignore
      socket.data.user = payload;
      next();
    } catch {
      next(new Error('Unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    // @ts-ignore
    const { studioId, userId } = socket.data.user;

    // Studio-scoped room
    socket.join(`studio:${studioId}`);

    console.log(`🎬 User ${userId} connected to studio ${studioId}`);

    socket.on('asset:comment', async (payload) => {
      // @ts-ignore
      const { studioId, userId } = socket.data.user;

      const event = {
        assetId: payload.assetId,
        comment: payload.comment,
        authorId: userId,
        timestamp: new Date().toISOString(),
      };

      socket.to(`studio:${studioId}`).emit('asset:commented', event);

      // Invalidate asset cache when commented
      await AssetCacheService.invalidateAssetCache(payload.assetId, studioId);
    });

    socket.on('asset:approve', async (payload) => {
      // @ts-ignore
      const { studioId, role } = socket.data.user;

      if (role !== 'DIRECTOR' && role !== 'PRODUCER') {
        return;
      }

      socket.to(`studio:${studioId}`).emit('asset:approved', {
        assetId: payload.assetId,
        approvedAt: new Date().toISOString(),
      });

      // Invalidate asset cache when approved
      await AssetCacheService.invalidateAssetCache(payload.assetId, studioId);
    });

    socket.on('disconnect', () => {
      console.log(`❌ User ${userId} disconnected`);
    });
  });

  return io;
}

export { io };
