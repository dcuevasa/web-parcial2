import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioBonoService } from './usuario-bono.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { BonoEntity } from '../bono/bono.entity/bono.entity';
import { faker } from '@faker-js/faker';

describe('UsuarioBonoService', () => {
  let service: UsuarioBonoService;
  let usuarioRepository: Repository<UsuarioEntity>;
  let bonoRepository: Repository<BonoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioBonoService],
      imports: TypeOrmTestingConfig(),
    }).compile();

    service = module.get<UsuarioBonoService>(UsuarioBonoService);
    usuarioRepository = module.get('UsuarioEntityRepository');
    bonoRepository = module.get('BonoEntityRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find bonos by usuario id', async () => {
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

    const newUsuario = await usuarioRepository.save(usuario);

    const bono: BonoEntity = {
      id: '',
      monto: faker.number.int({ min: 1, max: 1000 }),
      calificacion: faker.number.int({ min: 0, max: 5 }),
      palabra_clave: faker.lorem.word(),
      clase: null,
      usuario: newUsuario
    };

    await bonoRepository.save(bono);

    const bonos = await service.findBonosByUsuario(newUsuario.id);
    expect(bonos.length).toBe(1);
    expect(bonos[0].id).toBe(bono.id);
  });

  it('should throw error with invalid usuario id', async () => {
    await expect(
      service.findBonosByUsuario('usuario-invalido')
    ).rejects.toThrowError('Usuario con id usuario-invalido no encontrado');
  });
});
