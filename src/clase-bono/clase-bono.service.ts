import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClaseEntity } from 'src/clase/clase.entity/clase.entity';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
import { Repository } from 'typeorm';

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
            throw new Error(`Clase con codigo ${codigoClase} no encontrada`);
        }
        return clase.bonos;
    }
}

