import { Body, Controller, Post } from '@nestjs/common';
import { RateCalcInputDto } from './dto/rate-calc-input.dto';
import { RateCalcService } from './rate-calc.service';

@Controller('rate-calc')
export class RateCalcController {

    constructor(private readonly rateCalcService: RateCalcService) {}

    // endpoint: '/rate'
    @Post('rate')
    async create(@Body() inputPayload: RateCalcInputDto) {
      return this.rateCalcService.calculateRate(inputPayload);
    }

}
