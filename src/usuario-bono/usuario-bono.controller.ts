import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { UsuarioBonoService } from './usuario-bono.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

@Controller('usuario')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioBonoController {
    constructor(private readonly usuarioBonoService: UsuarioBonoService) {}

    @Get(':userId/bonos')
    async findBonosByUsuario(@Param('userId') userId: string) {
        return await this.usuarioBonoService.findBonosByUsuario(userId);
    }
}
