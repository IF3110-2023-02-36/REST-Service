import express, {Express, Request, Response} from "express";
import { HistoryRouter } from "./handler/history/history.router";
import { UserRouter } from "./handler/user/user.router";
import cors from "cors";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
// logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`); 
    next(); 
});

app.use('/history', HistoryRouter);
app.use('/user', UserRouter);

app.listen(port, () =>{
    console.log(`listening on port ${port}`);
})

console.log("successfully started")