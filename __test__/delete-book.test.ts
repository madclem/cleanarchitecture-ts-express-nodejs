import "reflect-metadata";

import { randomUUID } from "crypto";
import DeleteBook from "../src/core/use-cases/delete-book.use-case"
import { container } from "tsyringe";
import { BookRepository } from "../src/core/ports/database.port";
import Logger from "../src/core/ports/logger.port";

describe("Delete", () => {
  const id: string = randomUUID();
  
  const mock__delete = jest.fn();
  const mock__BookRepository = () => {
    return {
      delete: mock__delete
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

  it("should delete the book with id", async () => {
    mock__delete.mockResolvedValue(true);
    const response = await new DeleteBook().execute(id);

    expect(response).toBeUndefined()
    expect(container.resolve<BookRepository>("BookRepository").delete).toHaveBeenCalledWith(id);
  })
  it("should return NOT_FOUND with wrong id", async () => {
    mock__delete.mockResolvedValue(false);
    const response = await new DeleteBook().execute(id);

    expect(response).toBe("BOOK_NOT_FOUND")
    expect(container.resolve<BookRepository>("BookRepository").delete).toHaveBeenCalledWith(id);
  })
})