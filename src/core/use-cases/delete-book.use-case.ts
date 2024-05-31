import { container } from "tsyringe";
import Logger from "../ports/logger.port";
import { BookRepository } from "../ports/database.port";

class DeleteBook {

  logger: Logger;
  bookRepository: BookRepository;

  constructor() {
    this.logger = container.resolve<Logger>("Logger");
    this.bookRepository = container.resolve<BookRepository>("BookRepository");
  }

  async execute(id: string): Promise<void | "BOOK_NOT_FOUND"> {
    this.logger.debug("[Delete use-case] Start")

    const deleted = await this.bookRepository.delete(id);

    if (!deleted) {
      return "BOOK_NOT_FOUND"
    }
  }
}

export default DeleteBook;