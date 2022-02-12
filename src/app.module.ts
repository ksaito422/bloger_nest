import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './domains/article/article.module';
import { AuthModule } from './domains/auth/auth.module';
import { UserModule } from './domains/user/user.module';
import { MyLoggerModule } from './loggers/myLogger.module';
import { TypeormLoggerModule } from 'src/loggers/typeormLogger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ArticleModule,
    AuthModule,
    UserModule,
    MyLoggerModule,
    TypeormLoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
