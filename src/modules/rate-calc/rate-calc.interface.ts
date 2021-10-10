export interface IRateCalcInputRate {
    energy: number;
    time: number;
    transaction: number;
}

export interface IRateCalcInputCdr {
    meterStart: number;
    meterStop: number;
    timestampStart: Date;
    timestampStop: Date;
}

export interface IRateCalcOutputComponents {
    energy: number;
    time: number;
    transaction: number;
}