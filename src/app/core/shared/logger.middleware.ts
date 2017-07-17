import {
    Body, Controller, Delete, Get, HttpStatus, Logger,
    Middleware, NestMiddleware, Param, Post, Query, Req, Res
} from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Middleware()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('LoggerMiddleware');
    public resolve() {
        return (req: Request, res: Response, next: NextFunction) => {
            this.logger.log(`[${req.method}] ${req.url} ${JSON.stringify(req.body)}`);
            next();
        };
    }
}
