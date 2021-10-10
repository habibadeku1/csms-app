import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RateCalcInputDto } from './dto/rate-calc-input.dto';
import { RateCalcOutputDto } from './dto/rate-calc-output.dto';
import { RateCalcService } from './rate-calc.service';

@Controller()
@ApiTags('rate')
export class RateCalcController {

    constructor(private readonly rateCalcService: RateCalcService) {}

    // endpoint: '/rate'
    @ApiResponse({
      status: 200,
      description: 'computed rate for inputted cdr',
      type: RateCalcOutputDto
    })
    @UsePipes(new ValidationPipe())
    @Post('rate')
    async calculateCdrRate(@Body() inputPayload: RateCalcInputDto) {
      return this.rateCalcService.calculate(inputPayload);
    }

}
