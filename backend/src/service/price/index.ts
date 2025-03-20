import axios from 'axios';
import { CRYPTO_API } from 'constant/api';
import prismaAdapter from 'lib/db';
import PriceRepository from 'repository/price';

import { IPriceResponse, IPriceService } from 'types/price';

class PriceService implements IPriceService {
    private repository: PriceRepository;

    constructor(repository: PriceRepository) {
        this.repository = repository;
    }

    async getPrices(data: any): Promise<IPriceResponse[] | null> {
        try {
            return await this.repository.findMany(data);
        } catch (error) {
            console.error('Error fetching historical data:', error);
            return null;
        }
    }

    dateToUnixTimestamp(date: Date) {
        return Math.floor(date.getTime() / 1000);
    }

    async fetchAndSaveHistoricalData() {
        const fsym = 'BTC';
        const tsym = 'USD';
        const endDate = new Date();
        const limit = 2000;

        const toTs = this.dateToUnixTimestamp(endDate);

        try {
            const { data } = await axios.get(CRYPTO_API, {
                params: {
                    fsym,
                    tsym,
                    toTs,
                    limit,
                },
            });

            for (const item of data.Data.Data) {
                const date = new Date(item.time * 1000)
                    .toISOString()
                    .split('T')[0];
                const price = item.close;

                await prismaAdapter.price.create({
                    data: { date, price },
                });
            }
        } catch (error) {
            console.error('Error fetching historical data:', error);
        }
    }
}

export default PriceService;
