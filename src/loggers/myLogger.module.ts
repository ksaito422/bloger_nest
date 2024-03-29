import { Module } from '@nestjs/common';
import { MyLoggerService } from 'src/loggers/myLogger.service';

@Module({
  providers: [MyLoggerService],
  exports: [MyLoggerService],
})
export class MyLoggerModule {}
