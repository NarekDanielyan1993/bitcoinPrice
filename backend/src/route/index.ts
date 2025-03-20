import express from 'express';
import priceRoutes from './price';

const routes = express.Router();

routes.use(priceRoutes);

export default routes;
