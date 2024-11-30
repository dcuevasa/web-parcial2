import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BonoService } from './bono.service';
import { BonoEntity } from './bono.entity/bono.entity';
import { BonoDto } from './bono.dto/bono.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

@Controller('bono')
@UseInterceptors(BusinessErrorsInterceptor)
export class BonoController {
    constructor(private readonly bonoService: BonoService) {}

    @Post()
    async createBono(@Body() bonoDto: BonoDto) {
        const bono = plainToInstance(BonoEntity, bonoDto);
        return await this.bonoService.crearBono(bono);
    }

    @Delete(':id')
    async deleteBono(@Param('id') id: string) {
        return await this.bonoService.deleteBono(id);
    }
}
