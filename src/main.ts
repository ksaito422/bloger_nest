import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { firebaseConfig } from 'src/config/firebaseConfig';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      dismissDefaultMessages: true,
      errorHttpStatusCode: 422,
    }),
  );

  admin.initializeApp(firebaseConfig);
  await app.listen(8000);
}
bootstrap();
