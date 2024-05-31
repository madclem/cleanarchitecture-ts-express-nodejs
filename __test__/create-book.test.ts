import "reflect-metadata";

import { randomUUID } from "crypto";
import { Book } from "../src/core/book.interface";
import CreateBook from "../src/core/use-cases/create-book.use-case"
import { container } from "tsyringe";
import { BookRepository, CreateBookInput } from "../src/core/ports/database.port";
import Logger from "../src/core/ports/logger.port";

describe("CreateBook", () => {
  const id: string = randomUUID();
  const inputParams: CreateBookInput = {
    title: "title1",
    summary: "summary1",
    author: "author1",
    totalPages: 2,
  }
  const mock__data: Book = {
      id,
      ...inputParams
    };

  const mock__create = jest.fn();
  const mock__BookRepository = () => {
    return {
      create: mock__create
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

  it("should return a book", async () => {
    mock__create.mockResolvedValue(mock__data);
    const response = await new CreateBook().execute(inputParams);

    expect(response).toStrictEqual(mock__data)
    expect(container.resolve<BookRepository>("BookRepository").create).toHaveBeenCalledWith(inputParams);
  })
})