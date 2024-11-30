import { Test, TestingModule } from '@nestjs/testing';
import { ClaseService } from './clase.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { ClaseEntity } from './clase.entity/clase.entity';
import { faker } from '@faker-js/faker';

describe('ClaseService', () => {
  let service: ClaseService;
  let repository: Repository<ClaseEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClaseService],
      imports: TypeOrmTestingConfig(),
    }).compile();

    service = module.get<ClaseService>(ClaseService);
    repository = module.get('ClaseEntityRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a clase', async () => {
    const clase: ClaseEntity = {
      id: '',
      nombre: faker.lorem.word(),
      codigo: '0123456789',  // 10 caracteres
      numero_creditos: faker.number.int({ min: 1, max: 5 }),
      bonos: []
    };

    const newClase = await service.crearClase(clase);
    expect(newClase).toEqual(clase);

    const storedClase = await repository.findOne({ where: { id: newClase.id } });
    expect(storedClase.nombre).toEqual(clase.nombre);
    expect(storedClase.codigo).toEqual(clase.codigo);
    expect(storedClase.numero_creditos).toEqual(clase.numero_creditos);
  });

  it('should not create a clase with invalid codigo length', async () => {
    const clase: ClaseEntity = {
      id: '',
      nombre: faker.lorem.word(),
      codigo: '12345', // menos de 10 caracteres
      numero_creditos: faker.number.int({ min: 1, max: 5 }),
      bonos: []
    };

    await expect(service.crearClase(clase)).rejects.toThrowError('El codigo debe tener 10 caracteres');
  });
});
