import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { faker } from '@faker-js/faker';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioService],
      imports: TypeOrmTestingConfig(),
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get('UsuarioEntityRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a usuario', async () => {
    const usuario: UsuarioEntity = {
      id: '',
      cedula: faker.number.int({ min: 1000000000, max: 9999999999 }),
      nombre: faker.person.fullName(),
      grupo_investigacion: 'IMAGINE',
      numero_extension: faker.number.int({ min: 1000, max: 9999 }),
      rol: 'Profesor',
      jefe: faker.person.fullName(),
      bonos: []
    };

    const newUsuario = await service.crearUsuario(usuario);
    expect(newUsuario).toEqual(usuario);

    const storedUsuario = await repository.findOne({ where: { id: newUsuario.id } });
    expect(storedUsuario.cedula).toEqual(usuario.cedula);
    expect(storedUsuario.nombre).toEqual(usuario.nombre);
    expect(storedUsuario.grupo_investigacion).toEqual(usuario.grupo_investigacion);
  });

  it('should not create a usuario with invalid grupo_investigacion', async () => {
    const usuario: UsuarioEntity = {
      id: '',
      cedula: faker.number.int({ min: 1000000000, max: 9999999999 }),
      nombre: faker.person.fullName(),
      grupo_investigacion: 'GRUPO_INVALIDO',
      numero_extension: faker.number.int({ min: 1000, max: 9999 }),
      rol: 'Profesor',
      jefe: faker.person.fullName(),
      bonos: []
    };

    await expect(service.crearUsuario(usuario)).rejects.toThrowError('El grupo de investigacion GRUPO_INVALIDO no es valido');
  });
});
