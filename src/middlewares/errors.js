import HttpStatusCode from 'http-status-codes';
import { GeneralError } from '../utils/errors';
import mongoose from 'mongoose';

export default (err, req, res, next) => {
    if (err instanceof GeneralError) {
        return res.status(err.getCode()).json({
            message: err.message,
            errors: err.errors
        });
    }

    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            message: err.message,
            errors: err.errors
        });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong. It's not your fault and we apologize for this",
        errors: null
    });
}
