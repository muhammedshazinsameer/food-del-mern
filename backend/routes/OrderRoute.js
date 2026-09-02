import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeOrder , verifyOrder , userOrders, ListOrders , UpdateStatus, DeleteOrder } from '../controllers/ordercontroller.js'

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders", authMiddleware , userOrders)
orderRouter.get("/list",ListOrders)
orderRouter.post('/status',UpdateStatus)
orderRouter.post('/delete',DeleteOrder)

export default orderRouter;