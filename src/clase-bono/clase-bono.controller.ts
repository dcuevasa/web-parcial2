import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ClaseBonoService } from './clase-bono.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

@Controller('clase')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClaseBonoController {
    constructor(private readonly claseBonoService: ClaseBonoService) {}

    @Get(':codigoClase/bonos')
    async findBonosByCodigoClase(@Param('codigoClase') codigoClase: string) {
        return await this.claseBonoService.findBonoByCodigoClase(codigoClase);
    }
}
