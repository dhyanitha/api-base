import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app/app.module';
import { STAGES } from './app/core/shared/enums';
import { NotFoundException, UnknowExceptionFilter } from './app/core/shared/exceptions';
import { SETTINGS } from './environments/environment';

const logger = new Logger('Main');
const instance = express();
instance.use(bodyParser.json());
instance.use(cors());
if (SETTINGS.env === STAGES.prod) {
  instance.use(express.static(SETTINGS.path));
}

const app = NestFactory.create(AppModule, instance);
app.setGlobalPrefix('api');
app.useGlobalFilters(new UnknowExceptionFilter());
app.init();

if (SETTINGS.env === STAGES.prod) {
  instance.get('*', (req, res, next) => {
    res.sendFile(join(SETTINGS.path, 'index.html'));
  });
}

app.listen(SETTINGS.port, () => logger.log(`Application is listening on port ${SETTINGS.port}`));
