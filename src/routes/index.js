import { Router } from 'express';
import auth from './auth';

const routes = Router();

routes.use('/api/auth', auth);

routes.get('/', (req, res) => {
    res.json({ message: 'Hello World. Its Disxt Api.' })
});

export default routes;