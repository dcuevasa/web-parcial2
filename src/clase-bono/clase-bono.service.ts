import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClaseEntity } from '../clase/clase.entity/clase.entity';
import { BonoEntity } from '../bono/bono.entity/bono.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException } from '../shared/errors/business-errors';
import { BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class ClaseBonoService {

    constructor(
        @InjectRepository(ClaseEntity)
        private readonly claseRepository: Repository<ClaseEntity>,

        @InjectRepository(BonoEntity)
        private readonly bonoRepository: Repository<BonoEntity>
    ){}

    async findBonoByCodigoClase(codigoClase: string): Promise<BonoEntity[]> {
        const clase: ClaseEntity = await this.claseRepository.findOne({where: {codigo: codigoClase}, relations: ['bonos']});
        if (!clase) {
            throw new BusinessLogicException(`Clase con codigo ${codigoClase} no encontrada`,BusinessError.NOT_FOUND);
        }
        return clase.bonos;
    }
}

