import { Request, Response } from "express";
import { categoriaRepository } from "../repositories/categoriaRepository";
import { filmeRepository } from "../repositories/filmeRepository";




export class CategoriaController {
    async create(req: Request, res: Response) {

        const { name } = req.body

        if (!name) {
            return res.status(400).json({ message: 'O nome da categoria é obrigatório!' })
        }

        try {
            const newCategoria = categoriaRepository.create({ name })

            await categoriaRepository.save(newCategoria)

            return res.status(201).json(newCategoria)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }

    }

    async createFilme(req: Request, res: Response) {
        const { title, url } = req.body
        const { idCategoria } = req.params

        try {
            const categoria = await categoriaRepository.findOneBy({ id: Number(idCategoria) })

            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada.' })
            }

            const newFilme = filmeRepository.create({
                title,
                url,
                categoria
            })

            await filmeRepository.save(newFilme)

            return res.status(201).json(newFilme)

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' })
        }


    }

async list(req: Request, res: Response){

    try {
        const categorias = await categoriaRepository.find({
            relations: {
               filmes: true,
            },
        })

        return res.json(categorias)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error' })        
    }


}

}