import { type Knex } from 'knex';

const TABLE_NAME = 'chats';

const COLUMN_NAME = 'default_background_color';

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('chats', (table) => {
    table.string('default_background_color').defaultTo('#000').notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}

export { down, up };
