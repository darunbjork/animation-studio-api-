import request from "supertest";
import { app } from "../../../app";
import mongoose from "mongoose";
import { redis } from "../../../infra/queue/redis";

jest.mock('../../../infra/queue/redis', () => ({
  redis: {
    status: 'ready',
  },
}));

jest.mock('mongoose', () => {
  const originalMongoose = jest.requireActual('mongoose');
  return {
    ...originalMongoose,
    connection: {
      readyState: 1,
    },
  };
});


describe("Health check", () => {
  it("returns healthy status", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("healthy");
  });
});
