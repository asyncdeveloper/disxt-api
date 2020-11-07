import { param } from 'express-validator';
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