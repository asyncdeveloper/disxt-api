import { body, param } from 'express-validator';
import Product from '../models/Product';

export const productShowRules = () => {
    return [
        param('id').custom(productId => {
            return Product.findById(productId).then(product => {
                if (! product)
                    return Promise.reject('Product not found');
            });
        }),
    ]
};

export const productCreateRules = () => {
    return [
        body('name').trim().notEmpty().isLength({ min: 3, max: 255 }).withMessage('Name must be at least 3 characters'),
        body('price').isFloat({ min: 1 }).withMessage('must be at least 1'),
        body('description').trim().notEmpty().isLength({ min: 3, max: 255 }).withMessage('Description must be at least 3 characters')
    ]
};