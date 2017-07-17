import { Body, Controller, Delete, ExceptionFilters, Get, HttpStatus, Param, Post, Res, Session } from '@nestjs/common';
import { Request, Response } from 'express';
import { IUser } from "./users.models";
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get()
  public async getAll( @Res() res: Response) {
    const users = await this.usersService.getAll();
    res.status(HttpStatus.OK).json(users);
  }

  @Get('count')
  public async getCount( @Res() res: Response) {
    const usersCount = await this.usersService.getCount();
    res.status(HttpStatus.OK).json({ data: usersCount });
  }

  @Get('/me')
  public async getMe( @Res() res: Response, @Session() session: IUser) {
    const userId = session._id;
    const users = await this.usersService.getById(userId);
    res.status(HttpStatus.OK).json(users);
  }

  @Get('/:id')
  public async getById( @Res() res: Response, @Param('id') id: string) {
    const user = await this.usersService.getById(id);
    if (user) {
      res.status(HttpStatus.OK).json(user);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
    }
  }

  @Delete('/:id')
  public async remove( @Res() res: Response, @Param('id') id: string) {
    await this.usersService.remove(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
