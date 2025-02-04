import express from 'express';
import helmet from "helmet";
import dotenv from 'dotenv';
dotenv.config();
import { default as rateLimit } from "express-rate-limit";
import { globalErrorHandler } from "./_middleware/globalErrorHandler";
import adminRoutes from './modules/admin/admin.routes';
import userRoutes from './modules/user/user.routes';
import { getGroceryItems } from './modules/admin/admin.controller';

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(limiter)
app.use(helmet());
app.disable("x-powered-by");



app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/items", getGroceryItems)

app.use(globalErrorHandler);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
