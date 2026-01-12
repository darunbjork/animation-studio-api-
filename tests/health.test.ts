import request from "supertest";
import { app } from "../src/app";

describe("Health Check", () => {
  beforeAll(() => {
    console.log("Health Check: MONGO_URI:", process.env.MONGO_URI);
    console.log("Health Check: REDIS_URL:", process.env.REDIS_URL);
  });

  it("should return service health", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});
