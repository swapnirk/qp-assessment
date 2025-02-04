import mysql from 'mysql2/promise'; // Use promise-based MySQL
import { connectionUri } from "../config";

export const pool = mysql.createPool(connectionUri);

// await pool.execute(`CREATE TABLE grocery_items (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     price DECIMAL(10, 2) NOT NULL,
//     quantity INT NOT NULL
// )`)

// await pool.execute(`CREATE TABLE orders (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// )`);

// await pool.execute(`CREATE TABLE order_items (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     order_id INT NOT NULL,
//     item_id INT NOT NULL,
//     quantity INT NOT NULL,
//     price DECIMAL(10, 2) NOT NULL,
//     FOREIGN KEY (order_id) REFERENCES orders(id),
//     FOREIGN KEY (item_id) REFERENCES grocery_items(id)
//  )`);
