import { Test, TestingModule } from '@nestjs/testing';
import { BonoService } from './bono.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { BonoEntity } from './bono.entity/bono.entity';
import { faker } from '@faker-js/faker';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';

describe('BonoService', () => {
  let service: BonoService;
  let repository: Repository<BonoEntity>;
  let usuarioService: UsuarioService;
  let usuarioRepository: Repository<UsuarioEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BonoService, UsuarioService],
      imports: TypeOrmTestingConfig(),
    }).compile();

    service = module.get<BonoService>(BonoService);
    repository = module.get('BonoEntityRepository');
    usuarioService = module.get<UsuarioService>(UsuarioService);
    usuarioRepository = module.get('UsuarioEntityRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a bono', async () => {
    const usuario: UsuarioEntity = {
      id: '',
      cedula: 1234567890,
      nombre: 'John Doe',
      grupo_investigacion: 'IMAGINE',
      numero_extension: 1234,
      rol: 'Profesor',
      jefe: 'Jane Smith',
      bonos: [],
    };

    const newUsuario = await usuarioService.crearUsuario(usuario);

    const bono: BonoEntity = {
      id: '',
      monto: faker.number.int({ min: 1, max: 5 }),
      calificacion: faker.number.int({ min: 0, max: 5 }),
      palabra_clave: faker.lorem.word(),
      clase: null,
      usuario: usuario,
    };

    const newBono = await service.crearBono(bono);
    expect(newBono).toEqual(bono);

    const storedBono = await repository.findOne({ where: { id: newBono.id } });
    expect(storedBono.calificacion).toEqual(bono.calificacion);
    expect(storedBono.monto).toEqual(bono.monto);
    expect(storedBono.palabra_clave).toEqual(bono.palabra_clave);
  });

  it('should not create a bono with empty monto', async () => {
    const bono: BonoEntity = {
      id: '',
      monto: 0,
      calificacion: faker.number.int({ min: 0, max: 5 }),
      palabra_clave: faker.lorem.word(),
      clase: null,
      usuario: null,
    };

    await expect(service.crearBono(bono)).rejects.toThrowError('El monto no puede ser vacio');
  });
});
