import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { resetTasks } from "../src/tasks/task.store.js";
import app from "../src/app.js";

describe ("POST /api/tasks",() => {

     beforeEach(() => {
        resetTasks();
    });

    it("crée une tâche avec un titre et une date valides", async () => {
        const response = await request(app)
        .post("/api/tasks")
        .send({
            title: "Apprendre le devOps",
            scheduledAt:"2026-11-10T18:00:00-05:00",
        });
        
         expect(response.status).toBe(201);

         expect(response.body).toMatchObject({
            title: "Apprendre le devOps",
            scheduledAt: "2026-11-10T23:00:00.000Z",
            completed: false,
         });

         expect(response.body.id).toEqual(expect.any(Number));
         expect(response.body.createdAt).toEqual(expect.any(String));
    });

    it("Refuse une date absente", async () => {
        const response = await request(app)
        .post("/api/tasks")
        .send({
            title:"Apprendre le devOps",
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error:"La date est obligatoire"
        });
    });

    it("refuse une date invalide", async () => {
        const response = await request(app)
            .post("/api/tasks")
            .send({
                title: "Apprendre le DevOps",
                scheduledAt: "bonjour",
            });

        expect(response.status).toBe(400);

        expect(response.body).toEqual({
            error: "La date est invalide",
        });
    });
    
    it("refuse un titre vide", async () => {
        const response = await request(app)
            .post("/api/tasks")
            .send({
                title: "   ",
                scheduledAt: "2026-11-10T18:00:00-05:00",
            });

        expect(response.status).toBe(400);

        expect(response.body).toEqual({
            error: "Le titre est obligatoire",
        });
    });

    it("crée une autre tâche avec l'id 1", async () => {
    const response = await request(app)
        .post("/api/tasks")
        .send({
            title: "Faire le projet",
            scheduledAt: "2026-11-21T10:00:00-05:00",
        });

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(1);
    });

});
