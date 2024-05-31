import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableBook1716908266910 implements MigrationInterface {
    name = 'CreateTableBook1716908266910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "summary" text NOT NULL, "author" text NOT NULL, "total_pages" integer NOT NULL, "created_at" TIME NOT NULL DEFAULT now(), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
