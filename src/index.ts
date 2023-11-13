import express, {Express, Request, Response} from "express";
import { HistoryRouter } from "./handler/history/history.router";
import { UserRouter } from "./handler/user/user.router";

const app = express();
const port = 5000;

app.use(express.json());

app.use('/history', HistoryRouter);
app.use('/user', UserRouter);
app.get("/", (req, res) => {
    res.send("test get home");
})

app.get("/test", (req, res) => {
    res.send("test get");
})

app.post("/test", (req, res) => {
    res.send("ganti dong");
})

app.listen(port, () =>{
    console.log(`listening on port ${port}`);
})

console.log("successfully started")