import express from "express";
import type { Request, Response } from "express";

import * as OrderServices from './order.service'

export const OrderRouter = express.Router()

OrderRouter.get('/available-order', async (request: Request, response: Response) => {
    try {
        const availableOrder = await OrderServices.getAvailableOrder();
        return response.status(200).json(availableOrder);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})