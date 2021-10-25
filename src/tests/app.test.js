import app from "../app.js";
import supertest from "supertest";
import connection from "../database/database.js";

afterAll(async () => {
    await connection.query('DELETE FROM records');
});

describe('/POST transactions', () => {

    it("return status 400 when body has some missing value", async () => {
        
        const getToken = await connection.query('SELECT * FROM sessions');
        const token = getToken.rows[0].token;

        const body = {
            description: "Salário",
            value: 500000,
            // missing "type"
        }

        const result = await supertest(app).post('/transactions').set('Authorization', `Bearer ${token}`).send(body);
        expect(result.status).toEqual(400);
        expect(result.text).toEqual('"type" is required')
    });

    it("return status 401 when headers don't have Bearer token", async () => {
        
        const body = {
            description: "Salário",
            value: 500000,
            type: "earning"
        }

        const result = await supertest(app).post('/transactions').send(body);
        expect(result.status).toEqual(401);
        expect(result.body).toEqual({ message: 'Missing token'});
    });

    it("return status 404 when can't get user (invalid token)", async () => {

        const getToken = await connection.query('SELECT * FROM sessions');
        const token = getToken.rows[0].token;

        const body = {
            description: "Salário",
            value: 500000,
            type: "earning"
        }

        const result = await supertest(app).post('/transactions').set('Authorization', `Bearer ${token}555`).send(body);
        expect(result.status).toEqual(404);
        expect(result.body).toEqual({ message: 'Invalid token'});
    });

    it("return status 201 if the request was succesful", async () => {

        const getToken = await connection.query('SELECT * FROM sessions');
        const token = getToken.rows[0].token;

        const body = {
            description: "Salário",
            value: 500000,
            type: "earning"
        }

        const result = await supertest(app).post('/transactions').set('Authorization', `Bearer ${token}`).send(body);
        expect(result.status).toEqual(201);
        expect(result.body).toEqual({ message: 'Created!'});
    });

});