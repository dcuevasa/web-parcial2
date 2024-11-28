import { Module } from '@nestjs/common';
import { ClaseBonoService } from './clase-bono.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseEntity } from 'src/clase/clase.entity/clase.entity';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';

@Module({
  providers: [ClaseBonoService],
  imports: [TypeOrmModule.forFeature([ClaseEntity, BonoEntity])],
})
export class ClaseBonoModule {}
