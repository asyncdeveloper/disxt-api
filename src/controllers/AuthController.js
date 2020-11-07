import HttpStatusCode from 'http-status-codes';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { BadRequest } from '../utils/errors';

class AuthController {

    async register (req, res, next) {
        try {
            let { username, password , name, lastname , age, role } = req.body;

            password = await bcrypt.hash(password, await bcrypt.genSalt(10));

            const user = await new User({ username, password, name, lastname, age, role }).save();

            user.password = undefined;

            return res.status(HttpStatusCode.CREATED).json({
                    data: user,
                    message: "User registered successfully."
                });
        } catch (err) {
            next(err);
        }
    };

    async login (req, res, next) {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });

            if (! user) {
                throw new BadRequest('Invalid credentials');
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (! isMatch) {
                throw new BadRequest('Invalid credentials');
            }

            const payload = { userId: user._id, role: user.role };

            const token = await jwt.sign(
                payload,
                config.JWT_SECRET,
                { expiresIn: config.JWT_EXPIRATION}
            );

            user.password = undefined;

            return res.status(HttpStatusCode.OK).json({
                data : user,
                message: "User signed in successfully.",
                token,
            });
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController();