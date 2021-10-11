import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { RateCalcInputDto } from 'src/modules/rate-calc/dto/rate-calc-input.dto';
import { RateCalcOutputDto } from 'src/modules/rate-calc/dto/rate-calc-output.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('./rate (POST) valid request, valid response ', async () => {
    const mockRateCalcInput: RateCalcInputDto = {
      rate: { energy: 0.3, time: 2, transaction: 1 },
      cdr: { meterStart: 1204307, timestampStart: "2021-04-05T10:04:00Z" as unknown as Date, meterStop: 1215230, timestampStop: "2021-04-05T11:27:00Z" as unknown as Date }
    }
    const mockRateCalcOutput: RateCalcOutputDto = {
      overall: 7.04 ,
      components: { energy: 3.277, time: 2.767, transaction: 1 }     
    }
    const response = await request(app.getHttpServer()).post('/rate').send(mockRateCalcInput);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockRateCalcOutput);
  })


  it('./rate throw error if (POST) invalid request ', async () => {

    // invalid rate calc input, no energy field
    const invalidRateCalcInput = {
      rate: { time: 2, transaction: 1 },
      cdr: { meterStart: 1204307, timestampStart: "2021-04-05T10:04:00Z"  as unknown as Date, meterStop: 1215230, timestampStop: "2021-04-05T11:27:00Z" as unknown as Date }
    }
    
    const response = await request(app.getHttpServer()).post('/rate').send(invalidRateCalcInput);
    expect(response.status).toBe(400);
  })

});
