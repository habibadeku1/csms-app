import { Injectable } from '@nestjs/common';
import { RateCalcInputDto } from './dto/rate-calc-input.dto';
import { RateCalcOutputDto } from './dto/rate-calc-output.dto';

@Injectable()
export class RateCalcService {

    async calculateRate(data: RateCalcInputDto): Promise<RateCalcOutputDto> {
        return await this.computeRate(data);
    }

    private computeRate(data: RateCalcInputDto): any {

    }

}
