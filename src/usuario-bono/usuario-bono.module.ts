import { Module } from '@nestjs/common';
import { UsuarioBonoService } from './usuario-bono.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { BonoEntity } from '../bono/bono.entity/bono.entity';
import { UsuarioBonoController } from './usuario-bono.controller';

@Module({
  providers: [UsuarioBonoService],
  imports: [TypeOrmModule.forFeature([UsuarioEntity, BonoEntity])],
  controllers: [UsuarioBonoController],
})
export class UsuarioBonoModule {}
