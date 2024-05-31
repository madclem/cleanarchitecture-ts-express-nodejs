import { container } from "tsyringe";
import { Book } from "../book.interface";
import Logger from "../ports/logger.port";
import { BookRepository } from "../ports/database.port";

class ListBooks {
  logger: Logger;
  bookRepository: BookRepository;

  constructor() {
    this.logger = container.resolve<Logger>("Logger");
    this.bookRepository = container.resolve<BookRepository>("BookRepository");
  }
  async execute(): Promise<Book[]> {
    this.logger.debug("[list-books usecase] Start")

    return this.bookRepository.list();
  }
}

export default ListBooks;