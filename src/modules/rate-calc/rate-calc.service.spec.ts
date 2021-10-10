import { Test, TestingModule } from '@nestjs/testing';
import { RateCalcService } from './rate-calc.service';

describe('RateCalcService', () => {
  let service: RateCalcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RateCalcService],
    }).compile();

    service = module.get<RateCalcService>(RateCalcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
