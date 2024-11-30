import { Test, TestingModule } from '@nestjs/testing';
import { ClaseBonoService } from './clase-bono.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { ClaseEntity } from '../clase/clase.entity/clase.entity';
import { BonoEntity } from '../bono/bono.entity/bono.entity';
import { faker } from '@faker-js/faker';

describe('ClaseBonoService', () => {
  let service: ClaseBonoService;
  let claseRepository: Repository<ClaseEntity>;
  let bonoRepository: Repository<BonoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClaseBonoService],
      imports: TypeOrmTestingConfig(),
    }).compile();

    service = module.get<ClaseBonoService>(ClaseBonoService);
    claseRepository = module.get('ClaseEntityRepository');
    bonoRepository = module.get('BonoEntityRepository');
  });

  it('should find bonos by clase codigo', async () => {
    const clase: ClaseEntity = {
      id: '',
      nombre: faker.lorem.word(),
      codigo: '0123456789',
      numero_creditos: faker.number.int({ min: 1, max: 5 }),
      bonos: []
    };

    const newClase = await claseRepository.save(clase);

    const bono: BonoEntity = {
      id: '',
      monto: faker.number.int({ min: 1, max: 1000 }),
      calificacion: faker.number.int({ min: 0, max: 5 }),
      palabra_clave: faker.lorem.word(),
      clase: newClase,
      usuario: null
    };

    await bonoRepository.save(bono);
    
    const bonos = await service.findBonoByCodigoClase(clase.codigo);
    expect(bonos.length).toBe(1);
    expect(bonos[0].id).toBe(bono.id);
  });

  it('should throw error with invalid clase codigo', async () => {
    await expect(
      service.findBonoByCodigoClase('codigo_invalido')
    ).rejects.toThrowError('Clase con codigo codigo_invalido no encontrada');
  });
});
