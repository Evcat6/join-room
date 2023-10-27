import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new transports.Console()],
});

export { logger };
