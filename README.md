Learning about Clean Architecture

# boilerplate-cleanarchi

## Quick start

```sh
$ yarn
$ yarn dev
```

## Database migrations

If you have made changes to database entities and need to generate a new
migration, you can do so by issuing the following command:

```sh
$ yarn run typeorm migration:generate -d src/infrastructure/adapters/type-orm/data-source.ts src/infrastructure/adapters/type-orm/migrations/migration-name
```