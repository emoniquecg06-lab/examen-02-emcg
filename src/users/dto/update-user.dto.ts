import { IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ example: 'Nuevo nombre' })
    @IsString()
    @IsOptional()
    nombre?: string;

    @ApiProperty({ example: 'nueva password', minLength: 6 })
    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string;
}