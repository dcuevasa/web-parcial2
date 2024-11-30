import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BonoEntity } from './bono.entity/bono.entity';
import { BusinessLogicException } from '../shared/errors/business-errors';
import { BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class BonoService {

    constructor(
        @InjectRepository(BonoEntity)
        private readonly bonoRepository: Repository<BonoEntity>
    ){}

    async crearBono(bono: BonoEntity): Promise<BonoEntity> {
        if (!bono.monto) {
            throw new BusinessLogicException(`El monto no puede ser vacio`,BusinessError.BAD_REQUEST);
        }
        if (bono.monto <= 0) {
            throw new BusinessLogicException(`El monto debe ser positivo`,BusinessError.BAD_REQUEST);
        }
        if (bono.usuario.rol !== 'Profesor') {
            throw new BusinessLogicException(`El usuario no tiene rol profesor`,BusinessError.PRECONDITION_FAILED);
        }
        return await this.bonoRepository.save(bono);
    }

    async deleteBono(id: string): Promise<void> {
        const bono = await this.bonoRepository.findOne({where: {id}, relations: ['usuario']});
        if (!bono) {
            throw new BusinessLogicException(`Bono con id ${id} no encontrado`,BusinessError.NOT_FOUND);
        }
        if (bono.calificacion > 4) {
            throw new BusinessLogicException(`No se puede eliminar un bono con calificacion mayor a 4`,BusinessError.PRECONDITION_FAILED);
        }
        await this.bonoRepository.delete(id);
    }

}
