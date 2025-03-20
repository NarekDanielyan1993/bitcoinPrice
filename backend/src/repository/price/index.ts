import { PrismaClient } from '@prisma/client/extension';
import prismaAdapter from 'lib/db';
import { IPriceData, IPriceResponse } from 'types/price';

class PriceRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient = prismaAdapter) {
        this.prisma = prisma;
    }

    async findMany(userData: IPriceData): Promise<IPriceResponse[] | null> {
        try {
            const { start, end } = userData;

            const prices = await this.prisma.price.findMany({
                where: {
                    date: {
                        gte: start,
                        lte: end,
                    },
                },
                orderBy: {
                    date: 'asc',
                },
            });

            return prices;
        } catch (error) {
            console.error('Error fetching data from database:', error);
            return null;
        }
    }
}

export default PriceRepository;
