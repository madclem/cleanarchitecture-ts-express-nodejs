import "reflect-metadata";

import { randomUUID } from "crypto";
import { Book } from "../src/core/book.interface";
import ListBooks from "../src/core/use-cases/list-books.use-case"
import { container } from "tsyringe";
import { BookRepository } from "../src/core/ports/database.port";
import Logger from "../src/core/ports/logger.port";

describe("ListBooks", () => {
  const mock__data: Book[] = [
    {
      id: randomUUID(),
      title: "title1",
      summary: "summary1",
      author: "author1",
      totalPages: 2,
    },
    {
      id: randomUUID(),
      title: "title2",
      summary: "summary2",
      author: "author2",
      totalPages: 2,
    }
  ];

  const mock__list = jest.fn();
  const mock__BookRepository = () => {
    return {
      list: mock__list
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

  it("should return the books list", async () => {
    mock__list.mockResolvedValue(mock__data);
    const response = await new ListBooks().execute();

    expect(response).toStrictEqual(mock__data)
    expect(container.resolve<BookRepository>("BookRepository").list).toHaveBeenCalled();
  })
})