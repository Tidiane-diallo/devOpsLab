import express from "express";

const app = express();
const PORT = Number(process.env.PORT ?? 3000); 

app.get ("/", (req, res) => {
    res.send("DevOpsLab API fonctionne correctement !");
})

app.listen (PORT, () =>{
    console.log(`Serveur demarre sur http://localhost:${PORT}`);
})

