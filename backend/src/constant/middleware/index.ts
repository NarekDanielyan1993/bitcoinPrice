import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: true,
};
