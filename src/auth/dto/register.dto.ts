import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'Juan Perez' })
    @IsString()
    nombre: string;

    @ApiProperty({ example: 'juanperez'})
    @IsString()
    username: string;

    @ApiProperty({ example: 'Juan Perez' })
    @IsString()
    password: string;
}