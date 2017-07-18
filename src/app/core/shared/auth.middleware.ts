import {
  Body, Controller, Delete, Get, HttpStatus,
  Middleware, NestMiddleware, Param, Post, Query, Req, Res, UseFilters
} from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SETTINGS } from "../../../environments/environment";
import { LoggerService } from "../../core/shared/logger.service";
import { UnauthorizedException, UnknowExceptionFilter } from "./exceptions";
import { ROLE } from "./enums";
import { checkUserRoles } from "../utils/utils";
import { IUser } from "../../routes/users/users.models";

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  private logger: LoggerService = new LoggerService('AuthMiddleware');
  public resolve(roles?: ROLE[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.headers['authorization'] as string;
      if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token) {
          const user: IUser = verify(token, SETTINGS.secret) as IUser;
          checkUserRoles(user, roles);
          req['session'] = user;
          return next();
        }
      }
      throw new UnauthorizedException('No authorization found');
    };
  }

}
