import app from "../app.js";
import supertest from "supertest";
import connection from "../database/database.js";

afterAll(async () => {
    await connection.query('DELETE FROM records');
});

describe('/POST transactions', () => {

    it("return status 400 when body has some missing value", async () => {

        const body = {
            description: "Salário",
            value: 500000,
            // missing "type"
        }

        const result = await supertest(app).post('/transactions').set('Authorization', 'Bearer d614f0da-e774-4c54-a01d-2a5540e583ae').send(body);
        expect(result.status).toEqual(400);
    });

    it("return status 401 when headers don't have Bearer token", async () => {

        const body = {
            description: "Salário",
            value: 500000,
            type: "earning"
        }

        const result = await supertest(app).post('/transactions').send(body);
        expect(result.status).toEqual(401);
    });

    it("return status 404 when can't get user (invalid token)", async () => {

        const body = {
            description: "Salário",
            value: 500000,
            type: "earning"
        }

        const result = await supertest(app).post('/transactions').set('Authorization', 'Bearer d614f0da-e774-4c54-a01d-2a5540e58444').send(body);
        expect(result.status).toEqual(404);
    });

    it("return status 201 if the request was succesful", async () => {

        const body = {
            description: "Salário",
            value: 500000,
            type: "earning"
        }

        const result = await supertest(app).post('/transactions').set('Authorization', 'Bearer d614f0da-e774-4c54-a01d-2a5540e583ae').send(body);
        expect(result.status).toEqual(201);
    });

});