import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';

@Injectable()
export class MyLoggerService implements LoggerService {
  logger: Logger;

  constructor() {
    const { combine, timestamp, printf, json, colorize } = format;

    // ログ出力ファイルのフォーマット
    const fileFormat = combine(timestamp(), json());

    // コンソール出力用のフォーマット
    const consoleFormat = combine(
      colorize(),
      timestamp(),
      printf(({ level, message, timestamp }) => {
        return `[${level}] - ${timestamp} : ${message}`;
      }),
    );

    this.logger = createLogger({
      transports: [
        new transports.Console({
          level: 'debug',
          format: consoleFormat,
        }),

        new transports.File({
          filename: 'log/error.log',
          level: 'error',
          format: fileFormat,
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.log({
      level: 'info',
      message: `${message}`,
    });
  }

  error(message: string, trace: string) {
    this.logger.log({
      level: 'error',
      message: `${message}:${trace}`,
    });
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.log({
      level: 'debug',
      message: `${message}`,
    });
  }
}
