import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './core/shared/logger.middleware';
import { SharedModule } from './core/shared/shared.module';
import { CredentialsModule } from './routes/credentials/credentials.module';
import { MailsModule } from './routes/mails/mails.module';
import { OrganizationsModule } from "./routes/organizations/organizations.module";
import { UsersModule } from './routes/users/users.module';

@Module({
    modules: [SharedModule, CredentialsModule, OrganizationsModule, UsersModule, MailsModule],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
