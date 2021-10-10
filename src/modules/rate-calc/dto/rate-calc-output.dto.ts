import { IsNotEmpty, IsNumber } from "class-validator";
import { IRateCalcInputCdr, IRateCalcInputRate, IRateCalcOutputComponents } from "../rate-calc.interface";

export class RateCalcOutputDto {
    @IsNumber()
    readonly overall: number;

    @IsNotEmpty()
    readonly components: IRateCalcOutputComponents;
}