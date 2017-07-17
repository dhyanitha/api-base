import { Component, HttpStatus } from "@nestjs/common";
import * as nodemailer from 'nodemailer';
import { SETTINGS } from "../../../environments/environment";
import { LoggerService } from "../../core/shared/logger.service";
import { IMessage } from './mails.models';

@Component()
export class MailsService {
  private transporter: any;
  private logger = new LoggerService('MailsService');
  constructor() {
    this.logger.value('SETTINGS.mailerSettings', SETTINGS.mailerSettings);
    this.transporter = nodemailer.createTransport(SETTINGS.mailerSettings);
  }

  public async sendMail(message: IMessage) {
    return this.transporter.sendMail(message);
  }
}
