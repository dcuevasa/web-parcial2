import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClaseEntity } from './clase.entity/clase.entity';
import { BusinessLogicException } from '../shared/errors/business-errors';
import { BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class ClaseService {

    constructor(
        @InjectRepository(ClaseEntity)
        private readonly claseRepository: Repository<ClaseEntity>
    ){}

    async crearClase(clase: ClaseEntity): Promise<ClaseEntity> {
        if (clase.codigo.length !== 10) {
            throw new BusinessLogicException(`El codigo debe tener 10 caracteres`,BusinessError.BAD_REQUEST);
        }
        return await this.claseRepository.save(clase);
    }

    async findClaseById(id: string): Promise<ClaseEntity> {
        const clase: ClaseEntity = await this.claseRepository.findOne({where: {id}, relations: ['bonos']});
        if (!clase) {
            throw new BusinessLogicException(`Clase con id ${id} no encontrada`,BusinessError.NOT_FOUND);
        }
        return clase;
    }
}
