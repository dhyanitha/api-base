import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from "express";
import { LoggerService } from "../../core/shared/logger.service";
import { IMessage } from './mails.models';
import { MailsService } from './mails.service';

@Controller('mails')
export class MailsController {
  constructor(private mailsService: MailsService) { }

  @Post('/register')
  public async register( @Res() res: Response, @Body('to') to: string) {
    const message: IMessage = {
      from: 'no-reply@test.com',
      to,
      subject: 'Welcome to the platform',
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Nam dignissim eros sit amet risus lacinia malesuada.
      Aenean tempus quam vel nunc accumsan, id feugiat eros vehicula.`,
      html: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Nam dignissim eros sit amet risus lacinia malesuada.
      Aenean tempus quam vel nunc accumsan, id feugiat eros vehicula.</p>`
    };
    const response = await this.mailsService.sendMail(message);
    if (response.messageId) {
      res.status(HttpStatus.OK).json({ message: "Message sent" });
    }
  }

  @Post('/invite')
  public async invite(@Res() res: Response, @Body('to') to: string, @Body('link') link: string) {
    const message: IMessage = {
      from: 'no-reply@test.com',
      to,
      subject: "Invitation to the platform",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Nam dignissim eros sit amet risus lacinia malesuada.
      Aenean tempus quam vel nunc accumsan, id feugiat eros vehicula.
      ${link}`,
      html: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Nam dignissim eros sit amet risus lacinia malesuada.
      Aenean tempus quam vel nunc accumsan, id feugiat eros vehicula.</p>
      <p><a href="${link}">Link to invitation</a></p>`
    };
    const response = await this.mailsService.sendMail(message);
    if(response.messageId) {
      res.status(HttpStatus.OK).json({message: "Message sent" });
    }
  }
}