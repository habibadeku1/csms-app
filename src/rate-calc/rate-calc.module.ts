import { Module } from '@nestjs/common';
import { RateCalcController } from './rate-calc.controller';
import { RateCalcService } from './rate-calc.service';

@Module({
  controllers: [RateCalcController],
  providers: [RateCalcService]
})
export class RateCalcModule {}
