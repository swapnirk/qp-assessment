# Grocery Store API (Node.js, Express, TypeScript, MySQL)

This is a REST API for a grocery store, built using Node.js, Express, TypeScript, and MySQL. It provides endpoints for managing grocery items (admin) and placing orders (users).

## Features

- Base_URL = http://localhost:3000/api/v1

**Admin:**

- Add new grocery items (POST /admin/items)
- View existing grocery items (GET /items)
- Remove grocery items (DELETE /admin/items/:id)
- Update grocery item details (name, price, quantity) (PUT /admin/items/:id)
- Manage inventory levels
- View all orders (GET /admin/orders)


**User:**

- View available grocery items (GET /items)
- Place orders for multiple items (POST /user/orders)

## Technologies Used

- Node.js
- Express
- TypeScript
- MySQL
- dotenv (for environment variables)

## Installation

1.  Clone the repository: `git clone <repository_url>`
2.  Install dependencies: `npm install`
3.  Create a `.env` file in the root directory and add your MySQL database credentials:

```.env
NODE_ENV='development'
CONNECTION_URI="DB_connection_String"
PORT=3000 # Optional, defaults to 3000
```
