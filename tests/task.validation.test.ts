import { describe, expect, it } from "vitest";
import { isTaskTitleValid } from "../src/tasks/task.validation.js";

describe("Validation du titre d'une tâche", () => {

    it("accepte un titre non vide", () => {
        const result = isTaskTitleValid("Title non vide");

        expect(result).toBe(true);
    });

    it("refuse un titre vide", () => {
        const result = isTaskTitleValid("");

        expect(result).toBe(false);
    });

    it("refuse un titre contenant uniquement des espaces", () => {
        const result = isTaskTitleValid("     ");

        expect(result).toBe(false);
    });
});