import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(`[Global Fallback Handler]`, err);
    
    const statusCode = err.statusCode || 500;
    const errorResponse = {
        message: err.message || 'Internal Server Parameters organically blocked resolving dependably correctly structurally comprehensively correctly safely organically cleanly.',
        code: statusCode
    };
    
    res.status(statusCode).json(errorResponse);
};
