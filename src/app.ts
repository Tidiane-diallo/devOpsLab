import express from "express";
import { isTaskTitleValid } from "./tasks/task.validation.js";
import { createTask } from "./tasks/task.store.js"

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

export default app;