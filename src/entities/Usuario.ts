import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    name: string

    @Column({ type: 'text', unique: true })
    email: string

    @Column({ type: 'text' })
    password: string

    @Column({nullable:true})
    telefone: number

    @Column({default: false})
    admin: boolean;
}