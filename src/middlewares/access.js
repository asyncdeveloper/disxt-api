import { Forbidden } from '../utils/errors';

export const isAdmin = (req, res, next) => {
    if(req.userRole !== 'admin') {
        throw new Forbidden('You dont have permission for this action');
    }

    next();
};