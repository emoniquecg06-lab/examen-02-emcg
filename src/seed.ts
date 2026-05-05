import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DataSource } from "typeorm";
import { User, Role } from './users/entities/user.entity';
import * as bcrypt from 'bcrypt';

async function seed(){
    const app = await NestFactory.createApplicationContext(AppModule);
    const ds = app.get(DataSource);
    const repo = ds.getRepository(User);

    const exists = await repo.findOne({where: { username: 'admin' } });
    if(!exists) {
        const hashed = await bcrypt.hash('admin123', 10);
        await repo.save(repo.create({
            nombre: 'Administrador',
            username: 'admin',
            password: hashed,
            role: Role.ADMIN,
        }));
        console.log('Usuario admin creado');
    } else {
        console.log('Admin ya existe');
    }
    await app.close();
}
seed();