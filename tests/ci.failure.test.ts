import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../src/app.js";

/**
 * DÉMONSTRATION PÉDAGOGIQUE — QUALITY GATE CI
 *
 * Objectif :
 * Démontrer qu'un test défaillant provoque l'échec
 * de la pipeline GitHub Actions.
 *
 * Fonctionnement :
 * - GET /health retourne normalement HTTP 200.
 * - Ce test attend volontairement HTTP 503.
 * - L'assertion échoue lorsque le test est activé.
 * - GitHub Actions interrompt les étapes suivantes.
 *
 * Pour la démonstration :
 * Remplacer it.skip(...) par it(...).
 *
 * Après la démonstration :
 * Remettre it.skip(...) pour désactiver le test.
 */

describe("Démonstration d'un échec CI", () => {

    it.skip("simule une attente incorrecte sur /health", async () => {

        const response = await request(app).get("/health");

        // Erreur volontaire : la vraie réponse est HTTP 200.
        expect(response.status).toBe(503);

    });

});