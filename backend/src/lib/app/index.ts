import { corsOptions } from 'constant/middleware';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, Router } from 'express';
import PriceRepository from 'repository/price';
import PriceService from 'service/price';

class App {
    private expressApp: Express;

    constructor() {
        this.expressApp = express();
    }

    public initializeMiddlewares() {
        this.expressApp.use(express.urlencoded({ extended: true }));
        this.expressApp.use(express.json());
        this.expressApp.use(cookieParser());
        this.expressApp.use(cors(corsOptions));
    }

    public initializeRoutes(routes: Router) {
        this.expressApp.use(routes);
    }

    public addMiddleware(middleware: any) {
        this.expressApp.use(middleware);
    }

    public addRoute(router: express.Router) {
        this.expressApp.use(router);
    }

    public async initializePrices() {
        const priceRepository = new PriceRepository();
        const priceService = new PriceService(priceRepository);
        await priceService.fetchAndSaveHistoricalData();
    }

    public async init(port: number) {
        try {
            this.expressApp.listen(port, async () => {
                console.log(`Server is running on port ${port}`);
            });
        } catch (error) {
            console.log('Failed to start the server:', error);
        }
    }

    public getApp(): Express {
        return this.expressApp;
    }
}

export default App;
