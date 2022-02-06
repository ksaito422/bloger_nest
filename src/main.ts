import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { firebaseConfig } from 'src/configs/firebaseConfig';
import * as admin from 'firebase-admin';
import { HttpExceptionFilter } from 'src/filters/httpException.filter';

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
  app.useGlobalFilters(new HttpExceptionFilter());

  admin.initializeApp(firebaseConfig);
  await app.listen(8000);
}
bootstrap();
