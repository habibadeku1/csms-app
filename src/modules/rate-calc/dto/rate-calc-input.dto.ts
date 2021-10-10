import { IsNotEmpty } from "class-validator";
import { IRateCalcInputCdr, IRateCalcInputRate } from "../rate-calc.interface";

export class RateCalcInputDto {
    @IsNotEmpty()
    readonly rate: IRateCalcInputRate;

    @IsNotEmpty()
    readonly cdr: IRateCalcInputCdr
}
