import { Router } from 'express';
import auth from './auth';
import product from './product';

const routes = Router();

routes.use('/api/auth', auth);
routes.use('/api/products', product);

routes.get('/', (req, res) => {
    res.json({ message: 'Hello World. Its Disxt Api.' })
});

export default routes;