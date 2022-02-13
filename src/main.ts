import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe, VersioningType } from '@nestjs/common';
import { firebaseConfig } from 'src/configs/firebaseConfig';
import * as admin from 'firebase-admin';
import { HttpExceptionFilter } from 'src/filters/httpException.filter';
import { DbExceptionFilter } from 'src/filters/dbException.filter';
import { MyLoggerService } from 'src/loggers/myLogger.service';
import { UnprocessableEntityException } from 'src/filters/exception/unprocessableEntity.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,PATCH,DELETE,HEAD',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      dismissDefaultMessages: true,
      // stopAtFirstError: true,
      exceptionFactory: (err) => {
        throw new UnprocessableEntityException(err);
      },
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter(), new DbExceptionFilter());
  app.useLogger(app.get(MyLoggerService));

  admin.initializeApp(firebaseConfig);

  const config = new DocumentBuilder()
    .setTitle('Zenn')
    .setDescription('The zenn API description')
    .setVersion('1.0')
    .addTag('zenn')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000);
}
bootstrap();
