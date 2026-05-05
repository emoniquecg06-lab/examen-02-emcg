import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

    @ApiProperty({ example: 'juanperez'})
    @IsString()
    username: string;

    @ApiProperty({ example: 'Juan Perez' })
    @IsString()
    password: string;
}