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

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || "");

    const studio = await StudioModel.create({ name: "Test Studio" });
    studioId = studio._id.toString();

    const user = await UserModel.create({
      studioId,
      email: "api.test@example.com",
      password: "password123",
      role: "PRODUCER", // Changed role to PRODUCER
    });
    userId = user._id.toString();

    token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        studioId: user.studioId,
        scopes: ["assets:read", "assets:write", "assets:delete", "assets:approve"], // Added scopes
      },
      env.JWT_SECRET,
      { expiresIn: "1h" }
    );
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
    expect(res.body._id).toBeDefined();
    expect(res.body._id).toMatch(/^[0-9a-fA-F]{24}$/);
  });

  it("should list assets", async () => {
    // Create an asset for this test
    const createRes = await request(app)
      .post("/assets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Listable Asset",
        type: "PROP",
        metadata: { polyCount: 500, format: "obj" },
      });
    expect(createRes.status).toBe(201);
    expect(createRes.body._id).toBeDefined();
    expect(createRes.body._id).toMatch(/^[0-9a-fA-F]{24}$/);

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
    // Ensure a clean slate for this specific test
    await AssetModel.deleteMany({});

    // Create enough assets to thoroughly test pagination
    const numberOfAssetsToCreate = 25;
    const assetCreationPromises: Promise<any>[] = [];
    for (let i = 0; i < numberOfAssetsToCreate; i++) {
      assetCreationPromises.push(
        request(app)
          .post("/assets")
          .set("Authorization", `Bearer ${token}`)
          .send({
            name: `Paginated Asset ${i}`,
            type: "PROP",
            metadata: { count: i, format: "fbx" }, // Add some metadata
          })
          .then((createRes) => {
            expect(createRes.status).toBe(201);
            expect(createRes.body._id).toBeDefined();
            expect(createRes.body._id).toMatch(/^[0-9a-fA-F]{24}$/);
            return createRes;
          })
      );
    }
    await Promise.all(assetCreationPromises);

    // Verify total assets created (optional, but good for debugging)
    const totalAssets = await AssetModel.countDocuments({});
    expect(totalAssets).toBe(numberOfAssetsToCreate);

    const res = await request(app)
      .get("/assets?page=2&limit=10")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.length).toBe(10); // Expect 10 assets for page 2, limit 10
    expect(res.body.page).toBe(2);
    expect(res.body.limit).toBe(10);
  });

  it("should get an asset by ID", async () => {
    // Create an asset for this test
    const createRes = await request(app)
      .post("/assets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Asset to Get",
        type: "VEHICLE",
        metadata: { wheels: 4, color: "blue" },
      });
    expect(createRes.status).toBe(201);
    expect(createRes.body._id).toBeDefined();
    expect(createRes.body._id).toMatch(/^[0-9a-fA-F]{24}$/);
    const assetIdToGet = createRes.body._id;

    const getRes = await request(app)
      .get(`/assets/${assetIdToGet}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.name).toBe("Asset to Get");
    expect(getRes.body._id).toBe(assetIdToGet);
  });

  it("should update an asset", async () => {
    // Create an asset for this test
    const createRes = await request(app)
      .post("/assets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Asset to Update",
        type: "VEHICLE",
        metadata: { engine: "V8", doors: 2 },
      });
    expect(createRes.status).toBe(201);
    expect(createRes.body._id).toBeDefined();
    expect(createRes.body._id).toMatch(/^[0-9a-fA-F]{24}$/);
    const assetIdToUpdate = createRes.body._id;

    const updateRes = await request(app)
      .patch(`/assets/${assetIdToUpdate}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Asset Name",
      });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.name).toBe("Updated Asset Name");
    expect(updateRes.body._id).toBe(assetIdToUpdate);
  });

  it("should delete an asset", async () => {
    // Create an asset for this test
    const createRes = await request(app)
      .post("/assets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Asset to Delete",
        type: "VEHICLE",
        metadata: { destruction: "high", debris: "much" },
      });
    expect(createRes.status).toBe(201);
    expect(createRes.body._id).toBeDefined();
    expect(createRes.body._id).toMatch(/^[0-9a-fA-F]{24}$/);
    const assetIdToDelete = createRes.body._id;

    const deleteRes = await request(app)
      .delete(`/assets/${assetIdToDelete}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteRes.status).toBe(204);

    const getRes = await request(app)
      .get(`/assets/${assetIdToDelete}`)
      .set("Authorization", `Bearer ${token}`);

    expect(getRes.status).toBe(400); // Asset not found
  });
});
