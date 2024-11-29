import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioBonoService } from './usuario-bono.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('UsuarioBonoService', () => {
  let service: UsuarioBonoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioBonoService],
      imports: TypeOrmTestingConfig(),
    }).compile();

    service = module.get<UsuarioBonoService>(UsuarioBonoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
