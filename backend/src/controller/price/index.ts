/* eslint-disable max-lines */
import { NextFunction, Request, Response } from 'express';
import { IPriceService } from 'types/price';

export default class PriceController {
    private priceService: IPriceService;

    constructor(priceService: IPriceService) {
        this.priceService = priceService;
    }

    public getPrices = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const prices = await this.priceService.getPrices(req?.query);
            res.status(200).json({ prices });
        } catch (error) {
            next(error);
        }
    };
}
