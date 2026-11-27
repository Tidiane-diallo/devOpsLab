import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Démonstration d'un échec CI", () => {
  it("simule une attente incorrecte sur /health", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(503);
  });
});