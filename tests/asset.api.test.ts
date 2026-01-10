import request from "supertest";
import { app } from "../src/app";
import mongoose from "mongoose";
import { StudioModel } from "../src/app/repositories/models/Studio";
import { UserModel } from "../src/app/repositories/models/User";
import jwt from "jsonwebtoken";
import { env } from "../src/config/env";
import { AssetModel } from "../src/app/repositories/models/Asset";

describe("Asset API", () => {
  let token: string;
  let studioId: string;
  let userId: string;
  let assetId: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || "");

    const studio = await StudioModel.create({ name: "Test Studio" });
    studioId = studio._id.toString();

    const user = await UserModel.create({
      studioId,
      email: "api.test@example.com",
      password: "password123",
      role: "ARTIST",
    });
    userId = user._id.toString();

    token = jwt.sign(
      { userId: user.id, role: user.role, studioId: user.studioId },
      env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  });

  beforeEach(async () => {
    // Clean up assets before each test
    await AssetModel.deleteMany({});
    // Create a new asset for each test to ensure isolation
    const createRes = await request(app)
      .post("/assets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Asset for Test",
        type: "CHARACTER",
        metadata: { polyCount: 1000, format: "fbx", previewUrl: "http://example.com/preview.jpg" },
      });
    assetId = createRes.body._id;
  });

  afterAll(async () => {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.connection.close();
  });

  it("should create an asset", async () => {
    const res = await request(app)
      .post("/assets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "New Test Asset",
        type: "CHARACTER",
        metadata: { polyCount: 1000, format: "fbx", previewUrl: "http://example.com/preview.jpg" },
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("New Test Asset");
    expect(res.body.studioId).toBe(studioId);
    expect(res.body.createdBy).toBe(userId);
  });

  it("should list assets", async () => {
    const res = await request(app)
      .get("/assets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.page).toBe(1);
    expect(res.body.limit).toBe(20);
  });

  it("should paginate assets", async () => {
    // Create more assets to test pagination
    const assetCreationPromises: Promise<any>[] = [];
    for (let i = 0; i < 25; i++) {
      assetCreationPromises.push(
        request(app)
          .post("/assets")
          .set("Authorization", `Bearer ${token}`)
          .send({
            name: `Paginated Asset ${i}`,
            type: "PROP",
          })
      );
    }
    await Promise.all(assetCreationPromises);

    const res = await request(app)
      .get("/assets?page=2&limit=10")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.length).toBe(10);
    expect(res.body.page).toBe(2);
    expect(res.body.limit).toBe(10);
  });

  it("should get an asset by ID", async () => {
    const getRes = await request(app)
      .get(`/assets/${assetId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.name).toBe("Asset for Test");
    expect(getRes.body._id).toBe(assetId);
  });

  it("should update an asset", async () => {
    const updateRes = await request(app)
      .patch(`/assets/${assetId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Asset Name",
      });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.name).toBe("Updated Asset Name");
    expect(updateRes.body._id).toBe(assetId);
  });

  it("should delete an asset", async () => {
    const deleteRes = await request(app)
      .delete(`/assets/${assetId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteRes.status).toBe(204);

    const getRes = await request(app)
      .get(`/assets/${assetId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getRes.status).toBe(400); // Asset not found
  });
});
