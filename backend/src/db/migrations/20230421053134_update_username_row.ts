import { type Knex } from 'knex';

const TABLE_NAME = 'users';

const USERNAME_COLUMN = 'username';
const NEW_USERNAME_COLUMN = 'user_name';

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(USERNAME_COLUMN);
    table.string(NEW_USERNAME_COLUMN).nullable();
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(NEW_USERNAME_COLUMN);
  });
}

export { down, up };
