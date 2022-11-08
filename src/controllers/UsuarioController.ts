import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { usuarioRepository } from "../repositories/usuarioRepository";

export class UsuarioController {

    async create(req: Request, res: Response) {
        const { name, email, password } = req.body

        const checkMail = await usuarioRepository.find({ where: { email } })
        if (checkMail.length > 0) {
            throw new BadRequestError('Email já cadastrado!')
        }

        if (!name) {
            throw new BadRequestError('Nome de usuário é obrigatório!')
        } else if (!email) {
            throw new BadRequestError('Email é obrigatório!')
        } else if (!password) {
            throw new BadRequestError('Senha é obrigatória!')
        }

        const newUsuario = usuarioRepository.create({ name, email, password })
        await usuarioRepository.save(newUsuario)
        return res.status(201).json(newUsuario)
    }

    async update(req: Request, res: Response) {
        const { name, password } = req.body

        const user = await usuarioRepository.findOneBy({ id: parseInt(req.params.id) })

        if (!user) return res.status(404).json({ message: 'Usuário não existe.' })

        user.name = name
        user.password = password
        usuarioRepository.save(user)

        return res.json('Usuário atualizado com sucesso!')
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params

        const usuario = await usuarioRepository.delete(id)

        if (usuario.affected == 1) {
            return res.status(202).json({ mensagem: 'Usuário deletado com sucesso!' })
        }
        return res.status(304).json({ mensagem: 'Não foi possivel deletar este usuário!' })


    }

    async listar(req: Request, res: Response) {
        const lista = await usuarioRepository.findAndCount({ order: { id: "ASC" } })
        return res.json(lista)
    }

}