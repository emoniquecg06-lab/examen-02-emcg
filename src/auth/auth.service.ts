import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto} from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ){}

    async register(dto: RegisterDto){
        return this.usersService.create(dto);
    }

    async login(dto: LoginDto) {
        const user = await this.usersService.findByUsername(dto.username);
        if(!user) throw new UnauthorizedException('Credenciales invalidas');

        const valid = await bcrypt.compare(dto.password, user.password);
        if(!valid) throw new UnauthorizedException('Credenciales invalidas');
        
        const payload = { id: user.id, username: user.username, role: user.role };
        return { acces_token: this.jwtService.sign(payload) };
    }
}
