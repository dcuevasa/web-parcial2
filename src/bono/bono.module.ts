import { Module } from '@nestjs/common';
import { BonoService } from './bono.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonoEntity } from './bono.entity/bono.entity';
import { BonoController } from './bono.controller';

@Module({
  providers: [BonoService],
  imports: [TypeOrmModule.forFeature([BonoEntity])],
  controllers: [BonoController],
})
export class BonoModule {}
