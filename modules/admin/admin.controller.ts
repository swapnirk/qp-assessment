import { NextFunction, Request, Response } from 'express';
import { pool } from '../../_helpers/db';
import { AppError } from '../../_middleware/globalErrorHandler';

export const addGroceryItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, price, quantity } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO grocery_items (name, price, quantity) VALUES (?, ?, ?)',
            [name, price, quantity]
        );
        res.status(201).json({ message: 'Item added successfully', itemId: (result as any).insertId }); // Return the ID of the inserted item
    } catch (error) {
        next(error); // Pass errors to global error handler
    }
};

export const getGroceryItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM grocery_items');
        res.json(rows);
    } catch (error) {
        next(error);
    }
};

export const updateGroceryItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const itemId = req.params.id;
        const { name, price, quantity } = req.body;
        const [result] = await pool.execute(
            'UPDATE grocery_items SET name = ?, price = ?, quantity = ? WHERE id = ?',
            [name, price, quantity, itemId]
        );

        if ((result as any).affectedRows === 0) {
            throw new AppError('Item not found', 404)
        }
        res.json({ message: 'Item updated successfully' });
    } catch (error) {
        next(error);
    }
}

export const deleteGroceryItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await pool.execute('DELETE FROM grocery_items WHERE id = ?', [id]);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        next(error);
    }
}

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [orders] = await pool.execute('SELECT * FROM orders ORDER BY order_date DESC'); // Order by date (newest first)

        if (!Array.isArray(orders)) throw new AppError('No orders found', 404);

        // Fetch order items for each order
        const ordersWithItems = await Promise.all(
            orders.map(async (order: any) => {
                const [orderItems] = await pool.execute(
                    'SELECT oi.*, gi.name AS item_name FROM order_items oi JOIN grocery_items gi ON oi.item_id = gi.id WHERE oi.order_id = ?',
                    [order.id]
                );
                return { ...order, items: orderItems };
            })
        );
        res.json(ordersWithItems);
    } catch (error) {
        next(error);
    }
}
