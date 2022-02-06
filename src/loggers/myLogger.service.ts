import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class MyLoggerService implements LoggerService {
  logger: Logger;

  constructor() {
    const { combine, timestamp, printf, colorize } = format;

    // エラーログのローテーション定義
    const transport: DailyRotateFile = new DailyRotateFile({
      level: 'error',
      dirname: 'log/error/',
      filename: `log_%DATE%.log`,
      datePattern: 'YYYY-MM_DD',
      zippedArchive: true,
      maxFiles: '14d',
    });

    // ログローテーションするタイミングのイベント
    // eslint-disable-next-line
    transport.on('rotate', () => {});

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

        transport,
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
