export type CurrencyResponse = {
    [key: string]: number;
}

export type CurrencyHistoricalResponse = {
    [key: string]: {[key: string]: number};
}

export type UsageResponse = {
    timestamp: Date;
    usagge: number;
}
