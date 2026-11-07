import express from "express";

const app = express(); 

app.get ("/", (req, res) => {
    res.send("DevOpsLab API fonctionne correctement avec Git !");
})

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
    })
});

export default app;