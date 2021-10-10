import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { RateCalcInputDto } from './dto/rate-calc-input.dto';
import { RateCalcOutputDto } from './dto/rate-calc-output.dto';

@Injectable()
export class RateCalcService {

    async calculate(data: RateCalcInputDto): Promise<RateCalcOutputDto> {
        return await this.computeRate(data);
    }

    private computeRate(data: RateCalcInputDto): RateCalcOutputDto {
        // compute energy rate
        const meterReadDiffInkWh: number = (data.cdr.meterStop - data.cdr.meterStart) / 1000; 
        const energyRate = parseFloat((meterReadDiffInkWh * data.rate.energy).toFixed(3));

        // compute time rate
        var meterStartTime = moment(data.cdr.timestampStart);
        var meterEndTime = moment(data.cdr.timestampStop);   
        var minutesDiff = meterEndTime.diff(meterStartTime, 'minutes');
        const timeReadDiffinHours = minutesDiff / 60;
        const timeRate = parseFloat((timeReadDiffinHours * data.rate.time).toFixed(3));
       
        const overall = parseFloat((energyRate + timeRate + data.rate.transaction).toFixed(2));

        const computedRateOutput: RateCalcOutputDto = {
            overall,
            components: {
                energy: energyRate,
                time: timeRate,
                transaction: data.rate.transaction
            }
        }
        return computedRateOutput;
    }

}
