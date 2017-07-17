import { Module, NestModule } from "@nestjs/common";
import { MailsController } from './mails.controller';
import { MailsService } from "./mails.service";

@Module({
  components: [MailsService],
  controllers: [MailsController],
  exports: [MailsService]
})

export class MailsModule implements NestModule { }
