import { Test, TestingModule } from '@nestjs/testing';
import { RateCalcController } from './rate-calc.controller';

describe('RateCalcController', () => {
  let controller: RateCalcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RateCalcController],
    }).compile();

    controller = module.get<RateCalcController>(RateCalcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
