import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Maria Lopez' })
    @IsString()
    nombre: string;

    @ApiProperty({ example: 'marialopez'})
    @IsString()
    username: string;

    @ApiProperty({ example: 'password123', minLength: 6 })
    @IsString()
    @MinLength(6)
    password: string;
}