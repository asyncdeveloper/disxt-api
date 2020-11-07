import HttpStatusCode from 'http-status-codes';
import Product from '../models/Product';

class ProductController {

   async all (req, res, next) {
        try {
            const products = await Product.find({}).populate('created_by', '_id username');

            return res.status(HttpStatusCode.OK).json({
                message: 'Products retrieved successfully.',
                data: products
            });
        } catch (err) {
            next(err);
        }
    }

    async show(req, res, next) {
        try {
            const product = await Product.findOne({
                _id: req.params.id,
            }).populate('created_by', '_id username');

            return res.status(HttpStatusCode.OK).json({
                message: 'Product retrieved successfully.',
                data: product
            });
        } catch (err) {
            next(err);
        }
    }
}

export default new ProductController();