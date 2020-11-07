import User, { Roles } from "../models/User";
import { body } from 'express-validator';

export const userRegistrationRules = () => {
    return [
        body('username').trim().notEmpty().isLength({ min: 5, max: 255 })
            .withMessage('must be at least 5 chars long')
            .custom(value => {
                return User.findOne({ username : value }).then( user => {
                    if (user)
                        return Promise.reject('Username already in use');
                });
            }),
        body('password').trim().notEmpty().isLength({ min: 5, max: 255 }).withMessage('must be at least 5 chars long'),
        body('name').trim().notEmpty().isLength({ min: 3, max: 255 }).withMessage('must be at least 3 chars long'),
        body('lastname').trim().notEmpty().isLength({ min: 3, max: 255 }).withMessage('must be at least 3 chars long'),
        body('age').trim().notEmpty().isInt({ min: 1 }).withMessage('must be at least 1'),
        body('role').trim().notEmpty().custom(value => {
            return  Roles.some(role => role === value)
        })
    ]
};

export const userLoginRules = () => {
    return [
        body('username').trim().notEmpty().withMessage('Username is required'),
        body('password').trim().notEmpty().isLength({ min: 5, max: 255 }).withMessage('Password is required'),
    ]
};