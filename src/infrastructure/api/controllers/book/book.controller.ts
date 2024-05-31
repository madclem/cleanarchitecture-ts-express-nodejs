import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { GetBookOutputDto, GetBooksOutputDto, PostBookInputDto } from './dto';
import { createBookCodec, getBookCodec } from './book.codec';

import CreateBookUseCase from '../../../../core/use-cases/create-book.use-case';
import DeleteBookUseCase from '../../../../core/use-cases/delete-book.use-case';
import GetBookUseCase from '../../../../core/use-cases/get-book.use-case';
import ListBooksUseCase from '../../../../core/use-cases/list-books.use-case';

@Route('books')
@Tags('Books')
export class Books extends Controller {
  constructor() {
    super();
  }

  @Get()
  @SuccessResponse(200)
  async list(): Promise<GetBooksOutputDto> {
    return await new ListBooksUseCase().execute();
  }

  @Get('{id}')
  @SuccessResponse(200)
  async getById(@Path() id: string): Promise<GetBookOutputDto> {
    const bookId = getBookCodec.decodeBookId(id);

    if (!bookId.success) {
      throw 'Invalid book id format';
    }

    const book = await new GetBookUseCase().execute(bookId.data);

    if (book === "BOOK_NOT_FOUND") {
      throw "BOOK_NOT_FOUND";
    }

    return book;
  }

  @Post()
  @SuccessResponse(201)
  async create(
    @Body() requestBody: PostBookInputDto,
  ): Promise<PostBookInputDto> {
    const decodedBody = createBookCodec.decode(requestBody);

    if (!decodedBody.success) {
      throw decodedBody.error.toString();
    }

    return await new CreateBookUseCase().execute(decodedBody.data);
  }

  @Delete('{id}')
  @SuccessResponse(204)
  async delete(@Path() id: string): Promise<void> {
    const bookId = getBookCodec.decodeBookId(id);

    if (!bookId.success) {
      throw 'Invalid book id format';
    }

    const result = await new DeleteBookUseCase().execute(bookId.data);

    if (result === "BOOK_NOT_FOUND") {
      throw "BOOK_NOT_FOUND";
    }
  }
}
