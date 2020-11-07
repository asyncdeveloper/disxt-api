import HttpStatusCode from 'http-status-codes';
import bcrypt from 'bcryptjs';
import User from '../models/User';

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
}

export default new AuthController();