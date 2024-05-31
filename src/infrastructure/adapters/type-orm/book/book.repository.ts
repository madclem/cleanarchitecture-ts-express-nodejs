import { Book } from "../../../../core/book.interface";
import { BookRepository, CreateBookInput } from "../../../../core/ports/database.port";
import { AppDataSource, isInitialised } from "../data-source";
import BookDBEntity from "./book.entity";

class TypeOrmRepository implements BookRepository {
  async findById(id: string): Promise<Book | null> {
    await isInitialised();

    const book = await AppDataSource.getRepository(BookDBEntity).findOne({
      where: { id }
    })

    return book?.toDomainEntity() || null;
  }

  async create({ title, summary, author, totalPages }: CreateBookInput): Promise<Book> {
    await isInitialised();

    const bookIdentifier = (await AppDataSource.getRepository(BookDBEntity).insert({
      title, summary, author, totalPages
    })).identifiers.at(0);

    if (!bookIdentifier) {
      throw "book creation failed in type ORM";
    }
    
    const book = await AppDataSource.getRepository(BookDBEntity).findOneBy({
      id: bookIdentifier.id
    });
    
    if (!book) {
      throw "book created but not found in type ORM";
    }

    return book.toDomainEntity();
  }

  async list(): Promise<Book[]> {
    await isInitialised();

    const books = await AppDataSource.getRepository(BookDBEntity).find()

    return books.map(book => book.toDomainEntity());
  }

  async delete(id: string): Promise<boolean> {
    await isInitialised();

    const deleteResult = await AppDataSource.getRepository(BookDBEntity).delete(id);

    return deleteResult.affected === 1;
  }
}

export default TypeOrmRepository;