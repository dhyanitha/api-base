import { Middleware, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError, verify } from 'jsonwebtoken';
import { SETTINGS } from './../../../environments/environment';
import { ROLE } from "./enums";
import { ForbiddenException, UnauthorizedException } from './exceptions';

@Middleware()
export class RolesMiddleware implements NestMiddleware {
  public resolve(roles: ROLE[]): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = req['session'];
      const isAuth = roles.some(rol => {
        return user.roles.some(userRol => {
          return userRol === rol;
        });
      });
      if (isAuth) {
        return next();
      }
      throw new ForbiddenException('');
    };
  }

}
