import {
  Body, Controller, Delete, ExceptionFilters,
  Get, HttpStatus, Param, Post, Query, Res, Session, Patch
} from '@nestjs/common';
import { Request, Response } from "express";
import { ROLE } from "../../core/shared/enums";
import { LoggerService } from "../../core/shared/logger.service";
import { UsersService } from "../users/users.service";
import { IOrganization } from './organizations.models';
import { OrganizationsService } from "./organizations.service";

@Controller('organizations')
export class OrganizationsController {
  private logger: LoggerService = new LoggerService('OrganizationsController');
  constructor(
    private organizationsService: OrganizationsService,
    private usersService: UsersService
  ) { }

  @Get()
  public async getAll( @Res() res: Response) {
    const organizations = await this.organizationsService.getAll();
    res.status(HttpStatus.OK).json(organizations);
  }

  @Get('/byId/:id/')
  public async getById(
    @Res() res: Response,
    @Param('id') id: string) {
    const organization = await this.organizationsService.getById(id);
    res.status(HttpStatus.OK).json(organization);
  }

  @Get('count')
  public async getCount( @Res() res: Response) {
    const organizationsCount = await this.organizationsService.getCount();
    res.status(HttpStatus.OK).json({ data: organizationsCount });
  }

  @Get('/:slug/')
  public async getBySlug(
    @Res() res: Response,
    @Param('slug') slug: string) {
    const organization = await this.organizationsService.getBySlug(slug);
    res.status(HttpStatus.OK).json(organization);
  }

  @Get('/:id/users')
  public async getByIdRole(
    @Res() res: Response,
    @Param('id') id: string, @Query('role') role: string) {
    const organizationUsers = await this.usersService.getByOrganizationRole(id, ROLE[role]);
    res.status(HttpStatus.OK).json(organizationUsers);
  }

  @Post()
  public async post( @Res() res: Response, @Body() organization: IOrganization) {
    const newOrganization = await this.organizationsService.post(organization);
    if (newOrganization) {
      this.logger.value('newOrganization', newOrganization);
      res.status(HttpStatus.CREATED).json(newOrganization);
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Not created' });
    }
  }

  @Patch()
  public async update( @Res() res: Response, @Body() organization: IOrganization) {
    const updatedOrganization = await this.organizationsService.patch(organization);
    if (updatedOrganization) {
      //this.logger.value('updatedOrganization', updatedOrganization);
      res.status(HttpStatus.CREATED).json(updatedOrganization);
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Not updated' });
    }
  }

  @Delete('/:id')
  public async delete( @Res() res: Response, @Param('id') id: string, ) {
    await this.organizationsService.delete(id);
    this.logger.value('deletedOrganization !!!', id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
