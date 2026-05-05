import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Role {
    USER = 'USER',
    DEVELOPER = 'DEVELOPER',
    ADMIN = 'ADMIN',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;
}