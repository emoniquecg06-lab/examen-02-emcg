import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Role } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ){}

    async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
        const exists = await this.userRepo.findOne({ where: { username: dto.username } });
        if (exists) throw new ConflictException('El username ya existe');

        const hashed = await bcrypt.hash(dto.password, 10);
        const user = this.userRepo.create({ ...dto, password: hashed, role: Role.USER });
        const saved = await this.userRepo.save(user);
        const { password, ...result } = saved;
        return result;
    }

    async findAll(): Promise<Omit<User, 'password'>[]> {
        const users = await this.userRepo.find();
        return users.map(({ password, ...u }) => u );
    }

    async findOne(id: string): Promise<Omit<User, 'password'>> {
        const user = await this.userRepo.findOne({ where: { id} });
        if(!user) throw new NotFoundException('Usuario no encontrado');
        const { password, ...result } = user;
        return result;
    }

    async findByUsername(username: string): Promise<User | null>{
        return this.userRepo.findOne({ where: { username } });
    }

    async update(id: string, dto: UpdateUserDto): Promise<Omit<User, 'password'>>{
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) throw new NotFoundException('Usuario no encontrado');

        if(dto.password){
            dto.password = await bcrypt.hash(dto.password, 10);
        }
        await this.userRepo.update(id,dto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<{ message: string }> {
        const user = await this.userRepo.findOne({ where: { id } });
        if(!user) throw new NotFoundException('Usuario no encontrado');
        await this.userRepo.delete(id);
        return { message: 'Usuario eliminado' };
    }

    async makeAdmin(id:string): Promise<Omit<User, 'password'>> {
        const user = await this.userRepo.findOne({ where: { id } });
        if(!user) throw new NotFoundException('Usuario no encontrado');
        await this.userRepo.update(id, { role: Role.ADMIN });
        return this.findOne(id);
    }

    async makeDeveloper(id:string): Promise<Omit<User, 'password'>> {
        const user = await this.userRepo.findOne({ where: { id } });
        if(!user) throw new NotFoundException('Usuario no encontrado');
        await this.userRepo.update(id, { role: Role.DEVELOPER });
        return this.findOne(id);
    }
}
