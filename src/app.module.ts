import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './domains/article/article.module';
import { AuthModule } from './domains/auth/auth.module';
import { UserModule } from './domains/user/user.module';
import { MyLoggerModule } from './loggers/myLogger.module';
import { TypeormLoggerModule } from 'src/loggers/typeormLogger.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ArticleModule,
    AuthModule,
    UserModule,
    MyLoggerModule,
    TypeormLoggerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
