import { Module, Shared } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { LoggerService } from "./logger.service";

@Shared()
@Module({
  components: [DatabaseService],
  exports: [DatabaseService],
})
export class SharedModule { }
