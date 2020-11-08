import jwt from 'jsonwebtoken';
import config from '../config/config';
import { UnAuthorized } from '../utils/errors';

export const verifyToken = (req, res, next) => {
    const token = extractToken(req);

    if (! token) {
        throw new UnAuthorized('No token, Access Denied');
    }

    try {
        const payload = jwt.verify(token, config.JWT_SECRET);
        req.userId = payload.userId;
        req.userRole = payload.role;
        req.exclude = payload.role === 'admin' ?  {} : { created_by: 0 };
        next();
    } catch (err) {
        throw new UnAuthorized('Invalid token, Access Denied')
    }
};

export const extractToken = (req, res) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
};