import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ClaseService } from './clase.service';
import { ClaseEntity } from './clase.entity/clase.entity';
import { ClaseDto } from './clase.dto/clase.dto';

@Controller('clase')
export class ClaseController {
    constructor(private readonly bonoService: ClaseService) {}

    @Post()
    async createClase(@Body() claseDto: ClaseDto) {
        const clase = plainToInstance(ClaseEntity, claseDto);
        return await this.bonoService.crearClase(clase);
    }

    @Get(':id')
    async getClaseById(@Param('id') id: string) {
        return await this.bonoService.findClaseById(id);
    }
}
