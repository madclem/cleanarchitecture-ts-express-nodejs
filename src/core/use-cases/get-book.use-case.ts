import { container } from "tsyringe";
import { Book } from "../book.interface";
import Logger from "../ports/logger.port";
import { BookRepository } from "../ports/database.port";

class GetBook {
  logger: Logger;
  bookRepository: BookRepository;

  constructor() {
    this.logger = container.resolve<Logger>("Logger");
    this.bookRepository = container.resolve<BookRepository>("BookRepository");
  }
  async execute(id: string): Promise<Book | "BOOK_NOT_FOUND"> {
    this.logger.debug("[get-books usecase] Start")

    const data = await this.bookRepository.findById(id);
    
    return data ?? "BOOK_NOT_FOUND";
  }
}

export default GetBook;