import { Router } from "express";
import { createOrder } from "./user.controller";

const router = Router();

router.post('/orders', createOrder);

export default router;