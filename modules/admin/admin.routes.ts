import { Router } from "express";
import { addGroceryItem, deleteGroceryItem, getGroceryItems, getOrders, updateGroceryItem } from "./admin.controller";

const router = Router();

router.post('/items', addGroceryItem); // Example route using controller
router.put('/items/:id', updateGroceryItem);
router.delete('/items/:id', deleteGroceryItem);

router.get('/orders', getOrders) 

export default router;