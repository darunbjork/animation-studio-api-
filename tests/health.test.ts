import request from "supertest";
import { app } from "../src/app";
import mongoose from "mongoose"; // Import mongoose

describe("Health Check", () => {
  beforeAll(async () => { // Make beforeAll async
    console.log("Health Check: MONGO_URI:", process.env.MONGO_URI);
    console.log("Health Check: REDIS_URL:", process.env.REDIS_URL);
    await mongoose.connect(process.env.MONGO_URI || ""); // Connect to MongoDB
  });

  afterAll(async () => { // Add afterAll to close connection
    await mongoose.connection.close();
  });

  it("should return service health", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});
