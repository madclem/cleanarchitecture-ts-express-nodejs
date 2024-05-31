import { container } from "tsyringe";
import { Book } from "../book.interface";
import { BookRepository, CreateBookInput } from "../ports/database.port";
import Logger from "../ports/logger.port";

class CreateBook {
  logger: Logger;
  bookRepository: BookRepository;

  constructor() {
    this.logger = container.resolve<Logger>("Logger");
    this.bookRepository = container.resolve<BookRepository>("BookRepository");
  }

  async execute({ title, summary, author, totalPages }: CreateBookInput): Promise<Book> {
    this.logger.debug("[CreateBook use case] Start");

    return await this.bookRepository.create({
      title, summary, author, totalPages
    })
  }
}

export default CreateBook;