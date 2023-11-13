import { User } from "../../interfaces/User";
import express from "express";
import type { Request, Response } from "express";

import * as UserServices from './user.service'

export const UserRouter = express.Router()

UserRouter.post('/checkUsername', async (request: Request, response: Response) => {
    try {
        const responseString= await UserServices.checkUsername(request.body.username);
        return response.status(200).json(responseString);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

UserRouter.post('/checkEmail', async (request: Request, response: Response) => {
    try {
        const responseString= await UserServices.checkEmail(request.body.email);
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
        const responseString= await UserServices.register(user);
        return response.status(200).json(responseString);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

UserRouter.post('/validateLogin', async (request: Request, response: Response) => {
    try {
        const responseString= await UserServices.validateLogin(request.body.username, request.body.password);
        return response.status(200).json(responseString);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})
