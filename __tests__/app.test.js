import request from 'supertest';
import app from '../app.js';

describe('Test the users API', () => {
  let userId;

  test('GET /api/users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(0); // assuming there are no users in the database yet
  });

  test('POST /api/users', async () => {
    const data = {
      username: 'Alice',
      age: 30,
      hobbies: ['reading', 'swimming'],
    };
    const response = await request(app).post('/api/users').send(data);
    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBeDefined();
    userId = response.body.id; // save the user ID for future tests
    expect(response.body.username).toBe(data.username);
    expect(response.body.age).toBe(data.age);
    expect(response.body.hobbies).toEqual(data.hobbies);
  });

  test('GET /api/users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1); // now there should be one user in the database
  });

  test('GET /api/users/{userId}', async () => {
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(userId);
    expect(response.body.username).toBe('Alice');
    expect(response.body.age).toBe(30);
    expect(response.body.hobbies).toEqual(['reading', 'swimming']);
  });

  test('GET /api/users/{invalidUserId}', async () => {
    const response = await request(app).get('/api/users/invalid-id');
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid user ID');
  });

  test('GET /api/users/{nonExistentUserId}', async () => {
    const response = await request(app).get('/api/users/fd6f3c3e-b8ca-423e-8b3f-60ae47047d45');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  test('PUT /api/users/{userId}', async () => {
    const data = {
      username: 'Bob',
      age: 35,
      hobbies: ['running', 'cooking'],
    };
    const response = await request(app).put(`/api/users/${userId}`).send(data);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(userId);
    expect(response.body.username).toBe(data.username);
    expect(response.body.age).toBe(data.age);
    expect(response.body.hobbies).toEqual(data.hobbies);
  });

  test('PUT /api/users/{invalidUserId}', async () => {
    const response = await request(app).put('/api/users/invalid-id');
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid user ID');
  });

  test('PUT /api/users/{nonExistentUserId}', async () => {
    const response = await request(app).put('/api/users/fd6f3c3e-b8ca-423e-8b3f-60ae47047d45');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  test('DELETE /api/users/{userId}', async () => {
    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.statusCode).toBe(204);
  });

  test('DELETE /api/users/{invalidUserId}', async () => {
    const response = await request(app).delete('/api/users/invalid-id');
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid user ID');
  });

  test('DELETE /api/users/{nonExistentUserId}', async () => {
    const response = await request(app).delete('/api/users/fd6f3c3e-b8ca-423e-8b3f-60ae47047d45');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('User not found');
  });
});
