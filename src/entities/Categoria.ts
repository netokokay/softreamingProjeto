import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Filme } from './Filme'

@Entity('categorias')
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    name: string

    @OneToMany(() => Filme, filme => filme.categoria)
    filmes: Filme[]
}