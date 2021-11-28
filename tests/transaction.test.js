/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import * as U from './factories/user.factory.js';
import * as T from './factories/transaction.factory.js';

afterAll(async () => {
  await T.deleteRecords();
  await U.deleteUserSessions();
  await U.deleteSessions();
  await U.deleteUsers();
  connection.end();
});

describe('GET /transactions', () => {
  beforeAll(async () => {
    await U.createFakeUser();
    await U.createFakeSession();
  });

  test('should return status 200 if the request was successfull', async () => {
    const result = await supertest(app).get('/transactions').set('Authorization', `Bearer ${U.fakeSession.token}`);
    expect(result.status).toEqual(200);
  });

  test('should return status 401 if the request was missing token', async () => {
    const result = await supertest(app).get('/transactions');
    expect(result.status).toEqual(401);
  });

  test('should return status 404 if the request does not return any results', async () => {
    const result = await supertest(app).get('/transactions').set('Authorization', `Bearer ${U.fakeSession.token}123`);
    expect(result.status).toEqual(404);
  });
});

describe('POST /transactions', () => {
  test('should return status 201 if the register was successfully created', async () => {
    const result = await supertest(app).post('/transactions').send(T.fakeTransaction).set('Authorization', `Bearer ${U.fakeSession.token}`);
    expect(result.status).toEqual(201);
  });

  test('should return status 401 if the request was missing token', async () => {
    const result = await supertest(app).post('/transactions').send(T.fakeTransaction);
    expect(result.status).toEqual(401);
  });

  test('should return status 404 if the request does not return any results', async () => {
    const result = await supertest(app).post('/transactions').set('Authorization', `Bearer ${U.fakeSession.token}123`);
    expect(result.status).toEqual(404);
  });

  test('should return status 400 if the request did not passed the joi validation', async () => {
    const result = await supertest(app).post('/transactions').send(T.invalidFakeTransaction).set('Authorization', `Bearer ${U.fakeSession.token}`);
    expect(result.status).toEqual(400);
  });
});

describe('PUT /transactions', () => {
  test('should return status 200 if the register was successfully updated', async () => {
    const result = await supertest(app).put('/transactions/1').send(T.fakeTransaction).set('Authorization', `Bearer ${U.fakeSession.token}`);
    expect(result.status).toEqual(200);
  });

  test('should return status 401 if the request was missing token', async () => {
    const result = await supertest(app).put('/transactions/1').send(T.fakeTransaction);
    expect(result.status).toEqual(401);
  });

  test('should return status 404 if the request does not return any results', async () => {
    const result = await supertest(app).put('/transactions/100').set('Authorization', `Bearer ${U.fakeSession.token}123`);
    expect(result.status).toEqual(404);
  });

  test('should return status 400 if the request did not passed the joi validation', async () => {
    const result = await supertest(app).put('/transactions/1').send(T.invalidFakeTransaction).set('Authorization', `Bearer ${U.fakeSession.token}`);
    expect(result.status).toEqual(400);
  });
});

describe('DELETE /transactions', () => {
  test('should return status 200 if the register was successfull created', async () => {
    const result = await supertest(app).delete('/transactions/1').set('Authorization', `Bearer ${U.fakeSession.token}`);
    expect(result.status).toEqual(200);
  });

  test('should return status 401 if the request was missing token', async () => {
    const result = await supertest(app).delete('/transactions/1');
    expect(result.status).toEqual(401);
  });

  test('should return status 404 if the request does not return any results', async () => {
    const result = await supertest(app).delete('/transactions/100').set('Authorization', `Bearer ${U.fakeSession.token}123`);
    expect(result.status).toEqual(404);
  });
});
