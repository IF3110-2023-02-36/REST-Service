import express, {Express, Request, Response} from "express";
const app = express();
const port = 8000;

console.log("tes")

app.get("/", (req, res) => {
    res.send("MEMEK jawsdjah");
})

app.get("/kon", (req, res) => {
    res.send("Kontolodon!!");
})

app.listen(port, () =>{
    console.log(`listening on port ${port}`);
})