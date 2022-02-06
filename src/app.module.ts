import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './domains/article/article.module';
import { AuthModule } from './domains/auth/auth.module';
import { UserModule } from './domains/user/user.module';
import { MyLoggerModule } from './loggers/myLogger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ArticleModule,
    AuthModule,
    UserModule,
    MyLoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
