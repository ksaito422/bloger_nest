import { Injectable } from '@nestjs/common';
import { Logger, QueryRunner } from 'typeorm';

@Injectable()
export class TypeormLoggerService implements Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    console.log(query);
  }

  log(
    level: 'log' | 'info' | 'warn',
    message: any,
    queryRunner?: QueryRunner,
  ): any {
    console.log(message);
  }

  logMigration(message: string, queryRunner?: QueryRunner): any {
    console.log(message);
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): any {
    console.log(query);
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): any {
    console.log(query);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    console.log(message);
  }
}
