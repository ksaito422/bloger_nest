import { Injectable, Logger } from '@nestjs/common';
import { Logger as TypeormLogger, QueryRunner } from 'typeorm';

@Injectable()
export class TypeormLoggerService implements TypeormLogger {
  private readonly logger = new Logger();

  log(
    level: 'log' | 'info' | 'warn',
    message: any,
    queryRunner?: QueryRunner,
  ): void {
    console.log(message);
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): void {
    this.logger.debug(`[SQL] ${query}`);
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): void {
    this.logger.error(`[SQL] ${query}`);
  }

  logMigration(message: string, queryRunner?: QueryRunner): void {
    return;
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): void {
    console.log(query);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner): void {
    return;
  }
}
