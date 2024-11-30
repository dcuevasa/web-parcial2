import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { UsuarioDto } from './usuario.dto/usuario.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

@Controller('usuario')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioController {
    constructor(private readonly bonoService: UsuarioService) {}

    @Post()
    async createUsuario(@Body() usuarioDto: UsuarioDto) {
        const usuario = plainToInstance(UsuarioEntity, usuarioDto);
        return await this.bonoService.crearUsuario(usuario);
    }

    @Get(':id')
    async getUsuarioById(@Param('id') id: string) {
        return await this.bonoService.findUsuarioById(id);
    }

    @Delete(':id')
    async deleteUsuario(@Param('id') id: string) {
        return await this.bonoService.deleteUsuario(id);
    }
}
