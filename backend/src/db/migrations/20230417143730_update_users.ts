import { type Knex } from 'knex';

const TABLE_NAME = 'users';

const ColumnName = {
  NAME: 'name',
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
};

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.NAME);
    table.string(ColumnName.FIRST_NAME).nullable();
    table.string(ColumnName.LAST_NAME).nullable();
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.FIRST_NAME);
    table.dropColumn(ColumnName.LAST_NAME);
  });
}

export { down, up };
