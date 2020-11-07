import { model, Schema } from 'mongoose';

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [3]
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    description: {
        type: String,
        required: true,
        minlength: [3]
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{ versionKey: false, timestamps: true });

const Product = model("Product", productSchema);

export default Product;