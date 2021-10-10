import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsObject, ValidateNested } from "class-validator";


class RateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly energy: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly time: number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly transaction: number;
}

class CdrDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly meterStart: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly meterStop: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    readonly timestampStart: Date | string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    readonly timestampStop: Date | string;
}
export class RateCalcInputDto {
    @ApiProperty()
    @ValidateNested()
    @IsNotEmpty()
    @IsObject()
    @Type(()=>RateDto)
    readonly rate: RateDto;
    
    @ApiProperty()
    @ValidateNested()
    @IsNotEmpty()
    @IsObject()
    @Type(()=>CdrDto)
    readonly cdr: CdrDto;
}
