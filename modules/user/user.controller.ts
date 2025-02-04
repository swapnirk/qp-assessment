import { NextFunction, Request, Response } from 'express';
import { pool } from '../../_helpers/db';
import { AppError } from '../../_middleware/globalErrorHandler';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { items } = req.body; // items: [{ itemId: number, quantity: number }, ...]

        if (!Array.isArray(items) || items.length === 0) {
            throw new AppError('Invalid order items', 400);
        }

        await pool.query('START TRANSACTION'); // Start transaction for atomicity

        try {
            const [orderResult] = await pool.execute('INSERT INTO orders (order_date) VALUES (NOW())');
            const orderId = (orderResult as any).insertId; // Get the ID of the new order
            const orderSummary: any = [];

            for (const item of items) {
                const { itemId, quantity } = item;
                const [itemDetails] = await pool.execute('SELECT price, quantity FROM grocery_items WHERE id = ?', [itemId]);

                if (!(itemDetails as any)[0] || (itemDetails as any)[0].quantity < quantity) {
                    throw new Error("Insufficient stock or invalid item ID"); // Throw error to rollback
                }
                const { name, price } = (itemDetails as any)[0];
                await pool.execute(
                    'INSERT INTO order_items (order_id, item_id, quantity, price) VALUES (?, ?, ?, ?)',
                    [orderId, itemId, quantity, price]
                );

                await pool.execute('UPDATE grocery_items SET quantity = quantity - ? WHERE id = ?', [quantity, itemId]);

                orderSummary.push({
                    itemId,
                    name,
                    quantity,
                    price,
                    subtotal: price * quantity,
                });
            }
            await pool.query('COMMIT');
            res.status(201).json({ message: 'Order placed successfully' });
        } catch (error) {
            await pool.query('ROLLBACK'); // Rollback if any error during order processing
            throw error; // Re-throw the error to be caught by the outer catch block
        }
    } catch (error) {
        next(error); // Pass errors to global error handler
    }
}