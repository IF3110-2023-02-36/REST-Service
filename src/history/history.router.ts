import express from "express";
import type { Request, Response } from "express";
// import { body, validationResult } from "express-validator";

import * as HistoryServices from './history.service'

export const HistoryRouter = express.Router()

HistoryRouter.get('/', async (request: Request, response: Response) => {
    try {
        const history = await HistoryServices.getHistory();
        return response.status(200).json(history);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

HistoryRouter.get('/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        const history = await HistoryServices.getHistoryDetail(id);
        return response.status(200).json(history);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})