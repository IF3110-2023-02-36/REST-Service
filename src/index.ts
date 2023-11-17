import express, {Express, NextFunction, Request, Response} from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

import { HistoryRouter } from "./handler/history/history.router";
import { OrderRouter } from "./handler/order/order.router";
import { UserRouter } from "./handler/user/user.router";
import cors from "cors";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());



// logger
app.use((req, res, next) => {
    
    next(); 
});

app.use('/history', HistoryRouter);
app.use('/order', OrderRouter);
app.use('/user', UserRouter);

app.listen(port, () =>{
    console.log(`listening on port ${port}`);
})

console.log("successfully started")