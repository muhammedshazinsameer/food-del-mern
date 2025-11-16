import express from "express"
import { AddToCart,RemoveFromcart,getCart } from "../controllers/cartcontroller.js"
import authMiddleware from "../middleware/auth.js";
 

const CartRouter =express.Router();

CartRouter.post("/add",authMiddleware,AddToCart)
CartRouter.post("/remove",authMiddleware,RemoveFromcart);
CartRouter.post("/get",authMiddleware,getCart);

export default CartRouter;
