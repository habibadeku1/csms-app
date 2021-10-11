import { Test, TestingModule } from '@nestjs/testing';
import { RateCalcInputDto } from './dto/rate-calc-input.dto';
import { RateCalcController } from './rate-calc.controller';
import { RateCalcService } from './rate-calc.service';

describe('RateCalcController', () => {
  let controller: RateCalcController;
  let service: RateCalcService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: RateCalcService,
      useFactory: () => ({
        calculate: jest.fn(() => null)
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RateCalcController],
      providers: [ApiServiceProvider]
    }).compile();

    controller = module.get<RateCalcController>(RateCalcController);
    service = module.get<RateCalcService>(RateCalcService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call calculateCdrRate with a valid request', async () => {
    const mockRateCalcInput: RateCalcInputDto = {
      rate: { energy: 0.3, time: 2, transaction: 1 }, 
      cdr: { meterStart: 1204307, timestampStart: "2021-04-05T10:04:00Z" as unknown as Date, meterStop: 1215230, timestampStop:  "2021-04-05T11:27:00Z" as unknown as Date } 
    }
    controller.calculateCdrRate(mockRateCalcInput);
    expect(service.calculate).toHaveBeenCalled();
  });


});
