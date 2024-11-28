import { Module } from '@nestjs/common';
import { UsuarioBonoService } from './usuario-bono.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';

@Module({
  providers: [UsuarioBonoService],
  imports: [TypeOrmModule.forFeature([UsuarioEntity, BonoEntity])],
})
export class UsuarioBonoModule {}
