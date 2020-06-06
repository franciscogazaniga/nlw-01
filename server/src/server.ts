import express from 'express';
import routes from './routes'; // "./" porque está na mesma pasta que o server
import cors from 'cors';
import path from 'path';
import { errors } from 'celebrate';

const app = express();

app.use(cors()); // determina quais domínios poderão acessar minha aplicação
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))); //utilizado para acessar as imagens no navegador

app.use(errors());

app.listen(3333);

//npm run dev

// Rota: Endereço completo da requisição
// Recurso: Qual entidade estamos acessando do sistema

// GET: Buscar uma ou mais informações do back-end
// POST: Criar uma nova informação no back-end
// PUT: Atualizar uma informação existente no back-end
// DELETE: Remover uma informação do back-end

// request param: Parâmetros que vem na própria rota que identificam um recurso (ex: para buscar um usuário)
// query param: Parâmetros que vem na própria rota, geralmente opcionais para filtro, paginação.
// request body: Parâmetros para criação/atualização de informações (dados do usuário)

// SELECT * FROM users WHERE name = 'Diego'
//  knex('users').where('name', 'Diego').select('*')

//o ":" significa que está recebendo um parâmetro