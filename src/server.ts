import express from "express";

const app = express();
const PORT = Number(process.env.PORT ?? 3000); 

app.get ("/", (req, res) => {
    res.send("DevOpsLab API fonctionne correctement avec Git !");
})

app.listen (PORT, () =>{
    console.log(`Serveur demarre sur http://localhost:${PORT}`);
})

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "oK",
    })
});

