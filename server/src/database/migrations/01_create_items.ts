import Knex from 'knex';

//Criar tabela no BD
export async function up(knex: Knex) {
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });
}

//Deletar tabela no BD
export async function down(knex: Knex) {
    return knex.schema.dropTable('items');
}