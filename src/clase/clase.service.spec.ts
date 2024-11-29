import { Test, TestingModule } from '@nestjs/testing';
import { ClaseService } from './clase.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('ClaseService', () => {
  let service: ClaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClaseService],
      imports: TypeOrmTestingConfig(),
    }).compile();

    service = module.get<ClaseService>(ClaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
