import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @Roles(Role.DEVELOPER)
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, description: 'Usuario no encontrado' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    @ApiResponse({ status: 403, description: 'Sin permiso(solo DEVELOPER)' })
    create(@Body()dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @Get()
    @Roles(Role.ADMIN, Role.DEVELOPER, Role.USER)
    @ApiResponse({ status: 200, description: 'Lista de usuarios' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    async findAll(@Request() req) {
        if(req.user.role = Role.USER){
            return [await this.usersService.findOne(req.user.id)];
        }
        return this.usersService.findAll();
    }

    @Patch(':id')
    @Roles(Role.DEVELOPER)
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({ status: 200, description: 'Usuario actualizado' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    @ApiResponse({ status: 403, description: 'Sin permiso(solo DEVELOPER)' })
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.update(id, dto);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @ApiResponse({ status: 200, description: 'Usuario eliminado' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    @ApiResponse({ status: 403, description: 'Sin permiso(solo ADMIN)' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }

    @Patch(':id/make-admin')
    @Roles(Role.ADMIN)
    @ApiResponse({ status: 200, description: 'Usuario promovido a ADMIN' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    @ApiResponse({ status: 403, description: 'Sin permiso(solo ADMIN)' })
    makeAdmin(@Param('id') id: string) {
        return this.usersService.makeAdmin(id);
    }

    @Patch(':id/make-developer')
    @Roles(Role.ADMIN)
    @ApiResponse({ status: 200, description: 'Usuario promovido a DEVELOPER' })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    @ApiResponse({ status: 403, description: 'Sin permiso(solo ADMIN)' })
    makeDeveloper(@Param('id') id: string) {
        return this.usersService.makeDeveloper(id);
    }

}
