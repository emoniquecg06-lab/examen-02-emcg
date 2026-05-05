import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    @ApiBody({ type: RegisterDto })
    @ApiResponse({ status: 201, description: 'Usuario registrado'})
    @ApiResponse({ status: 400, description: 'Datos invalidos'})
    register(@Body() dto: RegisterDto){
        return this.authService.register(dto);
    }

    @Post('login')
    @ApiBody({ type: LoginDto})
    @ApiResponse({ status: 200, description: 'Token JWT generado' })
    @ApiResponse({ status: 401, description: 'Credenciales invalidas' })
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}
