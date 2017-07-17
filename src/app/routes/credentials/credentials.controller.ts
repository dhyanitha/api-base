import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res, Session, UseFilters, Patch } from '@nestjs/common';
import { Request, Response } from 'express';
import { SETTINGS } from '../../../environments/environment';
import { LoggerService } from "../../core/shared/logger.service";
import { UsersService } from "../users/users.service";
import { ROLE } from "./../../core/shared/enums";
import { CredentialsLogic } from "./credentials.logic";
import {
  IUserActivation,
  IUserClientRegistration, IUserConfirmation,
  IUserCredential, IUserGodRegistration,
  IUserInvitation, IUserPublicRegistration, IUserAcceptInvitation,
  ICredential
} from "./credentials.models";

@Controller('credentials')
export class CredentialsController {
  private logger: LoggerService = new LoggerService('CredentialsController');
  constructor(
    private credentialsLogic: CredentialsLogic) { }

  @Post('bigbang')
  public async postUserGodRegistration( @Res() res: Response, @Body() secret: any) {
    if (secret.secret !== SETTINGS.secret) {
      this.logger.warn('invalid god secret: ' + JSON.stringify(secret));
      res.status(HttpStatus.UNAUTHORIZED).json(secret);
      return;
    }
    const userRegistration: IUserGodRegistration = {
      email: 'admin@agorabinaria.com',
      name: 'System Administrator',
      password: SETTINGS.secret
    };
    const newUser = await this.credentialsLogic.postUserGodRegistration(userRegistration);
    this.logger.value('newUser', newUser);
    res.status(HttpStatus.CREATED).json(newUser);
  }

  @Post('client')
  public async postUserClientRegistration( @Res() res: Response, @Body() userRegistration: IUserClientRegistration) {
    const newUser = await this.credentialsLogic.postUserClientRegistration(userRegistration);
    this.logger.value('newUser', newUser);
    res.status(HttpStatus.CREATED).json(newUser);
  }

  @Post('public')
  public async postUserPublicRegistration( @Res() res: Response, @Body() userRegistration: IUserPublicRegistration) {
    const newUser = await this.credentialsLogic.postUserPublicRegistration(userRegistration);
    this.logger.value('newUser', newUser);
    res.status(HttpStatus.CREATED).json(newUser);
  }

  @Post('invitation')
  public async postUserInvitation( @Res() res: Response, @Body() userInvitation: IUserInvitation) {
    const newUser = await this.credentialsLogic.postUserInvitation(userInvitation);
    this.logger.value('newUser', newUser);
    res.status(HttpStatus.CREATED).json(newUser);
  }

  @Post('confirmation')
  public async postUserConfirmation( @Res() res: Response, @Body() userConfirmation: IUserConfirmation) {
    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Post('activation')
  public async postUserActivation( @Res() res: Response, @Body() userActivation: IUserActivation) {
    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Post()
  public async postCredentials( @Res() res: Response, @Body() userCredential: IUserCredential) {
    this.logger.value('userCredential', userCredential);
    const token = await this.credentialsLogic.getUserToken(userCredential);
    res.status(HttpStatus.CREATED).json({ access_token: token });
  }

  @Post('aceptInvitation')
  public async postInvitationAccept( @Res() res: Response, @Body() invitationCredential: IUserAcceptInvitation) {
    const token = await this.credentialsLogic.aceptInvitation(invitationCredential);
    res.status(HttpStatus.ACCEPTED).json({ access_token: token });
  }

  @Patch('newPassword')
  public async postNewCredentials( @Res() res: Response, @Body() newCredentials: ICredential, @Session() session: ICredential) {
    //newCredentials.userId = session._id;
    await this.credentialsLogic.updateCredential(newCredentials);
    res.status(HttpStatus.OK);
  }

}
