import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

    async index(request: Request, response: Response) {
        const { uf, city, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('points_items', 'points.id', '=', 'points_items.point_id')
            .whereIn('points_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

            const serializedPoints = points.map(points => {
                return {
                    ... points, //retorna todos os dados do ponto
                    image_url: `http://192.168.1.7:3333/uploads/${points.image}`,
                };
            });
    
            return response.json(serializedPoints);

            return response.json(points);
    }



    //Listar os itens de um ponto de coleta de acordo com o id
    async show(request: Request, response: Response) {
        const { id } = request.params;
        const point = await knex('points').where('id', id).first();

        if(!point) {
            return response.status(400).json({ message: 'Point not found.' });
        }

        const serializedPoint =  {
                ... point, //retorna todos os dados do ponto
                image_url: `http://192.168.1.7:3333/uploads/${point.image}`,
            };

        const items = await knex('items')
            .join('points_items', 'items.id', '=', 'points_items.item_id')
            .where('points_items.point_id', id)
            .select('items.title');

        return response.json({ point: serializedPoint, items });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            uf,
            city,
            items
        } = request.body;
    
        const trx = await knex.transaction(); //se o primeiro insert falhar, o segundo não insere e vice-versa
    
        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            uf,
            city
        }

        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
            return {
                item_id,
                point_id,
            };
        })

        await trx('points_items').insert(pointItems);

        await trx.commit(); //necessário ao utilizar transaction, para que os objetos sejam inseridos no BD

        return response.json({
            id: point_id,
            ...point, 
        });
    }
}

export default PointsController;