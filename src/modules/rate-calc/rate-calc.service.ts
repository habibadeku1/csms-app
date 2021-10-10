import { Injectable } from '@nestjs/common';
import moment from 'moment';
import { RateCalcInputDto } from './dto/rate-calc-input.dto';
import { RateCalcOutputDto } from './dto/rate-calc-output.dto';

@Injectable()
export class RateCalcService {

    async calculateRate(data: RateCalcInputDto): Promise<RateCalcOutputDto> {
        return await this.computeRate(data);
    }

    private computeRate(data: RateCalcInputDto): RateCalcOutputDto {
        // compute energy rate
        const meterReadDiffInkWh: number = (data.cdr.meterStop - data.cdr.meterStart) / 1000; 
        const energyRate = Math.round(meterReadDiffInkWh * data.rate.energy) / 1000;

        // compute time rate
        var meterStartTime = moment(data.cdr.meterStart);
        var meterEndTime = moment(data.cdr.meterStop);      
        var minutesDiff = meterEndTime.diff(meterStartTime, 'minutes');
        const timeReadDiffinHours = minutesDiff / 60;
        const timeRate = Math.round(timeReadDiffinHours * data.rate.time) / 1000;
       
        const overall = energyRate + timeRate + data.rate.transaction;

        const computedRateOutput: RateCalcOutputDto = {
            overall,
            components: {
                energy: data.rate.energy,
                time: data.rate.time,
                transaction: data.rate.transaction
            }
        }
        return computedRateOutput;
    }

}
