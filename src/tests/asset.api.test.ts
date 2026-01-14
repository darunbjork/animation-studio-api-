import request from 'supertest';
import { app } from '../app';
import { StudioModel } from '../app/repositories/models/Studio';
import { UserModel } from '../app/repositories/models/User';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AssetModel } from '../app/repositories/models/Asset';

describe('Asset API', () => {
  let token: string;
  let studioId: string;
  let userId: string;

  beforeAll(async () => {
    const studio = await StudioModel.create({ name: 'Test Studio' });
    studioId = studio._id.toString();

    const user = await UserModel.create({
      studioId,
      email: 'api.test@example.com',
      password: 'password123',
      role: 'PRODUCER', // Changed role to PRODUCER
    });
    userId = user._id.toString();

    token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        studioId: user.studioId,
        scopes: [
          'assets:read',
          'assets:write',
          'assets:delete',
          'assets:approve',
        ], // Added scopes
      },
      env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  it('should create an asset', async () => {
    const res = await request(app)
      .post('/assets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Test Asset',
        type: 'CHARACTER',
        metadata: {
          polyCount: 1000,
          format: 'fbx',
          previewUrl: 'http://example.com/preview.jpg',
        },
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('New Test Asset');
    expect(res.body.studioId).toBe(studioId);
    expect(res.body.createdBy).toBe(userId);
    expect(res.body._id).toBeDefined();
    expect(res.body._id).toMatch(/^[0-9a-fA-F]{24}$/);
  });

  it('should list assets', async () => {
    // Create an asset for this test
    const createRes = await request(app)
      .post('/assets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Listable Asset',
        type: 'PROP',
        metadata: {
          polyCount: 500,
          format: 'obj',
          previewUrl: 'http://example.com/list_preview.jpg',
        },
      });
    expect(createRes.status).toBe(201);
    expect(createRes.body._id).toBeDefined();
    expect(createRes.body._id).toMatch(/^[0-9a-fA-F]{24}$/);

    const res = await request(app)
      .get('/assets')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.page).toBe(1);
    expect(res.body.limit).toBe(20);
  });

  it('should paginate assets', async () => {
    // Create enough assets to thoroughly test pagination
    const numberOfAssetsToCreate = 25;
    const createAssetPromises = [];

    for (let i = 0; i < numberOfAssetsToCreate; i++) {
      createAssetPromises.push(
        request(app)
          .post('/assets')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: `Paginated Asset ${i}`,
            type: 'PROP',
            metadata: {
              polyCount: 100 + i,
              format: `fbx-${i}`,
              previewUrl: `http://example.com/page_preview_${i}.jpg`,
            }, // Add some metadata
          })
      );
    }

    const createdAssets = await Promise.all(createAssetPromises);

    for (const createRes of createdAssets) {
      expect(createRes.status).toBe(201);
      expect(createRes.body._id).toBeDefined();
      expect(createRes.body._id).toMatch(/^[0-9a-fA-F]{24}$/);
    }

    // Verify total assets created
    const totalAssets = await AssetModel.countDocuments({});
    expect(totalAssets).toBe(numberOfAssetsToCreate);

    const res = await request(app)
      .get('/assets?page=2&limit=10')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.length).toBe(10); // Expect 10 assets for page 2, limit 10
    expect(res.body.page).toBe(2);
    expect(res.body.limit).toBe(10);
  });

  it('should get an asset by ID', async () => {
    // Create an asset for this test
    const createRes = await request(app)
      .post('/assets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Asset to Get',
        type: 'PROP', // Changed from VEHICLE to PROP
        metadata: {
          polyCount: 1500,
          format: 'usd',
          previewUrl: 'http://example.com/get_preview.jpg',
        },
      });
    expect(createRes.status).toBe(201);
    expect(createRes.body._id).toBeDefined();
    expect(createRes.body._id).toMatch(/^[0-9a-fA-F]{24}$/);
    const assetIdToGet = createRes.body._id;

    const getRes = await request(app)
      .get(`/assets/${assetIdToGet}`)
      .set('Authorization', `Bearer ${token}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.name).toBe('Asset to Get');
    expect(getRes.body._id).toBe(assetIdToGet);
  });

  it('should update an asset', async () => {
    // Create an asset for this test
    const createRes = await request(app)
      .post('/assets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Asset to Update',
        type: 'PROP', // Changed from VEHICLE to PROP
        metadata: {
          polyCount: 2000,
          format: 'gltf',
          previewUrl: 'http://example.com/update_preview.jpg',
        },
      });
    expect(createRes.status).toBe(201);
    expect(createRes.body._id).toBeDefined();
    expect(createRes.body._id).toMatch(/^[0-9a-fA-F]{24}$/);
    const assetIdToUpdate = createRes.body._id;

    const updateRes = await request(app)
      .patch(`/assets/${assetIdToUpdate}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Asset Name',
      });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.name).toBe('Updated Asset Name');
    expect(updateRes.body._id).toBe(assetIdToUpdate);
  });

  it('should delete an asset', async () => {
    // Create an asset for this test
    const createRes = await request(app)
      .post('/assets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Asset to Delete',
        type: 'PROP', // Changed from VEHICLE to PROP
        metadata: {
          polyCount: 50,
          format: 'abc',
          previewUrl: 'http://example.com/delete_preview.jpg',
        },
      });
    expect(createRes.status).toBe(201);
    expect(createRes.body._id).toBeDefined();
    expect(createRes.body._id).toMatch(/^[0-9a-fA-F]{24}$/);
    const assetIdToDelete = createRes.body._id;

    const deleteRes = await request(app)
      .delete(`/assets/${assetIdToDelete}`)
      .set('Authorization', `Bearer ${token}`);

    expect(deleteRes.status).toBe(204);

    const getRes = await request(app)
      .get(`/assets/${assetIdToDelete}`)
      .set('Authorization', `Bearer ${token}`);

    expect(getRes.status).toBe(400); // Asset not found
  });
});
