import express from "express";
import type { Request, Response } from "express";

import * as HistoryServices from './history.service'
import { ValidationRequest, accessValidation } from "../middleware/middleware";

export const HistoryRouter = express.Router()

HistoryRouter.get('/', accessValidation, async (request: Request, response: Response) => {
    try {
        const validationRequest = request as ValidationRequest;
        const { authorization } = validationRequest.headers;
        console.log(authorization)
        const history = await HistoryServices.getHistory(request.params.username);
        return response.status(200).json(history);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

HistoryRouter.get('/detail/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        const history = await HistoryServices.getHistoryDetail(id);
        return response.status(200).json(history);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

HistoryRouter.get('/history/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        const history = await HistoryServices.getHistoryById(id);
        return response.status(200).json(history);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

HistoryRouter.get('/penerima/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    console.log(id)
    try {
        const history = await HistoryServices.getHistoryByIdPenerima(id);
        // console.log(history);/
        return response.status(200).json(history);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

HistoryRouter.put('/rating/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    const rating  = request.body.rating;
    console.log(request.body);
    console.log(id)
    console.log(rating);
    try {
        const history = await HistoryServices.updateRating(id, rating);
        return response.status(200).json("success");
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})