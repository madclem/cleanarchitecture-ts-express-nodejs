import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Book as BookCoreEntity } from "../../../../core/book.interface";
@Entity()
class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text',{nullable:false})
  title: string;

  @Column('text',{nullable:false})
  summary: string;

  @Column('text',{nullable:false})
  author: string;
  
  @Column('integer',{nullable:false})
  totalPages: number;

  @Column({
    type: "time without time zone",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date;

  toDomainEntity(): BookCoreEntity {
    return {
      id: this.id,
      title: this.title,
      summary: this.summary,
      author: this.author,
      totalPages: this.totalPages,
    }
  }
}

export default Book;