import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Categoria } from "./Categoria";

@Entity('filmes')
export class Filme {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    title: string

    @Column({ type: 'text' })
    url: string

    @ManyToOne(() => Categoria, categoria => categoria.filmes)
    @JoinColumn({ name: 'categoria_id' })
    categoria: Categoria

    @Column({ nullable: true })
    duracao: number

    @Column({ default: 0 })
    faixaEtaria: number

    @Column({ default: 0 })
    visualizacoes: number

}