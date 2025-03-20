export interface IPrice {
    date: string;
    price: number;
}

export interface IPriceData {
    start: string;
    end: string;
}

export interface IPriceResponse extends IPrice {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPriceService {
    getPrices(data: any): Promise<IPriceResponse[] | null>;
}
