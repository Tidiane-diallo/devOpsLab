import request from 'supertest';
import {describe, expect, it} from 'vitest';
import app from '../src/app';


describe ("GET /health", () => {

    it("retourne HTTP 200 avec le statut ok", async () => {

        const response = await request(app)
        .get("/health");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: "ok",
        })
    })
})