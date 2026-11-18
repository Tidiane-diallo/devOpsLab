import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { resetTasks } from "../src/tasks/task.store.js";
import app from "../src/app.js";

beforeEach(() => {
    resetTasks();
});

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

describe("GET /api/tasks", () => {

    it("retourne un tableau vide lorsqu'aucune tâche n'existe", async () => {
        const response = await request(app)
            .get("/api/tasks");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it("retourne les tâches créées", async () => {

        await request(app)
            .post("/api/tasks")
            .send({
                title: "Apprendre le DevOps",
                scheduledAt: "2026-11-20T18:00:00-05:00",
        });

        const response = await request(app)
            .get("/api/tasks");

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(1);

            expect(response.body[0]).toMatchObject({
                title: "Apprendre le DevOps",
                scheduledAt: "2026-11-20T23:00:00.000Z",
                completed: false,
            });
    });

});

describe("GET /api/tasks/:id", () => {

    it("retourne une tâche existante", async () => {
        await request(app)
            .post("/api/tasks")
            .send({
                title: "Apprendre Docker",
                scheduledAt: "2026-11-20T18:00:00-05:00",
            });

        const response = await request(app)
            .get("/api/tasks/1");

        expect(response.status).toBe(200);

        expect(response.body).toMatchObject({
            id: 1,
            title: "Apprendre Docker",
            scheduledAt: "2026-11-20T23:00:00.000Z",
            completed: false,
        });
    });

    it("retourne 404 lorsque la tâche n'existe pas", async () => {
        const response = await request(app)
            .get("/api/tasks/999");

        expect(response.status).toBe(404);

        expect(response.body).toEqual({
            error: "Tâche introuvable",
        });
    });

    it("retourne 400 lorsque l'identifiant n'est pas valide", async () => {
        const response = await request(app)
            .get("/api/tasks/bonjour");

        expect(response.status).toBe(400);

        expect(response.body).toEqual({
            error: "Identifiant invalide",
        });
    });

    it("refuse un identifiant inférieur ou égal à zéro", async () => {
        const response = await request(app)
            .get("/api/tasks/0");

        expect(response.status).toBe(400);

        expect(response.body).toEqual({
            error: "Identifiant invalide",
        });
    });

});

describe("PATCH /api/tasks/:id", () => {

    it("marque une tâche comme terminée", async () => {
        await request(app)
            .post("/api/tasks")
            .send({
                title: "Apprendre DevOps",
                scheduledAt: "2026-11-20T18:00:00-05:00",
            });

        const response = await request(app)
            .patch("/api/tasks/1")
            .send({
                completed: true,
            });

        expect(response.status).toBe(200);

        expect(response.body).toMatchObject({
            id: 1,
            title: "Apprendre DevOps",
            completed: true,
        });
    });

    it("retourne 404 si la tâche n'existe pas", async () => {
        const response = await request(app)
            .patch("/api/tasks/999")
            .send({
                completed: true,
            });

        expect(response.status).toBe(404);

        expect(response.body).toEqual({
            error: "Tâche introuvable",
        });
    });

    it("refuse une valeur completed invalide", async () => {
    await request(app)
        .post("/api/tasks")
        .send({
            title: "Apprendre DevOps",
            scheduledAt: "2026-11-20T18:00:00-05:00",
        });

    const response = await request(app)
            .patch("/api/tasks/1")
            .send({
                completed: "oui",
            });

        expect(response.status).toBe(400);

        expect(response.body).toEqual({
            error: "Le statut completed doit être un booléen",
        });
    });
});

describe("DELETE /api/tasks/:id", () => {

    it("Supprime une tache existante", async () => {
        await request(app)
            .post("/api/tasks")
            .send({
                title: "Tache a supprimer",
                scheduledAt: "2026-11-20T18:00:00-05:00",
            });

        const response = await request(app)
            .delete("/api/tasks/1");

        expect(response.status).toBe(200);

        expect(response.body).toMatchObject({
            id: 1,
            title: "Tache a supprimer",
        });
    });

    it("Retourne 404 si la tache n'existe pas", async () => {
        const response = await request(app)
            .delete("/api/tasks/999");

        expect(response.status).toBe(404);

        expect(response.body).toEqual({
            error: "Tache introuvable",
        });
    });

    it("Refuse un identifiant invalide", async () => {
        const response = await request(app)
            .delete("/api/tasks/bonjour");

        expect(response.status).toBe(400);

        expect(response.body).toEqual({
            error: "Identifiant invalide",
        });
    });


});