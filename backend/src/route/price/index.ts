import { PRICE_API } from 'constant/api';
import PriceController from 'controller/price';
import express, { Router } from 'express';
import PriceRepository from 'repository/price';
import PriceService from 'service/price';

const priceRepository = new PriceRepository();
const priceService = new PriceService(priceRepository);
const priceController = new PriceController(priceService);

const priceRoutes: Router = express.Router();

priceRoutes.get(PRICE_API.GET_ALL, priceController.getPrices);

export default priceRoutes;
