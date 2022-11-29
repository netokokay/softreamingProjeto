import { Request, Response } from "express";
import { ILike, Like } from "typeorm";
import { Categoria } from "../entities/Categoria";
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
        const { title, url, duracao, faixaEtaria } = req.body
        const { idCategoria } = req.params
        const categoria = await categoriaRepository.findOneBy({ id: Number(idCategoria) })

        if (!categoria) {
            throw new BadRequestError('Categoria não encontrada.')
        }
        const newFilme = filmeRepository.create({
            title,
            url,
            categoria,
            duracao,
            faixaEtaria
        })

        await filmeRepository.save(newFilme)
        return res.status(201).json(newFilme)
    }

    async listarFilme(req: Request, res: Response) {

        const filme = await filmeRepository.findOneBy({ title: Like(`%${req.body.title}%`) })

        return res.json(filme)
    }

    async listAll(req: Request, res: Response) {

        const categorias = await categoriaRepository.find({
            relations: {
                filmes: true,
            },
        })

        return res.json(categorias)
    }

    async listCategoria(req: Request, res: Response) {

        const categoria = await categoriaRepository.find({
            relations: {
                filmes: true,
            }, where: {
                id: parseInt(req.params.idCategoria)
            }
        })

        return res.json(categoria)
    }

    async updateCategory(req: Request, res: Response) {
        const { name } = req.body

        const categoria = await categoriaRepository.findOneBy({ id: parseInt(req.params.idCategoria) })

        if (!categoria) return res.status(404).json({ message: 'Categoria não existe.' })

        categoria.name = name
        categoriaRepository.save(categoria)

        return res.json('Categoria atualizada com sucesso!')
    }

    async updateFilme(req: Request, res: Response) {
        const { title, url, duracao, faixaEtaria, categoria } = req.body

        const filme = await filmeRepository.findOneBy({ id: parseInt(req.params.idFilme) })

        if (!filme) return res.status(404).json({ message: 'Filme não existe.' })

        filme.title = title
        filme.url = url
        filme.duracao = duracao
        filme.faixaEtaria = faixaEtaria
        filme.categoria = categoria
        filmeRepository.save(filme)

        console.log(filme);


        return res.json('Filme atualizado com sucesso!')
    }

    async deleteFilme(req: Request, res: Response) {
        const { idFilme } = req.params

        const filme = await filmeRepository.delete(idFilme)

        if (filme.affected == 1) {
            return res.status(202).json({ mensagem: 'Filme deletado com sucesso!' })
        }
        return res.status(304).json({ mensagem: 'Não foi possivel deletar este Filme!' })


    }

    async deleteCategory(req: Request, res: Response) {

        const categoria = await filmeRepository
            .createQueryBuilder("filmes")
            .where("filmes.categoria_id = :idCategoria", { idCategoria: req.params.idCategoria })
            .getOne()
  

        if (categoria) {            
            return res.json('Você não pode deletar uma categoria que tenha algum filme associado!')

        }

        if (!categoria) {
            
            await categoriaRepository
            .createQueryBuilder("categorias")
            .delete()
            .from(Categoria)
            .where("id = :idCategoria", { idCategoria: req.params.idCategoria })
            .execute()

            return res.json('Categoria deletada!')
        }

        return res.json('Ops, algum erro aconteceu!')
    }
}