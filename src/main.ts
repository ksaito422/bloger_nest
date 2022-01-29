import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { firebaseConfig } from 'src/config/firebaseConfig';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      dismissDefaultMessages: true,
      // stopAtFirstError: true,
      // exceptionFactory: (err) => {
      //   console.log(err[0].property);
      // },
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  admin.initializeApp(firebaseConfig);
  await app.listen(8000);
}
bootstrap();
