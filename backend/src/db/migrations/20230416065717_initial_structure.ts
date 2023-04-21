import { type Knex } from 'knex';

const uuid = 'uuid_generate_v4()';

const TABLE_NAME = {
  USERS: 'users',
  USER_CHATS: 'users_chats',
  CHATS: 'chats',
  MESSAGES: 'messages',
  CHAT_MESSAGES: 'chat_messages',
  IMAGES: 'images',
};

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
  CHAT_ID: 'chat_id',
  CHAT_ADMIN_ID: 'chat_admin_id',
  MESSAGE_ID: 'message_id',
  CHAT_AVATAR_URL: 'chat_avatar_url',
  PATH: 'path',
  IMAGE_URL: 'image_url',
  TEXT: 'text',
  NAME: 'name',
  USERNAME: 'username',
  EMAIL: 'email',
  PHONE_NUMBER: 'phone_number',
  BIRTH: 'birth',
  DESCRIPTION: 'description',
  PASSWORD_SALT: 'password_salt',
  PASSWORD_HASH: 'password_hash',
  IS_PRIVATE: 'is_private',
  AVATAR_URL: 'avatar_url',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable(TABLE_NAME.USERS, (table) => {
      table
        .uuid(ColumnName.ID)
        .primary()
        .defaultTo(knex.raw(uuid))
        .notNullable();
      table.string(ColumnName.NAME).notNullable();
      table.string(ColumnName.USERNAME).notNullable();
      table.string(ColumnName.EMAIL).notNullable();
      table.string(ColumnName.PHONE_NUMBER).nullable();
      table.dateTime(ColumnName.BIRTH).nullable();
      table.boolean(ColumnName.IS_PRIVATE).defaultTo(false).notNullable();
      table.string(ColumnName.AVATAR_URL).nullable();
      table.text(ColumnName.PASSWORD_HASH).notNullable();
      table.text(ColumnName.PASSWORD_SALT).notNullable();
      table
        .dateTime(ColumnName.CREATED_AT)
        .notNullable()
        .defaultTo(knex.fn.now());
      table
        .dateTime(ColumnName.UPDATED_AT)
        .notNullable()
        .defaultTo(knex.fn.now());
    })
    .createTable(TABLE_NAME.CHATS, (table) => {
      table.uuid(ColumnName.ID).defaultTo(knex.raw(uuid)).primary();
      table
        .uuid(ColumnName.CHAT_ADMIN_ID)
        .references(ColumnName.ID)
        .inTable(TABLE_NAME.USERS)
        .notNullable();
      table.string(ColumnName.CHAT_AVATAR_URL).nullable();
      table.string(ColumnName.NAME).notNullable();
      table.string(ColumnName.DESCRIPTION).nullable();
      table.boolean(ColumnName.IS_PRIVATE).notNullable().defaultTo(false);
      table
        .dateTime(ColumnName.CREATED_AT)
        .notNullable()
        .defaultTo(knex.fn.now());
      table
        .dateTime(ColumnName.UPDATED_AT)
        .notNullable()
        .defaultTo(knex.fn.now());
    })
    .createTable(TABLE_NAME.USER_CHATS, (table) => {
      table
        .uuid(ColumnName.ID)
        .notNullable()
        .defaultTo(knex.raw(uuid))
        .primary();
      table
        .uuid(ColumnName.USER_ID)
        .references(ColumnName.ID)
        .inTable(TABLE_NAME.USERS)
        .notNullable();
      table
        .uuid(ColumnName.CHAT_ID)
        .references(ColumnName.ID)
        .inTable(TABLE_NAME.CHATS)
        .notNullable();
    })
    .createTable(TABLE_NAME.MESSAGES, (table) => {
      table
        .uuid(ColumnName.ID)
        .defaultTo(knex.raw(uuid))
        .notNullable()
        .primary();
      table
        .uuid(ColumnName.USER_ID)
        .references(ColumnName.ID)
        .inTable(TABLE_NAME.USERS)
        .notNullable();
      table.text(ColumnName.TEXT).nullable();
      table.string(ColumnName.IMAGE_URL).nullable();
      table
        .dateTime(ColumnName.CREATED_AT)
        .notNullable()
        .defaultTo(knex.fn.now());
      table
        .dateTime(ColumnName.UPDATED_AT)
        .notNullable()
        .defaultTo(knex.fn.now());
    })
    .createTable(TABLE_NAME.CHAT_MESSAGES, (table) => {
      table.uuid(ColumnName.ID).defaultTo(knex.raw(uuid)).primary();
      table
        .uuid(ColumnName.CHAT_ID)
        .references(ColumnName.ID)
        .inTable(TABLE_NAME.CHATS)
        .notNullable();
      table
        .uuid(ColumnName.MESSAGE_ID)
        .references(ColumnName.ID)
        .inTable(TABLE_NAME.MESSAGES)
        .notNullable();
    })
    .createTable(TABLE_NAME.IMAGES, (table) => {
      table.uuid(ColumnName.ID).defaultTo(knex.raw(uuid)).primary();
      table.string(ColumnName.PATH).notNullable();
      table
        .dateTime(ColumnName.CREATED_AT)
        .notNullable()
        .defaultTo(knex.fn.now());
      table
        .dateTime(ColumnName.UPDATED_AT)
        .notNullable()
        .defaultTo(knex.fn.now());
    });
}
async function down(knex: Knex): Promise<void> {
  await knex.schema
    .dropTableIfExists(TABLE_NAME.IMAGES)
    .dropTableIfExists(TABLE_NAME.CHAT_MESSAGES)
    .dropTableIfExists(TABLE_NAME.MESSAGES)
    .dropTableIfExists(TABLE_NAME.USER_CHATS)
    .dropTableIfExists(TABLE_NAME.CHATS)
    .dropTableIfExists(TABLE_NAME.USERS);
}

export { down, up };
