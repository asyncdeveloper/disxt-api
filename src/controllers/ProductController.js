import HttpStatusCode from 'http-status-codes';
import Product from '../models/Product';

class ProductController {

   async all (req, res, next) {
        try {
            const products = await Product.find({}, req.exclude)
                .populate('created_by', '_id username');

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
            const product = await Product.findOne({ _id: req.params.id }, req.exclude)
                .populate('created_by', '_id username');

            return res.status(HttpStatusCode.OK).json({
                message: 'Product retrieved successfully.',
                data: product
            });
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const { name, price, description } = req.body;
            const created_by = req.userId;
            let product = await new Product({ name, price, description, created_by }).save();
            product = await product.populate('created_by', '_id username').execPopulate();

            return res.status(HttpStatusCode.CREATED)
                .json({
                    data: product,
                    message: "Product created successfully."
                });
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            await Product.findOneAndDelete({ _id: req.params.id });
            return res.status(HttpStatusCode.NO_CONTENT);
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { name, price, description } = req.body;

            const product = await Product.findByIdAndUpdate(
                { _id: req.params.id },
                { name, price, description },
                { new: true }
            ).populate('created_by', '_id username');

            return res.status(HttpStatusCode.OK).json({
                message: 'Product updated successfully.',
                data: product
            });
        } catch (err) {
           next(err);
        }
    }
}

export default new ProductController();