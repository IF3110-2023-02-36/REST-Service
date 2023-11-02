import express, {Express, Request, Response} from "express";
const app = express();
const port = 5000;

app.get("/", (req, res) => {
    res.send("test get home");
})

app.get("/test", (req, res) => {
    res.send("test get");
})

app.post("/test", (req, res) => {
    res.send("test post ganti gak");
})

app.listen(port, () =>{
    console.log(`listening on port ${port}`);
})

console.log("successfully started")