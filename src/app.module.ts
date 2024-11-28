import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ClaseModule } from './clase/clase.module';
import { BonoModule } from './bono/bono.module';
import { ClaseBonoModule } from './clase-bono/clase-bono.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioBonoModule } from './usuario-bono/usuario-bono.module';

@Module({
  imports: [
    UsuarioModule,
    ClaseModule,
    BonoModule,
    ClaseBonoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial2',
      entities: [
        UsuarioModule,
        ClaseModule,
        BonoModule,
        ClaseBonoModule,
        UsuarioBonoModule
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    UsuarioBonoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
