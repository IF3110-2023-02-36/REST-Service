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

OrderRouter.get('/order/:id', async (request: Request, response: Response) => {
    try {
        const order = await OrderServices.getOrderById(parseInt(request.params.id));
        return response.status(200).json(order);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

OrderRouter.put('/order/:id', async (request: Request, response: Response) => {
    try {
        const orderId = parseInt(request.params.id);
        const username = request.body.username;
        const status = request.body.status;
        const description = request.body.description;
        const res = await OrderServices.updateOrder(orderId, username, status, description);
        return response.status(200).json(res);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

OrderRouter.get('/order-details/:id', async (request: Request, response: Response) => {
    try {
        const orderDetails = await OrderServices.getOrderDetails(parseInt(request.params.id));
        return response.status(200).json(orderDetails);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

OrderRouter.get('/order-courier/:id', async (request: Request, response: Response) => {
    try {
        const orders = await OrderServices.getOrderByCourier(parseInt(request.params.id));
        return response.status(200).json(orders);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

OrderRouter.put('/pick-order', async (request: Request, response: Response) => {
    try {
        const orderId : number = request.body.orderId;
        const username : string = request.body.username;
        const res = await OrderServices.pickOrder(orderId, username);
        return response.status(200).json(res);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

OrderRouter.put('/finish-order', async (request: Request, response: Response) => {
    try {
        const orderId : number = request.body.orderId;
        const username : string = request.body.username;
        const res = await OrderServices.finishOrder(orderId, username);
        return response.status(200).json(res);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})