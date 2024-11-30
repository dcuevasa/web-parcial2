import { Module } from '@nestjs/common';
import { ClaseBonoService } from './clase-bono.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseEntity } from '../clase/clase.entity/clase.entity';
import { BonoEntity } from '../bono/bono.entity/bono.entity';
import { ClaseBonoController } from './clase-bono.controller';

@Module({
  providers: [ClaseBonoService],
  imports: [TypeOrmModule.forFeature([ClaseEntity, BonoEntity])],
  controllers: [ClaseBonoController],
})
export class ClaseBonoModule {}
