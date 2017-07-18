import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SharedModule } from '../../core/shared/shared.module';
import { UsersModule } from '../users/users.module';
import { AuthMiddleware } from './../../core/shared/auth.middleware';
import { CredentialsController } from './credentials.controller';
import { CredentialsLogic } from "./credentials.logic";
import { CredentialsService } from './credentials.service';
import { ROLE } from "../../core/shared/enums";

@Module({
  components: [CredentialsLogic, CredentialsService],
  controllers: [CredentialsController],
  exports: [CredentialsLogic],
  modules: [UsersModule, SharedModule],
})
export class CredentialsModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(AuthMiddleware)
      // .with([ROLE.ADMIN])
      .forRoutes({
        path: 'credentials/invitation',
        method: RequestMethod.POST
      }, {
        path: 'credentials/newPassword',
        method: RequestMethod.PATCH
      });
  }
}
