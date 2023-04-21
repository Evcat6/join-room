import { type Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
}
async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
}

export { down, up };
