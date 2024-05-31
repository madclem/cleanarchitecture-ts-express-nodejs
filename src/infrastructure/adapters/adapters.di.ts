import { container } from "tsyringe";
import Logger from "../../core/ports/logger.port";
import winstonLoggerConfig from "./winston-logger/winston-logger.config";
import { LogLevel, WinstonLogger } from "./winston-logger/winston-logger.adapter";
import { BookRepository } from "../../core/ports/database.port";
import TypeOrmRepository from "./type-orm/book/book.repository";


container.register<Logger>("Logger", {
  useValue: new WinstonLogger(winstonLoggerConfig.logLevel as LogLevel)
})
.register<BookRepository>("BookRepository", {
  useValue: new TypeOrmRepository()
})