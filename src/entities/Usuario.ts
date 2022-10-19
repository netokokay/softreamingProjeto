import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    name: string

    @Column({type: 'text'})
    email: string

    @Column({type: 'text'})
    password: string
}