import express from 'express'
import authMiddleware from '../midddleware/auth.js'
import { listOrders, placeorder, updateStatus, userOrders, verifyOrder } from '../controllers/ordercontroller.js'


const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeorder) ;
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userOrders",authMiddleware,userOrders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus)

export default orderRouter;

 