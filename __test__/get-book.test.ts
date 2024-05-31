import "reflect-metadata";

import { randomUUID } from "crypto";
import { Book } from "../src/core/book.interface";
import GetBook from "../src/core/use-cases/get-book.use-case"
import { container } from "tsyringe";
import { BookRepository } from "../src/core/ports/database.port";
import Logger from "../src/core/ports/logger.port";

describe("GetBook", () => {
  const id: string = randomUUID();
  const mock__data: Book = {
      id,
      title: "title1",
      summary: "summary1",
      author: "author1",
      totalPages: 2,
    };

  const mock__findById = jest.fn();
  const mock__BookRepository = () => {
    return {
      findById: mock__findById
    }
  };

  container.register<Partial<BookRepository>>("BookRepository", {
    useValue: mock__BookRepository(),
  })


  container.register<Partial<Logger>>("Logger", {
    useValue: {
      debug: jest.fn()
    },
  })

  it("should return the book with id", async () => {
    mock__findById.mockResolvedValue(mock__data);
    const response = await new GetBook().execute(id);

    expect(response).toStrictEqual(mock__data)
    expect(container.resolve<BookRepository>("BookRepository").findById).toHaveBeenCalledWith(id);
  })
  it("should return NOT_FOUND with wrong id", async () => {
    mock__findById.mockResolvedValue(null);
    const response = await new GetBook().execute(id);

    expect(response).toStrictEqual("BOOK_NOT_FOUND")
    expect(container.resolve<BookRepository>("BookRepository").findById).toHaveBeenCalledWith(id);
  })
})