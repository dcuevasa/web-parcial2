import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity/usuario.entity';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ){}

    async crearUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        if (usuario.grupo_investigacion !== 'TICSW' && usuario.grupo_investigacion !== 'IMAGINE' && usuario.grupo_investigacion !== 'COMIT') {
            throw new Error(`El grupo de investigacion ${usuario.grupo_investigacion} no es valido`);
        }
        return await this.usuarioRepository.save(usuario);
    }

    async findUsuarioById(id: string): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id}, relations: ['bonos']});
        if (!usuario) {
            throw new Error(`Usuario con id ${id} no encontrado`);
        }
        return usuario;
    }

    async deleteUsuario(id: string): Promise<void> {
        const usuario = await this.findUsuarioById(id);
        if (usuario.rol === 'Decana') {
            throw new Error(`No se puede eliminar a la decana`);
        }
        if (usuario.bonos.length > 0) {
            throw new Error(`No se puede eliminar a un usuario con bonos`);
        }
        await this.usuarioRepository.delete(id);
    }

}
