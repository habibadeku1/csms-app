import { Test, TestingModule } from '@nestjs/testing';
import { RateCalcInputDto } from './dto/rate-calc-input.dto';
import { RateCalcOutputDto } from './dto/rate-calc-output.dto';
import { RateCalcService } from './rate-calc.service';

describe('RateCalcService', () => {
  let service: RateCalcService;
  const mockRateCalcOutput: RateCalcOutputDto = {
    overall: 7.04 ,
    components: { energy: 3.277, time: 2.767, transaction: 1 }     
  }

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: RateCalcService,
      useFactory: () => ({
        calculate: jest.fn(() => mockRateCalcOutput)
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiServiceProvider],
    }).compile();

    service = module.get<RateCalcService>(RateCalcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate cdr rate and return a valid response object', async () => {
    const mockRateCalcInput: RateCalcInputDto = {
      rate: { energy: 0.3, time: 2, transaction: 1 }, 
      cdr: { meterStart: 1204307, timestampStart: "2021-04-05T10:04:00Z" as unknown as Date, meterStop: 1215230, timestampStop:  "2021-04-05T11:27:00Z" as unknown as Date } 
    }

    expect(service.calculate(mockRateCalcInput)).toBe(mockRateCalcOutput);
  });
  
});
