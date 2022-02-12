import { Module, Inject } from '@nestjs/common';
import {
  TypeOrmModule,
  TypeOrmOptionsFactory,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { TypeormLoggerService } from 'src/loggers/typeormLogger.service';

class TypeOrmOptions implements TypeOrmOptionsFactory {
  constructor(
    @Inject(TypeormLoggerService) private readonly logger: TypeormLoggerService,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions & {
    seeds: string[];
    factories: string[];
  } {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/entities/**/*{.js,.ts}'],
      migrations: ['dist/databases/migration/**/*{.js,.ts}'],
      seeds: ['dist/databases/seeder/*{.js,.ts}'],
      factories: ['dist/databases/factory/*{.js,.ts}'],
      synchronize: false,
      cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/databases/migration',
      },
      logger: this.logger,
    };
  }
}

@Module({
  providers: [TypeormLoggerService],
  exports: [TypeormLoggerService],
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [TypeormLoggerModule],
      useClass: TypeOrmOptions,
    }),
  ],
})
export class TypeormLoggerModule {}
