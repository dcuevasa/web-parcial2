import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BonoEntity } from '../bono/bono.entity/bono.entity';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioBonoService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,

        @InjectRepository(BonoEntity)
        private readonly bonoRepository: Repository<BonoEntity>
    ){}

    async findBonosByUsuario(userId: string): Promise<BonoEntity[]> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id: userId}, relations: ['bonos']});
        if (!usuario) {
            throw new Error(`Usuario con id ${userId} no encontrado`);
        }
        return usuario.bonos;
    }

    
}
