import express from "express";
import { isTaskTitleValid } from "./tasks/task.validation.js";
import {
    createTask,
    getTasks,
    getTaskById,
    updateTaskCompleted,
    deleteTask,
} from "./tasks/task.store.js";


const app = express(); 
app.use(express.json());


app.get ("/", (req, res) => {
    res.send("DevOpsLab API fonctionne correctement !");
})

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
    })
});

app.get("/api/tasks", (req, res) => {
    const tasks = getTasks();

    return res.status(200).json(tasks);
});


app.get("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "Identifiant invalide",
        });
    }

    const task = getTaskById(id);

    if (!task) {
        return res.status(404).json({
            error: "Tâche introuvable",
        });
    }

    return res.status(200).json(task);
});

app.post("/api/tasks", (req, res) => {
   
    const title = req.body?.title;
    const scheduledAtInput = req.body?.scheduledAt;

    if(typeof title !=="string" || !isTaskTitleValid(title)){
        return res.status(400).json({
            error: "Le titre est obligatoire",
        });
    }

    if(typeof scheduledAtInput !== "string"){
        return res.status(400).json({
            error: "La date est obligatoire",
        });
    }

    const scheduledAt = new Date(scheduledAtInput);

    if(Number.isNaN(scheduledAt.getTime())){
        return res.status(400).json({
            error: "La date est invalide",
        });
    }

    const task = createTask(title, scheduledAt);

    return res.status(201).json(task);
});

//Modification partielle d'une tache
app.patch("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "Identifiant invalide",
        });
    }

    const completed = req.body?.completed;

    if (typeof completed !== "boolean") {
        return res.status(400).json({
            error: "Le statut completed doit être un booléen",
        });
    }

    const task = updateTaskCompleted(id, completed);

    if (!task) {
        return res.status(404).json({
            error: "Tâche introuvable",
        });
    }

    return res.status(200).json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "Identifiant invalide",
        });
    }

    const deletedTask = deleteTask(id);

    if (!deletedTask) {
        return res.status(404).json({
            error: "Tache introuvable",
        });
    }

    return res.status(200).json(deletedTask);
});

export default app;