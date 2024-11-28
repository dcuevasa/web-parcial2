import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BonoEntity } from './bono.entity/bono.entity';

@Injectable()
export class BonoService {

    constructor(
        @InjectRepository(BonoEntity)
        private readonly bonoRepository: Repository<BonoEntity>
    ){}

    async crearBono(bono: BonoEntity): Promise<BonoEntity> {
        if (!bono.monto) {
            throw new Error(`El monto no puede ser vacio`);
        }
        if (bono.monto <= 0) {
            throw new Error(`El monto debe ser positivo`);
        }
        if (bono.usuario.rol !== 'Profesor') {
            throw new Error(`El usuario no tiene rol profesor`);
        }
        return await this.bonoRepository.save(bono);
    }

    async deleteBono(id: string): Promise<void> {
        const bono = await this.bonoRepository.findOne({where: {id}, relations: ['usuario']});
        if (!bono) {
            throw new Error(`Bono con id ${id} no encontrado`);
        }
        if (bono.calificacion > 4) {
            throw new Error(`No se puede eliminar un bono con calificacion mayor a 4`);
        }
        await this.bonoRepository.delete(id);
    }

}
