import { User } from "../../interfaces/User";
import express from "express";
import type { Request, Response } from "express";

import * as UserServices from './user.service'

export const UserRouter = express.Router()

UserRouter.post('/check-username', async (request: Request, response: Response) => {
    try {
        const responseString = await UserServices.checkUsername(request.body.username);
        return response.status(200).json(responseString);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

UserRouter.post('/check-email', async (request: Request, response: Response) => {
    try {
        const responseString = await UserServices.checkEmail(request.body.email);
        return response.status(200).json(responseString);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

UserRouter.post('/register', async (request: Request, response: Response) => {
    try {
        const user : User = {
            id : 0,
            username : request.body.username,
            name : request.body.name,
            email : request.body.email,
            password : request.body.password,
            saldo : 0,
        };
        const responseString = await UserServices.register(user);
        return response.status(200).json(responseString);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

UserRouter.post('/login', async (request: Request, response: Response) => {
    try {
        const responseString = await UserServices.login(request.body.username, request.body.password);
        return response.status(200).json(responseString);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})