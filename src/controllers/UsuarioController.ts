import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { usuarioRepository } from "../repositories/usuarioRepository";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
require('dotenv').config()

export class UsuarioController {

    async create(req: Request, res: Response) {
        const { name, email, password, admin, telefone } = req.body

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

        const hashedPassword = await bcrypt.hash(password, 10)


        const newUsuario = usuarioRepository.create({ name, email, password: hashedPassword, admin, telefone })
        await usuarioRepository.save(newUsuario)

        const {password:_, ...user} = newUsuario

        return res.status(201).json(user)

    }

    async update(req: Request, res: Response) {
        const { name, password, telefone } = req.body

        const user = await usuarioRepository.findOneBy({ id: parseInt(req.params.id) })

        if (!user) return res.status(404).json({ message: 'Usuário não existe.' })

        const hashedPassword = await bcrypt.hash(password, 10)

        user.name = name
        user.password = hashedPassword
        user.telefone = telefone
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

    async login(req: Request, res: Response) {
        const {email, password} = req.body

        const emailExist = await usuarioRepository.findOneBy({email})

        if(!emailExist) throw new BadRequestError('Email ou senha incorreto!')

        const passVerify = await bcrypt.compare(password, emailExist.password)

        if(!passVerify) throw new BadRequestError('Email ou senha incorreto!')

        const token = jwt.sign({id: emailExist.id}, process.env.JWT_PASS ?? '', {expiresIn: '8h'})

        const {password:_, ...userLogged} = emailExist

        return res.json({
            user: userLogged,
            token: token,
        })
    }

}