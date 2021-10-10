import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
export class RateCalcOutputDto {
    @ApiProperty()
    @IsNumber()
    readonly overall: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly components: {
        energy: number;
        time: number;
        transaction: number;
    };
}