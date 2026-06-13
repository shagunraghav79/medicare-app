import express from 'express'
import { addtocart,removefromcart,gercart } from '../controllers/cartcontroller.js'
import authMiddleware from '../midddleware/auth.js';



const cartRouter=express.Router();

cartRouter.post("/add",authMiddleware, addtocart)
cartRouter.post("/remove",authMiddleware, removefromcart)
cartRouter.post("/get",authMiddleware, gercart)

export default cartRouter; 