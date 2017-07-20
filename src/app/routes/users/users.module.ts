import { MiddlewaresConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from './../../core/shared/auth.middleware';
import { RolesMiddleware } from './../../core/shared/roles.middleware';
import { SharedModule } from './../../core/shared/shared.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersLogic } from './users.logic';

@Module({
  components: [UsersService,UsersLogic],
  controllers: [UsersController],
  exports: [UsersService, UsersLogic],
  modules: [SharedModule],
})
export class UsersModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(UsersController);
  }
}
