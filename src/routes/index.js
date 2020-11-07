import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
    res.json({ message: 'Hello World. Its Disxt Api.' })
});

export default routes;