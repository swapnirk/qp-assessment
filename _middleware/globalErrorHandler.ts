import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor); // Capture stack trace for debugging
    }
}

// Global error handler middleware
export const globalErrorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    console.error("Global Error Handler caught an error:", err); // Log the error for debugging

    if (err instanceof AppError) { // Check if it's a custom AppError
        res.status(err.statusCode).json({ message: err.message });
    } else if (err instanceof SyntaxError) { // Check if it's a JSON parsing error
        res.status(400).json({ message: "Invalid JSON payload" });
    }
    else { // Generic error
        res.status(500).json({ message: 'Something went wrong!' }); // Don't expose too much info in production
    }
};