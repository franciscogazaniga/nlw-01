import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection;

// Migrations = Histórico do banco de dados
// create table points no código da Júlia
// create table users no código da Maria
//Com um comando do knex, pode-se juntar as duas tabelas facilmente