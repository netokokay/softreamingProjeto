import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { categoriaRepository } from "../repositories/categoriaRepository";
import { filmeRepository } from "../repositories/filmeRepository";


export class CategoriaController {
    async create(req: Request, res: Response) {
        const { name } = req.body

        if (!name) {
            throw new BadRequestError('O nome da categoria é obrigatório!')
        }

        const newCategoria = categoriaRepository.create({ name })
        await categoriaRepository.save(newCategoria)
        return res.status(201).json(newCategoria)
    }

    async createFilme(req: Request, res: Response) {
        const { title, url } = req.body
        const { idCategoria } = req.params
        const categoria = await categoriaRepository.findOneBy({ id: Number(idCategoria) })

        if (!categoria) {
            throw new BadRequestError('Categoria não encontrada.')
        }
        const newFilme = filmeRepository.create({
            title,
            url,
            categoria
        })

        await filmeRepository.save(newFilme)
        return res.status(201).json(newFilme)
    }

    async list(req: Request, res: Response) {

        const categorias = await categoriaRepository.find({
            relations: {
                filmes: true,
            },
        })

        return res.json(categorias)
    }

}